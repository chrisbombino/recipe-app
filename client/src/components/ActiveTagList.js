import React from 'react';
import ActiveTag from './ActiveTag';

class ActiveTagList extends React.Component {
  render() {
    const activeTags = this.props.tags.map(tag =>
      <ActiveTag key={tag} tag={tag} handleTagDelete={this.props.handleTagDelete} />
    );
    return activeTags
  }
}

export default ActiveTagList;
