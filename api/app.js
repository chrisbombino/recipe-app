const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const auth = require('./.aws-auth'); // ./aws-auth.js is hidden from source control

AWS.config.update(auth);

const docClient = new AWS.DynamoDB.DocumentClient();

app.get('/api/recipes', (req, res) => {
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

const port = process.env.PORT || 5000
app.listen(port);
