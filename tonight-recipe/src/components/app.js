import React from 'react';
import styles from '../css/mystyles.module.css';
import SeachBar from './searchBar';
import Recipe from './recipe';
import RecipePopup from './recipePopup';
import loading from '../image/loading.gif'
import logo from '../image/logo.png'
import error from '../image/error.gif';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      searchValue: "",
      haveSearch: false,
      searching: false,
      showPopup: false,
      recipeData: {}
    }
    this.app_id = process.env.REACT_APP_ID;
    this.app_key = process.env.REACT_APP_KEY;
  }

  //fetching data from Edamam API
  fetchData(){
    this.setState({
      searching: true
    });
    fetch(`https://api.edamam.com/search?q=${this.state.searchValue}&app_id=${this.app_id}&app_key=${this.app_key}`)
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

  //handles search field change
  handleChange(e){
    this.setState({
      searchValue: e.target.value
    });
  }

  //handles the search button being clicked
  handleSubmit(e){
    e.preventDefault();
    //fetch the data when the search button is clicked
    this.fetchData();
    this.setState({
      searchValue: "",
      haveSearch: true
    });
  }

  //handles the recipe card being clicked
  handleRecipeClick(popupState, recipeData){
    //recipeData - data of the recipe that was clicked
    this.setState({
      showPopup: popupState,
      recipeData: recipeData
    });
  }

  render(){
    return (
      <div className={styles.appContainer}>
        {this.state.data.length === 0 && this.state.searching === false ? /*if there is no recipe data and data is not currently being fetch then display landing page*/
          <div>
            <p className={styles.mainTitle}>Tonight's Recipe</p>
            <p className={styles.subTitle}>Food ideas just a click away</p>
            {/*image design by Amy Cleaver*/}
            <img src={logo} className={styles.logo} alt="Logo"/>      
            <SeachBar 
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange.bind(this)}
              searchValue={this.state.searchValue}
            />
            {this.state.haveSearch &&
              <div className={styles.error}>
                <p className={styles.error}><b>Sorry we could not find any recipe</b></p>
                {/*image was sourced from https://loading.io/*/}
                <img src={error} alt="Error"/>
              </div>
            }
          </div>
          : /*else display recipe cards section*/
          this.state.searching ? /*if the data is being fetch show the loading screen*/
          <div className={styles.loading}>
            {/*image was sourced from https://loading.io/*/}
            <img src={loading} alt="Loading"/>
          </div>
          :/*else display the recipe cards section*/
          <div>          
            <SeachBar 
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange.bind(this)}
              searchValue={this.state.searchValue}
            />
            <div className={styles.recipeContainer}>
              {this.state.data.map(((recipe) => (
                <Recipe
                  handleRecipeClick={this.handleRecipeClick.bind(this)}
                  key={recipe.recipe.label}
                  title={recipe.recipe.label}
                  image={recipe.recipe.image}
                  calories={recipe.recipe.calories}
                  servings={recipe.recipe.yield}
                  ingredients={recipe.recipe.ingredients}
                  dietLabels={recipe.recipe.dietLabels}
                  healthLabels={recipe.recipe.healthLabels}
                />
              )))}
            </div>
          </div>          
        }
        
        {this.state.showPopup && /*if recipe card has been clicked, display recipe popup data*/
          <RecipePopup 
            handleRecipeClick={this.handleRecipeClick.bind(this)}
            recipeData={this.state.recipeData}  
          />
        }
      </div>
    );
  }
}