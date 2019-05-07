import React, {Component} from 'react';
import SingleValueTelemetry from './SingleValueTelemetry';
import TelemetryDto from './telemetry/TelemetryDto';

interface IProps {
    url: string | null;
}

interface IState {
    battery: number;
}


export class BatteryStatus extends Component<IProps, IState> {
    private eventSource: EventSource | null = null;
    private previousUrl: string | null = null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            battery: 0
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
            console.log("Register new EventSource")
            this.eventSource = new EventSource(`${url}/data/mocked-events`);
            this.eventSource.addEventListener("closedConnection", () => this.eventSource && this.eventSource.close());

            this.eventSource.onmessage = (e) => {
                this.updateDroneState(JSON.parse(e.data));
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
        return (
            <div>
                <SingleValueTelemetry value={this.state.battery} label='Battery' suffix='%'/>
            </div>
        );
    }

    private updateDroneState(droneStatus: TelemetryDto) {
        console.log(`upsare `)
        console.log(droneStatus)
        this.setState({...this.state, battery: droneStatus.battery});
    }
}