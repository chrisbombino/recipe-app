import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import RecipeBox from './RecipeBox';

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
          <Grid style={{margin: '0px', width:'100%', padding: '0% 10% 0% 0%'}} container spacing={7}>
            {recipes}
          </Grid>
      );
    }

  }
}

export default RecipeList;
