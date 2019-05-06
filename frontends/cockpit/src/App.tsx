import React, { Component } from 'react';
import './App.css';
import CockpitHeader from './header/CockpitHeader';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'video-stream': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'control-center': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <CockpitHeader></CockpitHeader>
        <video-stream></video-stream>
        <control-center id="app"></control-center>
      </div>
    );
  }
}

export default App;
