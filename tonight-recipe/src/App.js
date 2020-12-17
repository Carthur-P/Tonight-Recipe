import React from "react";
import styles from "./css/mystyles.module.css";
import SeachBar from "./components/searchBar";
import Recipe from "./components/recipe";
import RecipePopup from "./components/recipePopup";
import Account from "./components/account";
import ErrorMessage from "./components/error";
import loading from "./image/loading.gif";
import logo from "./image/logo.png";
import { db } from "./components/config/firebase";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchValue: "",
      haveSearch: false,
      searching: false,
      showPopup: false,
      recipeData: {},
      firestoreRecipeData: {},
      showFavButton: false,
      user: null,
    };
    this.app_id = process.env.REACT_APP_ID;
    this.app_key = process.env.REACT_APP_KEY;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRecipeClick = this.handleRecipeClick.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  //fetching data from Edamam API
  fetchData() {
    this.setState({
      searching: true,
    });
    fetch(
      `https://api.edamam.com/search?q=${this.state.searchValue}&app_id=${this.app_id}&app_key=${this.app_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data.hits,
          searching: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //handles search field change
  handleChange(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  //handles the search button being clicked
  handleSubmit(e) {
    e.preventDefault();
    //fetch the data when the search button is clicked
    this.fetchData();
    this.setState({
      searchValue: "",
      haveSearch: true,
    });
  }

  //handles the recipe card being clicked
  handleRecipeClick(popupState, recipeData) {
    //recipeData - data of the recipe that was clicked
    this.setState({
      showPopup: popupState,
      recipeData: recipeData,
    });
    console.log(this.state.firestoreRecipeData);
  }

  getUser(user) {
    if (user) {
      db.collection(user.uid)
        .onSnapshot((snapshot) => {
          let allRecipe = []
          snapshot.forEach((doc) => {
            allRecipe.push(doc.data());
          })
          this.setState({
            firestoreRecipeData: allRecipe
          });
        });
      this.setState({
        showFavButton: true,
        user: user,
      });
    } else {
      this.setState({
        showFavButton: false,
      });
    }
  }

  render() {
    //if there is no recipe data and data is not currently being fetch then display homepage
    if (this.state.data.length === 0 && this.state.searching === false) {
      return (
        <div className={styles.appContainer}>
          <Account getUser={this.getUser} />
          <p className={styles.mainTitle}>Tonight's Recipe</p>
          <p className={styles.subTitle}>Food ideas just a click away</p>
          {/*image design by Amy Cleaver*/}
          <img src={logo} className={styles.logo} alt="Logo" />
          <SeachBar
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            searchValue={this.state.searchValue}
          />
          {this.state.haveSearch && (
            <ErrorMessage message="Sorry we could not find any recipe" />
          )}
        </div>
      );
    } else {
      //else display all the recipe data that was fetched
      return (
        <div className={styles.appContainer}>
          {this.state.searching ? ( //if the data is being fetch show the loading screen otherwise show all the recipe cards
            <img src={loading} alt="Loading" />
          ) : (
            <div>
              <Account getUser={this.getUser} />
              <SeachBar
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                searchValue={this.state.searchValue}
              />
              <div className={styles.recipeContainer}>
                {this.state.data.map((recipe) => (
                  <Recipe
                    handleRecipeClick={this.handleRecipeClick}
                    key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    image={recipe.recipe.image}
                    calories={recipe.recipe.calories}
                    servings={recipe.recipe.yield}
                    ingredients={recipe.recipe.ingredients}
                    dietLabels={recipe.recipe.dietLabels}
                    healthLabels={recipe.recipe.healthLabels}
                    showFavButton={this.state.showFavButton}
                    user={this.state.user}
                    firestoreRecipeData={this.state.firestoreRecipeData}
                  />
                ))}
              </div>
              {this.state.showPopup && ( //if recipe card has been clicked, display more information in a popup box
                <RecipePopup
                  handleRecipeClick={this.handleRecipeClick}
                  recipeData={this.state.recipeData}
                />
              )}
            </div>
          )}
        </div>
      );
    }
  }
}
