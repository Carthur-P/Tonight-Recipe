import React from 'react';
import styles from '../css/mystyles.module.css';

export default class RecipePopup extends React.Component {
    render(){
        return(
            <div className={styles.recipePopupContainer}>
                <div className={styles.recipePopup}>
                    <h1>Hello World</h1>
                </div>
            </div>
        );
    }
}