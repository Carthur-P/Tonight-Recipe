import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: 0
    }
  }

  componentWillMount(){
    fetch('https://api.edamam.com/search?q=chicken&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}')
    .then((res) => {
      res.json()
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render(){
    return (
      <div className="App">
        <h1 onClick={() => this.setState({ data: this.state.data + 1 })}>{this.state.data}</h1>
        <form className="searchForm">
          <input className="searchBar" type="text"></input>
          <button className="searchButton" type="submit">Search</button>
        </form>
      </div>
    );
  }
}