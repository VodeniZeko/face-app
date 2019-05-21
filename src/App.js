import React, { Component } from 'react';
import Particles from 'react-particles-js';
// import Matrix from './Components/Matrix/Matrix';
import Navigation from './Components/Navigation/Navigation';
import  Logo from './Components/Logo/Logo';
import ImageLink from './Components/ImageLink/ImageLink';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import './App.css';


const particleBackground = {
"particles": {
    "number": {
      "value":50,
      "density": {
        "enable": true,
        "value_area": 880
      }
    },
    "color": {
      "value": "#fff"
    },
    "shape": {
      "type": "star",
      "stroke": {
        "width": 0,
        "color": "#000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": .6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 4,
        "opacity_min": .1,
        "sync": false
      }
    },
    "size": {
      "value": 1.8,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 100,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 1,
      "color": "#000",
      "opacity": 4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "retina_detect": true
}


const initState = {
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
  fetch('https://ancient-eyrie-70184.herokuapp.com/imageurl', {
        method:'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          input:this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://ancient-eyrie-70184.herokuapp.com/image', {
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
              .catch(console.log)
                }
              this.displayFaceBox(this.faceLocation(response))
              })
              .catch(err => console.log(err)); 
            }

onRouteChange = (route) => {
  if(route === 'signout') {
    this.setState(initState)
  } else if(route === 'home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route: route});
}


  render() {
const {isSignedIn, box, imageURL, route} = this.state; 
    return  (  
              <div className="App">
                    <Particles 
                    className= 'particles'
                    params = {particleBackground}
                    
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
