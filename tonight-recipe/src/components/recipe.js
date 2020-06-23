import React from 'react';
import styles from '../css/mystyles.module.css';

export default class Recipe extends React.Component{
    createRecipeData(){
        return {
            title: this.props.title,
            image: this.props.image,
            calories: this.props.calories,
            ingredients: this.props.ingredients,
            servings: this.props.servings,
        }
    }

    render(){
        return(
            <div className={styles.recipeContainer} onClick={() => this.props.handleRecipeClick(true, this.createRecipeData())}> 
                <p className={styles.recipeTitle}>{this.props.title}</p>
                <img src={this.props.image} className={styles.roundImage} alt="Recipe"/>
                <div className={styles.info}>
                    <p>Calories: {Math.ceil(this.props.calories)}</p>
                    <p>No. of ingredients: {this.props.ingredients.length}</p>
                </div>
            </div>
        );
    }
}