import React from 'react';
import Chip from '@material-ui/core/Chip';

class RecipeFilter extends React.Component {
  handleClick = () => {
    this.props.handleClick(this.props.tag)
  }

  render() {
    return <Chip style={{margin: '3px'}} label={this.props.tag} color="default" onClick={this.handleClick}/>
  }
}

export default RecipeFilter;
