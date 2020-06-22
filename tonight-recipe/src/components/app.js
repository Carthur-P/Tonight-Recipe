import React from 'react';
import Recipe from './recipe';
import styles from '../css/mystyles.module.css';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      search: "",
      haveSearch: false,
      searching: false
    }
    this.app_id = process.env.REACT_APP_ID;
    this.app_key = process.env.REACT_APP_KEY;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchData(){
    this.setState({
      searching: true
    });
    fetch(`https://api.edamam.com/search?q=${this.state.search}&app_id=${this.app_id}&app_key=${this.app_key}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        data: data.hits,
        searching: false
      });
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(this.state.data);
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
      search: "",
      haveSearch: true
    });
  }

  render(){
    return (
      <div className={styles.appContainer}>
        {!this.state.haveSearch && 
          <div>
            <p className={styles.mainTitle}>Tonight's Dinner</p>
            <p className={styles.subTitle}>Food ideas just a click away</p>
          </div>
        }
        <form id="searchForm" className={styles.searchContainer} onSubmit={this.handleSubmit}>
          <input id="searchBar" className={styles.searchBar} type="text" onChange={this.handleChange} value={this.state.search}/>
          <button id="searchButton" className={styles.searchButton} type="submit">Search</button>
        </form>
        {this.state.searching ? 
          <div>
            <h1>Test</h1>
          </div>
          :
          <div className={styles.flexWrapCenter}>
            {this.state.data.map(((recipe) => (
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                image={recipe.recipe.image}
              />
            )))}
          </div>
        }
      </div>
    );
  }
}