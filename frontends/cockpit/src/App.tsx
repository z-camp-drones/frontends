import React, { Component } from 'react';
import './App.css';
import CockpitHeader from './header/CockpitHeader';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'video-stream': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
			'basic-drone-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
			'advanced-drone-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
		}
	}
}

class App extends Component {
	render() {
		return (
			<div>
				<CockpitHeader></CockpitHeader>
				<video-stream></video-stream>
				<basic-drone-control></basic-drone-control>
				<advanced-drone-control></advanced-drone-control>
			</div>
		);
	}
}

export default App;
