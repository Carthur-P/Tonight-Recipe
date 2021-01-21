import React from "react";
import styles from "../css/mystyles.module.css";
import Recipe from "./recipe";

export default class Favourite extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.recipeContainer}>
          {this.props.firestoreRecipeData.map((recipe) => (
            <Recipe
              // handleRecipeClick={this.props.handleRecipeClick}
              key={recipe.label}
              title={recipe.label}
              image={recipe.image}
              calories={recipe.calories}
              servings={recipe.yield}
              ingredients={recipe.ingredients}
              dietLabels={recipe.dietLabels}
              healthLabels={recipe.healthLabels}
              firestoreRecipeData={[]}
              
            />
          ))}
        </div>
      </div>
    );
  }
}
