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
  constructor(props){
    super(props);
    this.state = {recipes: []}
  }

  componentDidMount(){
    fetch('/api/recipes')
      .then(res => res.json())
      .then(json => {
        this.setState({recipes: json.data})
      })
      .catch(err => (console.log(err)));
  }
  render() {
    const recipes = this.state.recipes.map((r) =>
      <RecipeBox key={r.name} name={r.name} url={r.url}/>
    );
    return (
      <Grid style={{margin: '0px', width:'100%', padding: '0px 150px'}} container spacing={7}>
        {recipes}
      </Grid>
    );
  }
}

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <RecipeList />
    </div>
  );
}

export default App;
