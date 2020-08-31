import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton';
import Link from '@material-ui/core/Link';

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
export default RecipeBox;
