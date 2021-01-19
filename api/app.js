const express = require('express');
const uuid = require('uuid')
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const app = express();
require('dotenv').config();

const auth = {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
}

AWS.config.update(auth);

// AWS objects
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();

// Middleware
app.use(express.json());

function jwtMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);
  }

  jwt.verify(token, process.env.jwtTokenSecret, (err, user) => {
    if (err) {
      res.sendStatus(403)
    } else {
      req.user = user
      next()
    }
  });
}

function authenticateUser(username, password) {
  const params = {
    TableName: 'Users',
    KeyConditionExpression: "username = :u",
    FilterExpression: "password = :p",
    ExpressionAttributeValues: {
      ":u": username,
      ":p": password
    }
  };

  console.log("authenticating user...");
  return new Promise((resolve, reject) => {
    docClient.query(params, (err, data) => {
      if (err) {
        reject({msg: "Server error.", statusCode: 500})
      }
      if (data.Count == 1) {
        resolve({
          user: {
            username: username,
            isAdmin: data.admin
          }
        })
      } else {
        reject({msg: "Login failed, wrong username or password.", statusCode: 401})
      }
    })
  });
}

// GET all recipes
app.get('/api/v1/recipes', (req, res) => {
  const params = {TableName: 'Recipes'};

  docClient.scan(params, (err, data) => {
    if (err) {
      console.error(`Server error ${err}`);
      res.sendStatus(500)
    } else {
      aws_recipes = data.Items;
      res.send(aws_recipes);
    }
  });
});

function verifyRecipeDoesNotExist(req, res, next) {
  const params = {
    TableName: 'Recipes',
    FilterExpression: "#N = :n",
    ExpressionAttributeNames: {
      "#N": "name"
    },
    ExpressionAttributeValues: {
      ":n": req.body.name
    }
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      res.sendStatus(500)
    } else if (data.Count === 1) {
      res.status(409).json({ msg: "Recipe already exists" })
    } else {
      next()
    }
  })
}

// POST a new recipe
app.post('/api/v1/recipes', jwtMiddleware, verifyRecipeDoesNotExist, (req, res) => {
  const params = {
    TableName: 'Recipes',
    Item: {
      "recipe-id": uuid.v4(),
      "img": req.body.img,
      "name": req.body.name,
      "tags": req.body.tags,
      "url": req.body.url
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        res.sendStatus(500)
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        res.sendStatus(201)
    }
  })
});

app.post("/api/v1/login", (req, res) => {
  username = req.body.username
  password = req.body.password

  authenticateUser(username, password).then(user => {
    const token = jwt.sign(user, process.env.jwtTokenSecret, { expiresIn: "1h" })
    res.status(200).json({ token: token })
  }).catch(err => {
    res.status(err.statusCode).json({ msg: err.msg })
  })
});

const port = process.env.PORT || 5000
app.listen(port, process.env.NODE_ENV == 'production' ? '' : console.log(`server running on port ${port}`));

module.exports = app;
