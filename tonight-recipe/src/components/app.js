import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.app_id = process.env.REACT_APP_ID;
    this.app_key = process.env.REACT_APP_KEY;
  }

  componentDidMount(){
    fetch(`https://api.edamam.com/search?q=chicken&app_id=${this.app_id}&app_key=${this.app_key}`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        data: data.hits
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render(){
    return (
      <div className="App">
        <form className="searchForm">
          <input className="searchBar" type="text"></input>
          <button className="searchButton" type="submit">Search</button>
        </form>
      </div>
    );
  }
}