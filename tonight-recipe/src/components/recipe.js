import React from 'react';
import styles from '../css/mystyles.module.css';

export default class Recipe extends React.Component{
    render(){
        return(
            <div className={styles.recipeContainer}> 
                <h1>{this.props.title}</h1>
                <img src={this.props.image} className={styles.roundImage} alt="Recipe"/>
            </div>
        );
    }
}