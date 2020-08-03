import React, { Component } from 'react';
import styles from '../css/mystyles.module.css';
import { auth } from './config/firebase.js';

export default class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            this.setState({
                user: user
            });
        });
    }

    render() {
        if(this.state.user){
            return(
                <div>
                    <h1>Logout</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>login</h1>
                </div>
            );
        }
    }
}