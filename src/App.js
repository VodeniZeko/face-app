import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import  Logo from './Components/Logo/Logo';
import ImageLink from './Components/ImageLink/ImageLink';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
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
      imageURL: '',
      box: {},
      route:'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''

      }
    } 
  }

loadUser =(data) => {
  this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
  }})
}

faceLocation = (data) => {
const calariaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputImage');
const width = Number(image.width);
const height = Number(image.height);
return {
  leftCol: calariaiFace.left_col * width,
  topRow:  calariaiFace.top_row  * height,
  rightCol: width - (calariaiFace.right_col * width),
  bottomRow: height - (calariaiFace.bottom_row  * height)
 }
}

displayFaceBox = (box) => {
  this.setState({box:box});
}

 onInputChange = (event) => {
  this.setState({input: event.target.value});
 }

 onPictureSubmit = () => {
  this.setState({imageURL:this.state.input});
  app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input)
  .then(response => {
    if (response) {
      fetch('http://localhost:3000/image', {
            method:'put',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id
            })
          })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
    }
    this.displayFaceBox(this.faceLocation(response))
  })
  .catch(err => console.log(err)); 
}

onRouteChange = (route) => {
  if(route === 'signout') {
    this.setState({isSignedIn: false})
  } else if(route === 'home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route: route});
}


  render() {
const {isSignedIn, box, imageURL, route} = this.state; 
    return  (  
              <div className="App">
                    <Particles className = 'particles'
                    params={particleBackground}
                    />
                    <Navigation
                     isSignedIn={isSignedIn} 
                     onRouteChange={this.onRouteChange} 
                    />
                      {route === "home"
                          ? <div>
                            <Logo />
                            <Rank
                            name= {this.state.user.name}
                            entries={this.state.user.entries} />
                            <ImageLink
                            onInputChange = {this.onInputChange}
                            onPictureSubmit = {this.onPictureSubmit}
                             />
                            <FaceRecognition 
                            box ={box}
                            imageURL={imageURL}
                            />
                            </div> 
                          : (
                            route === "SignIn"
                          ? <SignIn
                          loadUser={this.loadUser} 
                          onRouteChange={this.onRouteChange}/>
                          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>  
                             
                            ) 
                      }  
              </div>
            );
      }
    }

export default App;
