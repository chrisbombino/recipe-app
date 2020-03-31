import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
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
    fetch('/api/v1/images/coming-soon')
      .then(res => {
        if(res.status !== 200) {
          this.setState({
            loading: false,
            error: true
          });
        } else return res.text();
      })
      .then(data => {
        this.setState({
          loading: false,
          img_url: data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if(this.state.loading) {
      return(<h1>Loading</h1>)
    } else if(this.state.error) {
      return(<h1>Error</h1>)
    } else {
    return (
      <Grid item xs={6} md={4} xl={3}>
        <Card>
        <CardActionArea>
          <Link target={'_blank'} href={this.props.url}>
            <CardMedia
              component="img"
              image={this.state.img_url}
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
  render() {
    const recipes = this.state.recipes.map((r) =>
      <RecipeBox key={r.name} name={r.name} url={r.url}/>
    );

    if(this.state.loading) {
      return(<h1>LOADING</h1>);
    } else {
      return (
          <Grid style={{margin: '0px', width:'100%', padding: '0px 150px'}} container spacing={7}>
            {recipes}
          </Grid>
      );
    }

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
