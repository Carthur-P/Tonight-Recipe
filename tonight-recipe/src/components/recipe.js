import React from 'react';
import styles from '../css/mystyles.module.css';

export default class Recipe extends React.Component{
    render(){
        return(
            <div className={styles.recipeContainer} onClick={() => this.props.handleRecipeClick(true, this.props)}> 
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