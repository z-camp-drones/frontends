import React, {Component} from 'react';
import './App.css';
import 'eventsource-polyfill';
import TelemetryDto from './telemetry/TelemetryDto';
import {Telemetry} from './Telemetry';
import {BatteryStatus} from './BatteryStatus';


interface IProps {

}

interface IState {
    droneStatus: TelemetryDto | null;
    url: string;
}

export default class App extends Component<IProps, IState> {
    private eventSource: EventSource;

    constructor(props: IProps) {
        super(props);
        this.state = {
            droneStatus: null,
            url: 'http://localhost:3001'
        };

        this.eventSource = new EventSource("http://localhost:3001/data/mocked-events");
        this.handleChange = this.handleChange.bind(this);
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


    handleChange(event: any) {
        if (event && event.target) {
            this.setState({
                ...this.state,
                url: event && event.target && event.target.value
            });
        }
    }

    render() {
        return (
            <div className="App">
                <input type="text" value={this.state.url} onChange={this.handleChange}/>
                <BatteryStatus url={this.state.url}/>
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



