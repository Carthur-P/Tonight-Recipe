import React from 'react';
import styles from '../css/mystyles.module.css';
import error from '../image/error.gif';

export default function ErrorMessage(props) {
    return (
        <div className={styles.error}>
            <p className={styles.error}><b>{props.message}</b></p>
            {/*image was sourced from https://loading.io/*/}
            <img src={error} alt="Error" />
        </div>
    );
}