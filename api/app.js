const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const auth = require('./.aws-auth'); // ./aws-auth.js is hidden from source control

AWS.config.update(auth);

// AWS objects
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();


// Middleware
let imageVerifier = (req, res, next) => {
  var params = {
    Bucket: 'chris-recipe-app',
    Key: `${req.params.key}.jpg`,
  };

  s3.headObject(params, (err, data) => {
    if(err) {
      res.status(404);
      next('err')
      return;
    } else {
      req.s3params = params;
      next();
    }
  })
}

// GET all recipes
app.get('/api/v1/recipes', (req, res) => {
  const params = {TableName: 'Recipes'};

  docClient.scan(params, (err, data) => {
    if (err) {
      console.error(`Server error ${err}`);
    } else {
      aws_recipes = data.Items;
      res.send(aws_recipes);
    }
  });
});

// GET signed url for an image
// TODO implement caching mechanism to keep urls for 1hr
app.get('/api/v1/images/:key', imageVerifier, (req, res) => {
    s3.getSignedUrl('getObject', req.s3params, (err, url) => {
      // return 500 if err, otherwise 200
      return err ? res.sendStatus(500) : res.status(200).send(url);
    });
});

const port = process.env.PORT || 5000
app.listen(port);
