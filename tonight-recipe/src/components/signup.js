import React, { useState } from 'react';
import styles from '../css/mystyles.module.css';

export default function SignUp(props){
    const [account, setAccount] = useState({
        email: "",
        password: ""
    });

    function handleOnChange(e) {
        e.persist()
        setAccount((prevAccount) => {
            return {
                ...prevAccount,
                [e.target.name]: e.target.value
            }
        })
    }

    return(
        <div>
            <form onSubmit={(e) => props.handleSignupSubmit(e, account)} className={styles.loginForm}>
                <input type="text" name="name" placeholder="Name" onChange={handleOnChange} required></input>
                <input type="email" name="email" placeholder="Email" onChange={handleOnChange} required></input>
                <input type="password" name="password" placeholder="Password" onChange={handleOnChange} required></input>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleOnChange} required></input>
                <button>Create</button>
            </form>
            <button className={styles.cancelButton} onClick={() => props.handleCancelClick()}>Cancel</button>
            {/* {props.showError &&
                <p className={styles.formError}>props.errorMessage</p>
            } */}
        </div>
    );
}