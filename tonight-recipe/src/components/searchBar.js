import React from 'react';
import styles from '../css/mystyles.module.css';

export default class SearchBar extends React.Component {
    render(){
        return(
            <div className={styles.searchContainer}>
                <form id="searchForm" onSubmit={(e) => this.props.handleSubmit(e)}>
                    <input id="searchBar" className={styles.searchBar} type="text" onChange={(e) => {this.props.handleChange(e)}} value={this.props.searchValue}/>
                    <button id="searchButton" className={styles.searchButton} type="submit">Search</button>
                </form>
            </div>
        );
    }
}