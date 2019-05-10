import React from 'react';
import ReactDOM from 'react-dom';
import Telemetry from './Telemetry';

export class TelemetryComponent extends HTMLElement {
  private host: string | null;

  constructor() {
    super();
    this.host = this.getAttribute('host');
  }

  static get observedAttributes() {
    return ['host'];
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case 'host':
        this.host = newValue;
        this.connectedCallback();
        break;
      default:
    }
  }

  connectedCallback() {
    ReactDOM.render(<Telemetry url={this.host}/>, this);
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
}

window.customElements.define('telemetry-component', TelemetryComponent);
