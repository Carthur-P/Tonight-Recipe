import React from "react";
import styles from "../css/mystyles.module.css";
import heart from "../image/heart2.png";
import filledHeart from "../image/heart3.png";
import { db } from "./config/firebase";

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: false,
    };
    this.onHeartClick = this.onHeartClick.bind(this);
  }

  onHeartClick() {
    db.collection(this.props.user.uid)
      .add({
        title: this.props.title,
        image: this.props.image,
        calories: this.props.calories,
        servings: this.props.servings,
        ingredients: this.props.ingredients,
        dietLabels: this.props.dietLabels,
        healthLabels: this.props.healthLabels,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getDerivedStateFromProps(props){
    if(props.firestoreRecipeData.some((recipe) => recipe.title === props.title)){
      return {
        heart: true
      };
    }
    return {
      heart: false
    };
  }

  render() {
    return (
      <div
        className={styles.recipeCardContainer}
        onClick={() => this.props.handleRecipeClick(true, this.props)}
      >
        <p className={styles.recipeTitle}>{this.props.title}</p>
        <img
          src={this.props.image}
          className={styles.roundImage}
          alt="Recipe"
        />
        <div className={styles.info}>
          {this.props.dietLabels.map((label) => (
            <p key={label}>{label}</p>
          ))}
          {this.props.healthLabels.map((label) => (
            <p key={label}>{label}</p>
          ))}
        </div>
        {this.props.showFavButton && (
          <div className={styles.favButtonContainer}>
            {this.state.heart ? (
              <img src={filledHeart} alt="filledHeart"/>
            ) : (
              <img src={heart} onClick={this.onHeartClick} alt="heart" />
            )}
          </div>
        )}
      </div>
    );
  }
}
