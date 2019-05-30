import React, {Component} from 'react';
import './App.css';
import CockpitHeader from './header/CockpitHeader';
import SpeedSlider from './speed-slider/SpeedSlider';
import io from 'socket.io-client';


declare global {
  namespace JSX {
    interface DroneStatusComponentProps
      extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>,
        HTMLElement> {
      host: string;
    }

    interface IntrinsicElements {
      'video-stream': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>,
        HTMLElement>;
      'replay-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'basic-drone-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'advanced-drone-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'battery-status-component': DroneStatusComponentProps;
      'telemetry-component': DroneStatusComponentProps;
    }
  }
}

interface IProps {
}

interface IState {
  host: string;
  connectedToDrone: boolean;
}

class App extends Component<IProps, IState> {

  private readonly host = 'http://localhost:3001';
  private readonly socket: SocketIOClient.Socket;

  constructor(props: IProps) {
    super(props);
    this.socket = io(this.host);
    console.log('\ns');
    this.state = {
      host: this.host,
      connectedToDrone: false,
    };

    this.socket.on('connection_successful', () => {
      this.setState({connectedToDrone: true});
    });

    this.handleHostChange = this.handleHostChange.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onSpeedChange = this.onSpeedChange.bind(this);
    this.dispatchSpeedChangeEvent = this.dispatchSpeedChangeEvent.bind(this);
  }

  handleHostChange(event: any) {
    console.log();
    if (event && event.target) {
      this.setState({
        ...this.state,
        host: event && event.target && event.target.value,
      });
    }
  }

  onConnect() {
    this.socket.emit('init_connection', {});
  }

  onSpeedChange(droneSpeed: number) {
    this.dispatchSpeedChangeEvent(droneSpeed);
  }

  dispatchSpeedChangeEvent(droneSpeed: number) {
    document.dispatchEvent(
      new CustomEvent('drone-speed-change-event', {
        detail: droneSpeed,
      })
    );
  }

  render() {
    return (
      <div>
        <CockpitHeader
          host={this.state.host}
          droneConnected={this.state.connectedToDrone}
          onHostChange={this.handleHostChange}
          onConnect={this.onConnect}></CockpitHeader>
        <video-stream></video-stream>
        <replay-control></replay-control>
        <battery-status-component host={this.state.host}></battery-status-component>
        <telemetry-component host={this.state.host}></telemetry-component>
        <basic-drone-control></basic-drone-control>
        <div className="speed-slider">
          <SpeedSlider onChange={this.onSpeedChange}></SpeedSlider>
        </div>
        <advanced-drone-control></advanced-drone-control>
      </div>
    );
  }
}


export default App;
