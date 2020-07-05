import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';

class ActiveTagList extends React.Component {
  render() {
    const activeTags = this.props.tags.map(tag =>
      <ActiveTag key={tag} tag={tag} handleTagDelete={this.props.handleTagDelete} />
    );
    return activeTags
  }
}

class ActiveTag extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  handleDelete = () => {
    this.props.handleTagDelete(this.props.tag)
  }

  render() {
    return <Chip label={this.props.tag} color="primary" onDelete={this.handleDelete}/>
  }
}

class RecipeFilters extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return <h3>Filters:</h3>
  }
}

class RecipeBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      error: false,
      img_url: ''
    }
  }

  componentDidMount(){
    this.setState({
      loading: false
    });
  }

  render() {
    if(this.state.loading) {
      return(
        <Grid item xs={6} md={4} xl={3}>
          <Box width={'100%'} marginRight={0.5}>
            <Skeleton variant="rect" height={150}/>
            <Skeleton height={40}/>
          </Box>
        </Grid>

      )
    } else if(this.state.error) {
      return(<h1>Error</h1>)
    } else if(!this.props.show) {
      return null
    }
    else {
    return (
      <Grid item xs={6} md={4} xl={3}>
        <Card>
        <CardActionArea>
          <Link target={'_blank'} href={this.props.url}>
            <CardMedia
              component="img"
              image={`https://d90xi065s2eu7.cloudfront.net/${this.props.img}`}
              height="150"
            />
            <CardContent>{this.props.name}</CardContent>
          </Link>
        </CardActionArea>
        </Card>
      </Grid>
    );}
  }
}

class RecipeList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      recipes: []
    }
  }

  componentDidMount(){
    fetch('/api/v1/recipes')
      .then(res => res.json())
      .then(json => {
        this.setState({
          loading: false,
          recipes: json
        })
      })
      .catch(err => (console.log(err)));
  }

  isRecipeInActiveTags = (recipe) => {
    for(let i = 0; i < this.props.activeTags.length ; i++) {
      if(!(this.props.activeTags[i].toLowerCase() in recipe.tags)) {
        return false
      }
    }
    return true
  }

  render() {
    const recipes = this.state.recipes.map(recipe => {
      let showRecipe = this.isRecipeInActiveTags(recipe)
      return <RecipeBox key={recipe.name} name={recipe.name} show={showRecipe} url={recipe.url} img={recipe.img}/>
    }
    );

    if(this.state.loading) {
      return(<CircularProgress size={60} />);
    } else {
      return (
          <Grid style={{margin: '0px', width:'100%', padding: '0px 150px'}} container spacing={7}>
            {recipes}
          </Grid>
      );
    }

  }
}

class RecipeApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeTags:  ["Dinner", "Dessert", "Italian"]
    }
  }

  handleTagDelete = (tag) => {
    let newTags = this.state.activeTags.filter(x => x !== tag)
    this.setState({activeTags: newTags})
  }

  render() {
    return (
      <div>
        <ActiveTagList tags={this.state.activeTags} handleTagDelete={this.handleTagDelete} />
        <RecipeFilters />
        <RecipeList activeTags={this.state.activeTags} />
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      <RecipeApp />
    </div>
  );
}

export default App;
