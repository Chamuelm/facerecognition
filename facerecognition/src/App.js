import React from 'react';
import Particles from 'react-particles-js';
import particleParams from './particlesParams';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Singin from './components/Singin/Singin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Register from './components/Register/Register';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      imageWidth: "",
      imageHeight: "",
      route: 'signin',
      isSignedIn: false
    };
  }

  app = new Clarifai.App({
    apiKey: 'd74a49ea5cea4a9e8d8986dd96ecb910'
   });

  displayBox = (boxes) => {
    this.updateDimensions();
    this.setState({boxes: boxes});
  }

  updateDimensions = () => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    this.setState({imageWidth: width, imageHeight: height});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input, boxes: []});
    this.app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => this.displayBox(response.outputs[0].data.regions))
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }

    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, boxes, imageWidth, imageHeight, route} = this.state;
    return (
      <div className="App light-silver">
        <Particles params={particleParams} className='particles' />
        <Navigation onRouteChange={ this.onRouteChange } isSignedIn={ isSignedIn } />
        { route === 'home' ?
        <div>
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} width={imageWidth} height={imageHeight} />
        </div> : ( route === 'signin' ?
          <Singin onRouteChange={this.onRouteChange}/> :
          <Register onRouteChange={this.onRouteChange}/>
        )}
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
}

export default App;
