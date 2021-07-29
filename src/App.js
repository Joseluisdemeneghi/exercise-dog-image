import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dogObj: '',
    };
    this.fetchDog = this.fetchDog.bind(this);
  }

  async fetchDog() {
    const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random');
    const requestObject = await requestReturn.json();
    this.setState({
      dogObj: requestObject,
    });
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if(nextState.dogObj.message.includes('terrier')) return false;
    return true;
  }

  componentDidUpdate() {
    localStorage.setItem("dogURL", this.state.dogObj.message);
    const dogType = this.state.dogObj.message.split("/")[4];
    alert(dogType);
  }

  render() {
    const { dogObj } = this.state;
    if (dogObj === '') return 'Loading...';
    return (
      <div>
        <p>Canineos</p>
        <button onClick={ this.fetchDog }>Novo catiorineo!</button>
        <div>
          <img
          src={ this.state.dogObj.message }
          alt="Random dog"
          />
        </div>
      </div>
    );
  }
}

export default App;
