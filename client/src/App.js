import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from '@material-ui/core/Link';

class RecipeBox extends React.Component {
  render() {
    return (
      <Grid item xs={6} md={4} xl={3}>
        <Card>
        <CardActionArea>
          <Link target={'_blank'} href={this.props.url}>
            <CardMedia
              component="img"
              image="https://upload.wikimedia.org/wikipedia/commons/1/13/Spaghetti_carbonara_-_Trishhhh.jpg"
              height="150"
            />
            <CardContent>{this.props.name}</CardContent>
          </Link>
        </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

class RecipeList extends React.Component {
  render() {
    const recipes = this.props.recipes.map((r) =>
      <RecipeBox key={r.name} name={r.name} url={r.url}/>
    );
    return (
      <Grid style={{margin: '0px', width:'100%', padding: '0px 150px'}} container spacing={7}>
        {recipes}
      </Grid>
    );
  }
}

const RECIPES = [
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
];

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <RecipeList recipes={RECIPES}/>
    </div>
  );
}

export default App;
