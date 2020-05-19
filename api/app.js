const express = require('express');
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

const port = process.env.PORT || 5000
app.listen(port, process.env.NODE_ENV !== 'production' ? '' : console.log(`server running on port ${port}`));

module.exports = app;
