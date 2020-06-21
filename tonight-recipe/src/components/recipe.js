import React from 'react';
import '../css/recipe.css';

export default class Recipe extends React.Component{
    render(){
        return(
            <div className="recipe"> 
                <h1>{this.props.title}</h1>
                <img src={this.props.image} alt="Recipe Image"/>
            </div>
        );
    }
}