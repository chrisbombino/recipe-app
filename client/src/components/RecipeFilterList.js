import React from 'react';
import RecipeFilter from './RecipeFilter';

class RecipeFilterList extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  handleClick = (tag) => {
    this.props.addTag(tag)
  }

  render() {
    return (
      <div>
        <h3>Filters:</h3>
        {this.props.inactiveTags.map(tag =>
          <RecipeFilter tag={tag} handleClick={this.handleClick} />
        )}
      </div>
    )
  }
}

export default RecipeFilterList;
