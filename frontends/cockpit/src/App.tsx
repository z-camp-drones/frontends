import React, { Component } from "react";
import "./App.css";
import CockpitHeader from "./header/CockpitHeader";

declare global {
  namespace JSX {
    interface BatteryComponentProps
      extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > {
      host: string;
    }

    interface IntrinsicElements {
      "video-stream": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "basic-drone-control": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "advanced-drone-control": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "battery-status-component": BatteryComponentProps;
    }
  }
}

interface IProps {}

interface IState {
  host: string;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { host: "http://localhost:3001" };
    this.handleHostChange = this.handleHostChange.bind(this);
  }

  handleHostChange(event: any) {
    if (event && event.target) {
      console.log("value changed");
      this.setState({
        ...this.state,
        host: event && event.target && event.target.value
      });
    }
  }

  render() {
    return (
      <div>
        <CockpitHeader
          host={this.state.host}
          onHostChange={this.handleHostChange}
        />

        <video-stream />
        <battery-status-component host={this.state.host} />
        <basic-drone-control />
        <advanced-drone-control />
      </div>
    );
  }
}

export default App;
