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
                <div className={styles.accountContainer}>
                    <button>Logout</button>
                </div>
            );
        } else {
            return (
                <div className={styles.accountContainer}>
                    <button>login</button>
                </div>
            );
        }
    }
}