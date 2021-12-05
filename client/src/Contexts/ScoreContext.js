// Making  context for score
import React, { Component, createContext } from 'react';

export const ScoreContext = createContext();

class ScoreContextProvider extends Component {
  state = {
    score: null
  }
  scoreUpdate = () => {
    this.setState({ score: this.state.score + 1 }); //Score update while calling this method
  }
  render() { 
    return (
      <ScoreContext.Provider value={{...this.state, scoreUpdate: this.scoreUpdate}}>
        {this.props.children}
      </ScoreContext.Provider>
    );
  }
}
 
export default ScoreContextProvider;