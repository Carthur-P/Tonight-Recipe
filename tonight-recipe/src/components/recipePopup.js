import React from 'react';
import styles from '../css/mystyles.module.css';

export default class RecipePopup extends React.Component {
    render(){
        console.log(this.props.recipeData);
        return(
            <div className={styles.recipePopupContainer}>
                <div className={styles.recipePopup}>
                    <button className={styles.exitButton} onClick={() => this.props.handleRecipeClick(false)}>X</button>
                    <h1>{this.props.recipeData.title}</h1>
                    <img src={this.props.recipeData.image} className={styles.mainImage} alt="Recipe"/>
                    <h3>Ingredients</h3>
                    {this.props.recipeData.ingredients.map((ingredient, index) => (
                        <p key={index ++}>{ingredient.text}</p>
                    ))}
                    <p><b>Calories:</b> {Math.ceil(this.props.recipeData.calories)}</p>
                    <p><b>Servings:</b> {this.props.recipeData.servings}</p>
                </div>
            </div>
        );
    }
}