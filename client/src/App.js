import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { PureComponent } from "react";
import Navbar from "./Components/Navbar";
import QueItem from "./Components/QueItem";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AuthContextProvider from "./Contexts/AuthContext";
import Logout from "./Components/Logout";
import ScoreContextProvider from "./Contexts/ScoreContext";
import QueDemo from "./Components/QueDemo";
import TimeContextProvider from "./Contexts/TimeContext";

export default class App extends PureComponent {
  render() {
    return (
      <>
        <Router>
            <ScoreContextProvider>
              <TimeContextProvider>
                <AuthContextProvider>
                  <Navbar />
                  <div className="container">
                    <Switch>
                      {!window.localStorage.getItem("user") ? (
                        <Route exact path="/">
                          <QueDemo />
                        </Route>
                      ) : (
                        <Route exact path="/">
                          <QueItem />
                        </Route>
                      )}
                      <Route exact path="/login">
                        <Login />
                      </Route>
                      <Route exact path="/signup">
                        <Register />
                      </Route>
                      <Route exact path="/logout">
                        <Logout />
                      </Route>
                    </Switch>
                  </div>
                </AuthContextProvider>
              </TimeContextProvider>
            </ScoreContextProvider>
        </Router>
      </>
    );
  }
}
