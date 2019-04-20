import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import  Logo from './Components/Logo/Logo';
import ImageLink from './Components/ImageLink/ImageLink';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'b3f7a289193047bfbdd4ce4459b22d0e'
});

const particleBackground = {
      particles: {
          number: {
            value: 30,
              density: {
              enable:true,
              value_area: 500
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#e63045'
          }
        }
      }
    }
}
class App extends Component {
  constructor() {
    super ();
    this.state = {
      input: '',
      imageURL: ''
    } 
  }

 onInputChange = (event) => {
  this.setState({input: event.target.value});
 }

 onButtonSubmit = () => {
  this.setState({imageURL:this.state.input});
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input)
  .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
 }

  render() {
    return (
      <div className="App">
      <Particles className = 'particles'
      params={particleBackground}
      />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLink
        onInputChange = {this.onInputChange}
        onButtonSubmit = {this.onButtonSubmit}
         />
        <FaceRecognition 
        imageURL={this.state.imageURL}
        /> 
      </div>
    );
  }
}

export default App;
