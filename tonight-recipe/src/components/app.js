import React from 'react';
import Recipe from './recipe';
import RecipePopup from './recipePopup';
import styles from '../css/mystyles.module.css';
import loading from '../image/loading.gif'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      search: "",
      haveSearch: false,
      searching: false,
      showPopup: false
    }
    this.app_id = process.env.REACT_APP_ID;
    this.app_key = process.env.REACT_APP_KEY;
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

  handleRecipeClick(popupState){
    this.setState({
      showPopup: popupState
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
        <form id="searchForm" className={styles.searchContainer} onSubmit={this.handleSubmit.bind(this)}>
          <input id="searchBar" className={styles.searchBar} type="text" onChange={this.handleChange.bind(this)} value={this.state.search}/>
          <button id="searchButton" className={styles.searchButton} type="submit">Search</button>
        </form>
        {this.state.searching ? 
          <div className={styles.loading}>
            {/*image was sourced from https://loading.io/*/}
            <img src={loading} alt="Loading"/>
          </div>
          :
          <div className={styles.flexWrapCenter}>
            {this.state.data.map(((recipe) => (
              <Recipe
                handleRecipeClick={this.handleRecipeClick.bind(this)}
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                image={recipe.recipe.image}
                calories={recipe.recipe.calories}
                ingredients={recipe.recipe.ingredients}
              />
            )))}
          </div>
        }
        {this.state.showPopup &&
          <RecipePopup handleRecipeClick={this.handleRecipeClick.bind(this)}/>
        }
      </div>
    );
  }
}