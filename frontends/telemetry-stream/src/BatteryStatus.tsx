import React, {Component} from 'react';
import SingleValueTelemetry from './SingleValueTelemetry';
import TelemetryDto from './telemetry/TelemetryDto';

interface IProps {
    url: string | null;
}

interface IState {
    battery: number | null;
    connectionError: boolean;
}


export class BatteryStatus extends Component<IProps, IState> {
    private eventSource: EventSource | null = null;
    private previousUrl: string | null = null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            battery: 0,
            connectionError: false
        }
    }

    componentDidMount() {
        this.queryData(this.props.url);
    }

    private queryData(url: string | null) {

        if (this.eventSource) {
            this.eventSource.close();
        }
        if (url) {
            try {
                this.setState({...this.state, connectionError: false, battery: null});
                this.eventSource = new EventSource(`${url}/data/mocked-events`);
                this.eventSource.addEventListener("closedConnection", () => this.eventSource && this.eventSource.close());

                this.eventSource.onmessage = (e) => {
                    this.updateDroneState(JSON.parse(e.data));
                };
                this.eventSource.onerror = (e) => {
                    this.setState({...this.state, connectionError: true});
                };
            }
            catch (e) {
                this.setState({...this.state, battery: null, connectionError: true})
            }
        }
    }

    componentWillUpdate() {
        if (this.previousUrl !== this.props.url) {
            this.previousUrl = this.props.url;
            this.queryData(this.props.url);
        }
    }

    render() {
        if (this.state.connectionError) {
            return (<div>Connection not established.</div>)
        }
        if (!this.state.battery) {
            return (<div>No Data yet. Loading...</div>)
        }
        if (this.state.battery) {
            return (
                <div>
                    <SingleValueTelemetry value={this.state.battery} label='Battery' suffix='%'/>
                </div>
            );
        }
    }

    private updateDroneState(droneStatus: TelemetryDto) {
        this.setState({...this.state, battery: droneStatus.battery, connectionError: false});
    }
}