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
            showForm: false,
            formType: "login",
            showError: false,
            height: null
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
            showForm: !this.state.showForm,
            showError: false,
        });
    }

    handleCreateClick() {
        this.setState({
            showLogin: false,
            formType: "signup"
        });
    }

    handleCancelClick() {
        this.setState({
            showLogin: true,
            formType: "login"
        });
    }

    handleLoginSubmit(e, account) {
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

    // handleLogoutClick() {
    //     auth.signOut().catch((err) => {
    //         console.log(err);
    //     });
    // }

    calculateHeight(element){
        this.setState({
            height: element.offse
        });
    }

    render() {
        if (this.state.user) {
            return (
                <div className={styles.accountContainer}>
                    <img src={heart} className={styles.likeButton} />
                    <button onClick={this.handleLogoutClick} className={styles.logoutButton}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className={styles.accountContainer}>
                    <img className={styles.accountButton} src={account} onClick={this.handleAccountClick} />
                    <CSSTransition
                        in={this.state.showForm}
                        timeout={500}
                        unmountOnExit
                        classNames={{
                            enter: styles.formContainerEnter,
                            enterActive: styles.formContainerEnterActive,
                            enterDone: styles.formContainerEnterDone,
                            exit: styles.formContainerExit,
                            exitActive: styles.formContainerExitActive,
                            exitDone: styles.formContainerExitDone
                        }}
                    >
                        <div className={styles.formContainer}>
                            <CSSTransition
                                in={this.state.formType === "login"}
                                timeout={500}
                                unmountOnExit
                                onEnter={this.calculateHeight}
                                classNames={{
                                    enter: styles.loginEnter,
                                    enterActive: styles.loginEnterActive,
                                    enterDone: styles.loginEnterDone,
                                    exit: styles.loginExit,
                                    exitActive: styles.loginExitActive,
                                    exitDone: styles.loginExitDone
                                }}
                            >
                                <Login handleCreateClick={this.handleCreateClick} handleLoginSubmit={this.handleLoginSubmit} showError={this.state.showError} />
                            </CSSTransition>
                            <CSSTransition
                                in={this.state.formType === "signup"}
                                timeout={500}
                                unmountOnExit
                                classNames={{
                                    enter: styles.signupEnter,
                                    enterActive: styles.signupEnterActive,
                                    enterDone: styles.signupEnterDone,
                                    exit: styles.signupExit,
                                    exitActive: styles.signupExitActive,
                                    exitDone: styles.signupExitDone
                                }}
                            >
                                <SignUp handleCancelClick={this.handleCancelClick} />
                            </CSSTransition>
                        </div>
                    </CSSTransition>
                </div>
            );
        }
    }
}