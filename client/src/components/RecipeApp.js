import React from 'react';
import Grid from '@material-ui/core/Grid';
import ActiveTagList from './ActiveTagList';
import RecipeFilterList from './RecipeFilterList';
import RecipeList from './RecipeList';

class RecipeApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeTags:  [],
      inactiveTags: ["Dinner", "Dessert", "Italian", "Indian", "Salad", "Breakfast", "BBQ"]
    }
  }

  handleTagDelete = (tag) => {
    this.setState(prevState => ({
      activeTags: prevState.activeTags.filter(t => t !== tag),
      inactiveTags: [...prevState.inactiveTags, tag]
    }));
  }

  addTag = (tag) => {
    this.setState(prevState => ({
      activeTags: [...prevState.activeTags, tag],
      inactiveTags: prevState.inactiveTags.filter(t => t !== tag)
    }));
  }

  render() {
    return (
      <div>
        <ActiveTagList tags={this.state.activeTags} handleTagDelete={this.handleTagDelete} />
        <Grid container>
          <Grid item xs={0} md={2}>
            <RecipeFilterList addTag={this.addTag} inactiveTags={this.state.inactiveTags} />
          </Grid>
          <Grid item xs={12} md={10}>
            <RecipeList activeTags={this.state.activeTags} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default RecipeApp;
