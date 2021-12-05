import React, { Component } from "react";
import { ScoreContext } from "../Contexts/ScoreContext";
import { TimeContext } from "../Contexts/TimeContext";
import Timer from "./Timer";

export default class Que extends Component {
  static contextType = TimeContext;
  constructor() {
    super();
    this.state = {
      showAns: false,
    };
  }
  action = async () => {
    this.setState({
      showAns: true,
    });
  };

  render() {
    let { Qno, Que, opts, ans, sol } = this.props;
    return (
      <>
        <div className="container  my-3">
          {window.localStorage.getItem("user") ? (
            <div className="container d-flex justify-content-end">
              <Timer startCount={60} />
            </div>
          ) : null}

          <div className="card" style={{ marginTop: "50px" }}>
            <div className="card-header">{Qno}</div>
            <div className="card-body">
              <div
                className="container-fluid text-center col-md-10"
                id="mainpart"
              >
                <h4 className="card-title my-3">{Que}</h4>
                <p style={{ fontFamily: "Apple Chancery, cursive" }}>
                  Choose your Answer!!
                </p>
                <hr className="hr center mx-auto" style={{ width: "50%" }} />
                <ScoreContext.Consumer>
                  {(value) => {
                    return (
                      <>
                        {!(
                          this.context.time <= 0
                        ) ? (
                          <div className="container center d-flex justify-content-center">
                            {opts.map((opt) => {
                              return (
                                <div
                                  className="form-check form-check-inline"
                                  style={{
                                    height: "20px",
                                  }}
                                  key={opt}
                                  onChange={(event) => {
                                    var radio =
                                      document.getElementsByName("option");
                                    var len = radio.length;
                                    for (var i = 0; i < len; i++) {
                                      if (radio[i].checked) {
                                        var span =
                                          document.createElement("span");
                                        if (radio[i].value === ans) {
                                          if (this.state.showAns) {
                                            alert("You will not get score!");
                                          } else {
                                            value.scoreUpdate();
                                          }
                                          span.innerHTML = "&#128522;";
                                        } else {
                                          span.innerHTML = "&#128533;";
                                        }
                                        span.style.marginBottom = "10px";
                                        span.style.fontSize = "50px";
                                        document
                                          .getElementById("mainpart")
                                          .appendChild(span);
                                      }
                                      radio[i].disabled = true;
                                    }
                                  }}
                                >
                                  <input
                                    className="form-check-input my-1"
                                    type="radio"
                                    name="option"
                                    id={opt}
                                    value={opt}
                                  />
                                  <label
                                    className="form-check-label  mx-3"
                                    htmlFor={opt}
                                  >
                                    {opt}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </>
                    );
                  }}
                </ScoreContext.Consumer>
              </div>
              <div className="d-flex align-items-center my-5">
                <div className="flex-shrink-0">
                  {!this.state.showAns ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={this.action}
                    >
                      View Solution
                    </button>
                  ) : null}
                </div>
                <div className="flex-grow-1 ms-3">
                  {this.state.showAns ? (
                    <p className="lead alert alert-primary mx-4">{sol}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
