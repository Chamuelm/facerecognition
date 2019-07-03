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


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      imageWidth: "",
      imageHeight: ""
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

  render() {
    return (
      <div className="App light-silver">
        <Particles params={particleParams} className='particles' />
        <Navigation />
        <Singin />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} boxes={this.state.boxes} width={this.state.imageWidth} height={this.state.imageHeight} />
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
}

export default App;
