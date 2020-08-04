import React, { Component } from 'react';
import styles from '../css/mystyles.module.css';
import { CSSTransition } from 'react-transition-group';
import { auth } from './config/firebase.js';
import Login from './login';
import account from '../image/account1.png';

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showLogin: false
        }
        this.handleLoginClick = this.handleLoginClick.bind(this);
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
        console.log(this.state.showLogin);
    }

    render() {
        if (this.state.user) {
            return (
                <div className={styles.accountContainer}>
                    <button>
                        <img src={account} />
                    </button>
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
                            enterDone: styles.loginFormContainerEnterDone
                        }}
                        unmountOnExit
                    >
                        <Login/>
                    </CSSTransition>
                </div>
            );
        }
    }
}