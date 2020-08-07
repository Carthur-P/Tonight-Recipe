import React from 'react';
import styles from '../css/mystyles.module.css';
import heart from '../image/heart2.png';

export default class Recipe extends React.Component{
    render(){
        return(
            <div className={styles.recipeCardContainer} onClick={() => this.props.handleRecipeClick(true, this.props)}> 
                <p className={styles.recipeTitle}>{this.props.title}</p>
                <img src={this.props.image} className={styles.roundImage} alt="Recipe"/>
                <div className={styles.info}>
                    {this.props.dietLabels.map((label) => (
                        <p key={label}>{label}</p>
                    ))}
                    {this.props.healthLabels.map((label) => (
                        <p key={label}>{label}</p>
                    ))}
                </div>
                {this.props.showFavButton && 
                    <div className={styles.favButtonContainer}><img src={heart}/></div>
                }
            </div>
        );
    }
}