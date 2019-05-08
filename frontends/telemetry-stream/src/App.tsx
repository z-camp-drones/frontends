import React, {Component} from 'react';
import './App.css';
import 'eventsource-polyfill';
import TelemetryDto from './telemetry/TelemetryDto';
import Telemetry from './Telemetry';
import {BatteryStatus} from './BatteryStatus';
import TelemetryService from './TelemetryService';


interface IProps {

}

interface IState {
    droneStatus: TelemetryDto | null;
    url: string;
}

export default class App extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            droneStatus: null,
            url: 'http://localhost:3001'
        };


        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        new TelemetryService(this.state.url)
            .onTelemetetryReceived((tel: TelemetryDto) => this.setState({droneStatus: tel}));
    }


    handleChange(event: any) {
        if (event && event.target) {
            this.setState({
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
}



