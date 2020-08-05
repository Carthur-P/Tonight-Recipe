import React, { Component } from 'react';
import styles from '../css/mystyles.module.css';
import { CSSTransition } from 'react-transition-group';
import { auth } from './config/firebase.js';
import Login from './login';
import account from '../image/account.png';
import heart from '../image/heart.png';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showLogin: false
        }
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState({
                user: user
            });
        });
    }

    handleLoginClick() {
        this.setState({
            showLogin: !this.state.showLogin
        });
    }

    handleLogoutClick(){
        auth.signOut().catch((err) => {
            console.log(err);
        });
    }

    handleLoginSubmit(e, account){
        e.preventDefault();
        auth.signInWithEmailAndPassword(account.email, account.password)
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        if (this.state.user) {
            return (
                <div className={styles.accountContainer}>
                    <img src={heart} className={styles.likeButton}/>
                    <button onClick={this.handleLogoutClick} className={styles.logoutButton}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className={styles.accountContainer}>
                    <img className={styles.accountButton} src={account} onClick={this.handleLoginClick}/>
                    <CSSTransition
                        in={this.state.showLogin}
                        timeout={1000}
                        classNames={{
                            enter: styles.loginFormContainerEnter,
                            enterActive: styles.loginFormContainerEnterActive,
                            enterDone: styles.loginFormContainerEnterDone,
                            exit: styles.loginFormContainerExit,
                            exitActive: styles.loginFormContainerExitActive,
                            exitDone: styles.loginFormContainerExitDone
                        }}
                        unmountOnExit
                    >
                        <Login handleLoginSubmit={this.handleLoginSubmit}/>
                    </CSSTransition>
                </div>
            );
        }
    }
}