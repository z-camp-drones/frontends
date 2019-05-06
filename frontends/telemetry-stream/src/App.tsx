import React, {Component} from 'react';
import './App.css';
import 'eventsource-polyfill';
import TelemetryDto from './telemetry/TelemetryDto';
import {Telemetry} from './Telemetry';

interface IProps {

}

interface IState {
    droneStatus: TelemetryDto | null;
    name: string;
}

export default class App extends Component<IProps, IState> {
    private eventSource: EventSource;

    constructor(props: IProps) {
        super(props);
        this.state = {
            droneStatus: null,
            name: "Hello"
        };

        this.eventSource = new EventSource("http://localhost:3001/data/mocked-events");
    }

    componentDidMount() {
        this.eventSource.addEventListener("closedConnection", e =>
            this.stopUpdates()
        );

        this.eventSource.onmessage = e =>
            this.updateDroneState(JSON.parse(e.data));
    }

    stopUpdates() {
        this.eventSource.close();
    }

    render() {
        return (
            <div className="App">

                <Telemetry droneStatus={this.state.droneStatus}/>
            </div>
        );
    }

    private updateDroneState(telemetry: TelemetryDto) {
        this.setState({
            ...this.state,
            droneStatus: telemetry
        });

    }
}



