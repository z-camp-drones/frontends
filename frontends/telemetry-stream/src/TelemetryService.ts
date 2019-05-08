import TelemetryDto from './telemetry/TelemetryDto';

export default class TelemetryService {
    private eventSource: EventSource | undefined;
    private previousUrl: string | undefined;
    private callback: any;

    constructor(url: string | null) {
        this.updateUrl(url);
    }

    onTelemetetryReceived(callback: any) {
        this.callback = callback;
        this.updateEventCallback();
    }

    updateUrl(url: string | null) {
        if (url && this.previousUrl !== url) {
            this.previousUrl = url;
            this.eventSource = new EventSource(`${url}/data/mocked-events`);
            this.updateEventCallback();
        }
    }

    private updateEventCallback() {
        if (this.eventSource) {
            this.eventSource.onmessage = e => {
                let parse: TelemetryDto = JSON.parse(e.data);
                this.callback(parse);
            }
        }
    }
}