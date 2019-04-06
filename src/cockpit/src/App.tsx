import React, { Component } from 'react';
import './App.css';
import CockpitHeader from './header/CockpitHeader';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'video-stream': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <CockpitHeader></CockpitHeader>
        <video-stream></video-stream>
      </div>
    );
  }
}

export default App;
