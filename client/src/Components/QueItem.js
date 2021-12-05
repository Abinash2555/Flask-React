import React, { PureComponent } from "react";
import { ScoreContext } from "../Contexts/ScoreContext";
import { TimeContext } from "../Contexts/TimeContext";
import Que from "./Que";
import Spinner from "./Spinner";
import StartTimer from "./StartTimer";

export default class QueItem extends PureComponent {
  static contextType = ScoreContext;
  static contextType = TimeContext;
  length = null;
  lis = [];
  quedata = null;
  index = 0;
  constructor() {
    super();
    this.state = {
      questions: [],
      opt_list: [],
      loading: true,
      last: false,
      spinner: true,
    };
  
    // the code is refrence from 100, G. (2010) Generate unique random numbers between 1 and 100, Stack Overflow. Available at: https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100 (Accessed: 23 October 2021).
    const nums = new Set();
    while (nums.size !== 15) {
      nums.add(Math.floor(Math.random() * 111));
    }
    this.lst = Array.from(nums);
  }
  update = async () => {
    let url = "http://127.0.0.1:5000/api"; //url for fetching json data from server
    this.setState({
      spinner: true
    });
    let data = await fetch(url);
    this.quedata = await data.json();
    this.length = this.quedata.length;
    this.setState({
      questions: this.quedata[this.lst[this.index]],
      spinner: false,
      // update the questions value using setstate
    });
    let opts = this.state.questions.OPT;
    this.setState({
      opt_list: Array.from(opts), // convert json value to array to retrive the options of questions
    });
    // console.log(this.state.questions.ANS);
  };
  async componentDidMount() {
    // this fuction excute after the render fuction
    this.update();
  }

  handleStart = async () => {
    // handle previous button
    window.location.reload(true);
  };
  handleNextClick = async () => {
    //  handle next button
    if (this.index === 13) {
      this.setState({
        last: true, // convert json value to array to retrive the options of questions
      });
    }
    this.index = this.index + 1; // increase the index by 1
    this.update();
  };
  render() {
    // This will start Spinner
    if (this.state.spinner) {
      setTimeout(
        () =>
          this.setState({
            loading: false,
          }),
        25000
      );
      return <Spinner/>
    }
    
    return (
      <>
      {/* Game start after 25 sec */}
        {this.state.loading ? (
          <StartTimer time= {25} />
        ) : (
          <div>
            {/* Spinner start for each que */}
            {this.state.spinner?(
              <Spinner/>
            ):(
              <div className="container my-3">
              <h1 className="text-center">Math QUIZ</h1>
              <div className="container mx-2">
                {/* Showing score */}
                <ScoreContext.Consumer>
                  {(value) => {
                    return (
                      <div
                        className="card bg-warning text-dark  "
                        style={{
                          width: "10rem",
                          fontFamily: "Apple Chancery, cursive",
                          marginBottom: "-199px",
                          marginTop: "90px",
                        }}
                      >
                        <div className="card-body d-flex ustify-content-start">
                          <h5 className="card-title mx-3">Score: </h5>
                          <p className="card-text" style={{ fontSize: "20px" }}>
                            {value.score}
                          </p>
                        </div>
                      </div>
                    );
                  }}
                </ScoreContext.Consumer>
              </div>
              {/* Question Part */}
              <div className="container" key={this.state.questions.Qno}>
                <Que
                  Qno={`Question No ${this.index + 1}`}
                  Que={this.state.questions.QUE}
                  opts={this.state.opt_list}
                  ans={this.state.questions.ANS}
                  sol={this.state.questions.SOL}
                />
                <div className="d-flex bd-highlight mb-3">
                  {this.state.last ? (
                    <div className="mr-auto p-2 bd-highlight">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={this.handleStart}
                    >
                      {" "}
                      &larr; Start Again
                    </button>
                    </div>
                  ) : null}
                  <div className="p-2 bd-highlight">
                  <button
                    disabled={this.index === 14}
                    type="button"
                    className="btn btn-dark"
                    onClick={this.handleNextClick}
                    id="next"
                  >
                    Next &rarr;
                  </button>
                  </div>
                </div>
              </div>
            </div>
            // Question part end
            )
            }
          </div>
          
        )}
      </>
    );
  }
}
