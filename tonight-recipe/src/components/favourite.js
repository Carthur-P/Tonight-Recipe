import React from "react";
import styles from "../css/mystyles.module.css";
import Recipe from "./recipe";

export default function Favourite(props) {
  return (
    <div>
      <div className={styles.recipeContainer}>
        {props.firestoreRecipeData.map((recipe) => (
          <Recipe
            key={recipe.title}
            title={recipe.title}
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
