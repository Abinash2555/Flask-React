//This is for Demo page run for every visitors
import React, { Component } from "react";
import { ScoreContext } from "../Contexts/ScoreContext";
import Que from "./Que";
import Spinner from "./Spinner";

export default class QueDemo extends Component {
  static contextType = ScoreContext;
  lis = [];
  index = 0;
  //Demo questions
  questions = [
    {
      Qno: "Question No 1",
      QUE: "63 , 35 , 15 , 3 , ?",
      OPT: ["10", "3", "-1", "-3"],
      ANS: "-1",
      SOL: "8^2 - 1 = 63and6^2 - 1 = 35and4^2 - 1 = 15and2^2 - 1 = 3in the same way0^2 - 1 = -1.",
    },
    {
      Qno: "Question No 2",
      QUE: "0.67 , 0.69 , 0.48 , 0.88 , 0.29 , 1.07 , ?",
      OPT: ["0.92", "0.10", "0.32", "2.17"],
      ANS: "0.10",
      SOL: "There are two seriesSubtract 0.19 from the series starting with 0.67 and add 0.19 from the series starting with 0.69..",
    },
    {
      Qno: "Question No 3",
      QUE: "3 , 10 , 33 , 104 , ?",
      OPT: ["219", "319", "619", "1019"],
      ANS: "319",
      SOL: "Multiply with 3 and add 1, 3, 5, 7,....",
    },
    {
      Qno: "Question No 4",
      QUE: "F , O , T , W , ?",
      OPT: ["Y", "Z", "A", "B"],
      ANS: "Y",
      SOL: "Skip 8 , 4 , 2 , 1 alphabets..",
    },
    {
      Qno: "Question No 5",
      QUE: "87 , 102 , 119 , 138 , 159 , ?",
      OPT: ["182", "180", "178", "176"],
      ANS: "182",
      SOL: "Adding 15 , 17 , 19,....",
    },
    {
      Qno: "Question No 6",
      QUE: "C , F , J , O , ?",
      OPT: ["C", "O", "U", "I"],
      ANS: "U",
      SOL: "Skip 2 , 3 , 4,... alphabets..",
    },
    {
      Qno: "Question No 7",
      QUE: "492 , 366 , 189 , 810 , ?",
      OPT: ["1260", "675", "88", "1015"],
      ANS: "88",
      SOL: "8 * 1 = 8, 8 + 0 = 8.",
    },
    {
      Qno: "Question No 8",
      QUE: "9 , 11 , 17 , 35 , ?",
      OPT: ["108", "99", "114", "89"],
      ANS: "89",
      SOL: "Add 2 , 6 , 18 , 54,...here6 = 2*318 = 6*3and54 = 18*3.",
    },
  ];
  constructor() {
    super();
    //constructor is made
    this.state = {
      questions: this.questions[this.index],
      loading: false,
      score: 0,
      spinner: true
    };
    //Randomly  call questions
    const nums = new Set();
    while (nums.size !== 8) {
      nums.add(Math.floor(Math.random() * 8) );
    }

    this.lst = Array.from(nums);
  }
//Update function 
  update = () => {
    this.setState({
      questions: this.questions[this.lst[this.index]],
      spinner:true
    });
  };

  async componentDidMount() {
    this.update();
    
  }
//Handle previous button  
  handlePrevClick = async () => {
    this.index = this.index - 1;
    this.update();
  };

  //Handle Next button  
  handleNextClick = async () => {
    if (this.index + 1 > this.questions.length) {
    } else {
      this.index = this.index + 1;
      this.update();
    }
  };
  render() {
    // Spinner start
    if (this.state.spinner) {
      setTimeout(
        () =>
        this.setState({
          spinner: false,
        }),
        1000
      );
      return <Spinner/>
    }

    return (
      <>
      {/* Checking whether spinner is on or off  */}
      {this.state.spinner?(
        <Spinner/>
      ):(<div>
        <div className="container my-3">
          <h1 className="text-center">Math QUIZ</h1>
          <div className="container mx-2">
            <div
              className="card bg-warning text-dark  "
              style={{ width: "10rem", fontFamily: "Apple Chancery, cursive" }}
            >
              <div className="card-body d-flex ustify-content-start">
                <h5 className="card-title mx-3">Score: </h5>
                <p className="card-text" style={{ fontSize: "20px" }}>
                  {this.context.score}
                </p>
              </div>
            </div>
          </div>
          {/* Question part start  */}
          <div className="container" key={this.state.questions.Qno}>
            <Que
              Qno={`Question No ${(this.index)+1}`}
              Que={this.state.questions.QUE}
              opts={this.state.questions.OPT}
              ans={this.state.questions.ANS}
              sol={"You have to login in order to see solution"}
              score={this.state.score}
            />
            <div className="container d-flex justify-content-between">
              <button
                disabled={this.index <= 0}
                type="button"
                className="btn btn-dark"
                onClick={this.handlePrevClick}
              >
                {" "}
                &larr; Previous
              </button>
              <button
                disabled={this.index + 1 === this.questions.length}
                type="button"
                className="btn btn-dark"
                onClick={this.handleNextClick}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
        {/* Question part End  */}
      </div>)};
      
      </>
    );
  }
}
