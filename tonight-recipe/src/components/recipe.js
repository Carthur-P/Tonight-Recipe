import React from "react";
import styles from "../css/mystyles.module.css";
import heart from "../image/heart2.png";
import { db } from "./config/firebase";

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.onHeartClick = this.onHeartClick.bind(this);
  }

  onHeartClick() {
    console.log(this.props);
    db.collection("hearts")
      .add({
          title: this.props.title,
          image: this.props.image,
          calories: this.props.calories,
          servings: this.props.servings,
          ingredients: this.props.ingredients,
          dietLabels: this.props.dietLabels,
          healthLabels: this.props.healthLabels
      })
      .catch((err) => {
        console.log(err);
      });
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
            <img src={heart} onClick={this.onHeartClick} />
          </div>
        )}
      </div>
    );
  }
}
