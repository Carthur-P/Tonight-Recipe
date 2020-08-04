import React from 'react';
import styles from '../css/mystyles.module.css';

export default function Login(){
    return(
        <div>
            <form className={styles.loginForm}>
                <input type="email" placeholder="Email" required></input>
                <input type="password" placeholder="Password" required></input>
                <button>Login</button>
                <button className={styles.createAccountButton}>Create</button>
            </form>
        </div>
    );
}