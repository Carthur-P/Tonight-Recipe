import React from 'react';
import Recipe from './recipe';
import '../css/app.css';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      search: ""
    }
    this.app_id = process.env.REACT_APP_ID;
    this.app_key = process.env.REACT_APP_KEY;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchData(){
    fetch(`https://api.edamam.com/search?q=${this.state.search}&app_id=${this.app_id}&app_key=${this.app_key}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        data: data.hits
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleChange(e){
    this.setState({
      search: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.fetchData();
    this.setState({
      search: ""
    });
  }

  render(){
    return (
      <div className="app">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <input className="searchBar" type="text" onChange={this.handleChange} value={this.state.search}></input>
          <button className="searchButton" type="submit">Search</button>
        </form>
        <div className="recipeContainer">
          {this.state.data.map(((recipe) => (
            <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            />
          )))}
        </div>
      </div>
    );
  }
}