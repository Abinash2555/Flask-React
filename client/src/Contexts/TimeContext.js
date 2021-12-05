//This is context for time
import React, { Component, createContext } from 'react';

export const TimeContext = createContext();

class TimeContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      time : null,
    };
  }
 
  TimeUpdate = (sec) => {
    this.setState({
      time: sec,
    });
  }
  render() { 
    return (
      <TimeContext.Provider value={{...this.state, TimeUpdate: this.TimeUpdate}}>
        {this.props.children}
      </TimeContext.Provider>
    );
  }
}
 
export default TimeContextProvider;