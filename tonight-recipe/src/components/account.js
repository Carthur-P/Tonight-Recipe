import React, { Component } from 'react';
import styles from '../css/mystyles.module.css';
import { CSSTransition } from 'react-transition-group';
import { auth } from './config/firebase.js';
import Login from './login';
import SignUp from './signup';
import account from '../image/account.png';
import heart from '../image/heart.png';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showLogin: false,
            showError: false,
            showSignUp: false
        }
        this.handleAccountClick = this.handleAccountClick.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState({
                user: user
            });
        });
    }

    handleAccountClick() {
        this.setState({
            showLogin: !this.state.showLogin,
            showError: false,
            showSignUp: false
        });
    }

    handleCreateClick(){
        this.setState({
            showSignUp: true
        });
    }

    handleCancelClick(){
        this.setState({
            showSignUp: false
        });
    }

    handleLoginSubmit(e, account){
        e.preventDefault();
        auth.signInWithEmailAndPassword(account.email, account.password)
        .then(() => {
            this.setState({
                showError: false
            });
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                showError: true
            });
        });
    }

    handleLogoutClick() {
        auth.signOut().catch((err) => {
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
                    <img className={styles.accountButton} src={account} onClick={this.handleAccountClick}/>
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
                        <Login handleCreateClick={this.handleCreateClick} handleLoginSubmit={this.handleLoginSubmit} showError={this.state.showError}/>
                    </CSSTransition>
                    {console.log(this.state.showSignUp)}
                    <CSSTransition 
                        in={this.state.showSignUp}
                        timeout={1000}
                        unmountOnExit
                        // classNames={{
                        //     enter: styles.loginFormContainerEnter,
                        //     enterActive: styles.loginFormContainerEnterActive,
                        //     enterDone: styles.loginFormContainerEnterDone,
                        //     exit: styles.loginFormContainerExit,
                        //     exitActive: styles.loginFormContainerExitActive,
                        //     exitDone: styles.loginFormContainerExitDone
                        // }}
                    >
                        <SignUp handleCancelClick={this.handleCancelClick}/>
                    </CSSTransition>
                </div>
            );
        }
    }
}