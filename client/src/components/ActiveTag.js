import React from 'react';
import Chip from '@material-ui/core/Chip';

class ActiveTag extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  handleDelete = () => {
    this.props.handleTagDelete(this.props.tag)
  }

  render() {
    return <Chip label={this.props.tag} color="primary" onClick={this.handleDelete} onDelete={this.handleDelete}/>
  }
}

export default ActiveTag;
