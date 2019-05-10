import React, {Component} from 'react';
import Slider from '@material-ui/lab/Slider';
import './SpeedSlider.css';


interface IProps {
  onChange: Function;
}

interface IState {
  value: number;
}

class SpeedSlider extends Component<IProps, IState> {

  private readonly MAX_SPEED = 100;
  private readonly MIN_SPEED = 10;
  private readonly STEP = 10;

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: this.MAX_SPEED,
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(e: any, value: any) {
    this.setState({
      value: value
    });
    this.props.onChange(this.state.value);
  }

  render() {
    return (
      <div className="slider">
        <Slider
          value={this.state.value}
          min={this.MIN_SPEED}
          max={this.MAX_SPEED}
          step={this.STEP}
          onChange={this.handleSliderChange}
        />
      </div>
    );
  }
}

export default SpeedSlider;
