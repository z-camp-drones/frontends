import React from 'react';
import SingleValueTelemetry from './SingleValueTelemetry';
import ReactDOM from 'react-dom';

export class BatteryStatusComponent extends HTMLElement {
    constructor() {
        super();
        console.log("battery Status");
    }

    connectedCallback() {
        ReactDOM.render(<SingleValueTelemetry value={10} label='Battery' suffix='%'/>, this);
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this);
    }
}

console.log("battery Status")
window.customElements.define('battery-status', BatteryStatusComponent);
