import React, { useState } from 'react';
import styles from '../css/mystyles.module.css';

export default function SignUp(props){
    const [info, setInfo] = useState({
        email: "",
        password: ""
    });

    function handleOnChange(e) {
        e.persist()
        setInfo((prevInfo) => {
            return {
                ...prevInfo,
                [e.target.name]: e.target.value
            }
        })
    }

    return(
        <div className={styles.loginFormContainer}>
            <form onSubmit={(e) => props.handleLoginSubmit(e, info)} className={styles.loginForm}>
                <input type="text" name="name" placeholder="Name" onChange={handleOnChange} required></input>
                <input type="email" name="email" placeholder="Email" onChange={handleOnChange} required></input>
                <input type="password" name="password" placeholder="Password" onChange={handleOnChange} required></input>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleOnChange} required></input>
                <button>Create</button>
            </form>
            <button>Cancel</button>
            {/* {props.showError &&
                <p className={styles.formError}>Wrong username or password</p>
            } */}
        </div>
    );
}