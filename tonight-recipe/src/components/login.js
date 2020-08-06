import React, { useState } from 'react';
import styles from '../css/mystyles.module.css';

export default function Login(props) {
    const [account, setAccount] = useState({
        email: "",
        password: ""
    });

    function handleOnChange(e) {
        e.persist()
        setAccount((preAccount) => {
            return {
                ...preAccount,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div>
            <form onSubmit={(e) => props.handleLoginSubmit(e, account)} className={styles.loginForm}>
                <input type="email" name="email" placeholder="Email" onChange={handleOnChange} required></input>
                <input type="password" name="password" placeholder="Password" onChange={handleOnChange} required></input>
                <button>Login</button>
            </form>
            <button className={styles.createAccountButton} onClick={props.handleCreateClick}>Create</button>
            {props.showError &&
                <p className={styles.formError}>Wrong username or password</p>
            }
        </div>
    );
}