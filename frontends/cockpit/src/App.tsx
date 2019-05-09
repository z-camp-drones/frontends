import React, {Component} from 'react';
import './App.css';
import CockpitHeader from './header/CockpitHeader';

declare global {
  namespace JSX {
    interface BatteryComponentProps
      extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>,
        HTMLElement> {
      host: string;
    }

    interface IntrinsicElements {
      'video-stream': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>,
        HTMLElement>;
      'basic-drone-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>,
        HTMLElement>;
      'advanced-drone-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>,
        HTMLElement>;
      'battery-status-component': BatteryComponentProps;
    }
  }
}

interface IProps {
}

interface IState {
  host: string;
}

class App extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {host: 'http://localhost:3001'};
    this.handleHostChange = this.handleHostChange.bind(this);
  }

  handleHostChange(event: any) {
    //console.log('test');
    if (event && event.target) {
      this.setState({
        ...this.state,
        host: event && event.target && event.target.value,
      });
    }
  }

  render() {
    return (
      <div>
        <CockpitHeader
          host={this.state.host} onHostChange={this.handleHostChange}></CockpitHeader>
        <video-stream></video-stream>
        <battery-status-component host={this.state.host}></battery-status-component>
        <basic-drone-control></basic-drone-control>
        <advanced-drone-control></advanced-drone-control>
      </div>
    );
  }
}

export default App;
