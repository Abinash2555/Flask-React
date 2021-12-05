//This is timer class run for each ques
import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { TimeContext } from "../Contexts/TimeContext";

export default class Timer extends Component {
  static contextType = TimeContext;
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  //componentDidMount is invoked immediately after a component is mounted
  componentDidMount() {
    const { startCount } = this.props;
    this.setState({
      count: startCount,
    });
    this.doIntervalChange();
  }
  //doIntervalChange is for time maintenance time interval 
  doIntervalChange = () => {
    this.myInterval = setInterval(() => {
        this.setState((prevState) => ({
          count: prevState.count - 1,
        }));
      this.context.TimeUpdate(this.state.count);

    }, 1000);
  };
  //componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Next...</div>;
    }
    return (
      <div className="timer">
        <div className="text-center">Remaining</div>
        <div className="text-center">{remainingTime}</div>
        <div className="text-center">seconds</div>
      </div>
    );
  };
  render() {
    return (
      <>
        <div
          className="d-flex align-items-center flex-column bd-highlight mb-10"
          style={{ height: "167px", marginTop: "30px"}}
        >
          <div className="mb-auto p-2 bd-highlight">
            <CountdownCircleTimer
              isPlaying
              duration={this.props.startCount}
              colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
              onComplete={() => [false, 1000]}
            >
              {this.renderTime}
            </CountdownCircleTimer>
          </div>
        </div>
      </>
    );
  }
}
