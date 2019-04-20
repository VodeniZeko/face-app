import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import './App.css';
import  Logo from './Components/Logo/Logo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        
        {
        // <ImageLink />
        // <FaceRecognition /> 
        }

      </div>
    );
  }
}

export default App;
