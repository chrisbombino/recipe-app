const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!')
});

const DUMMY_DATA = {
  "data": [
    {name: "Lasagna", url: ""},
    {name: "Penne alla Vodka", url: "https://www.foodnetwork.com/recipes/rachael-ray/you-wont-be-single-for-long-vodka-cream-pasta-recipe-1912258"},
    {name: "Carbonara", url: ""},
    {name: "Minershi", url: ""},
    {name: "Lemon Poppy Seed Chicken", url: "https://www.rachaelrayshow.com/recipe/15613_Lemon_Poppy_Chicken_With_Sweet_Pea_amp_Mint_Couscous"},
    {name: "Lemon Caper Chicken", url: ""},
    {name: "Lemon Herb Chicken", url: ""},
    {name: "Ribs", url: ""},
    {name: "Caesar Salad", url: ""},
    {name: "Braised Chicken and Leeks", url: ""},
    {name: "Lemon Poppy Seed Bundt Cake", url: "https://www.onceuponachef.com/recipes/glazed-lemon-poppy-seed-cake.html"}
  ]
};

app.get('/api/recipes', (req, res) => {
  res.send(DUMMY_DATA);
});

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}....`));
