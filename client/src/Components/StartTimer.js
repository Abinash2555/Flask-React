//This is timer class run while start game
import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { TimeContext } from "../Contexts/TimeContext";

export default class StartTimer extends Component {
    static contextType = TimeContext;
  render() {
    let { time } = this.props;
    return (
      <div
        className="d-flex align-items-center flex-column bd-highlight mb-10"
        style={{ height: "200px" }}
      >
        <div className="mb-auto p-2 bd-highlight">
          <CountdownCircleTimer
            isPlaying
            duration={time}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
          <div
            className="border border-info p-2 bd-highlight my-4"
            style={{
              fontFamily: "Garamond, serif",
            }}
          >
            <h5
              style={{
                color: "#FF00FF",
                textShadow: "1px 1px 2px pink",
                fontWeight: "700",
                textDecoration: "underline solid",
              }}
            >
              Note:
            </h5>
            <p>1) You will get 1 min for Each Question.</p>
            <p>2) There are 15 questions.</p>
            <p>3) You will not get score of selection after seeing solution.</p>
            <p> Waits to Start........ Best of Luck</p>
          </div>
      </div>
    );
  }
}
