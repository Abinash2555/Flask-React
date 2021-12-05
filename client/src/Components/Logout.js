// this class used to logout user
import React, { Component } from "react";
import { AuthContext } from "../Contexts/AuthContext"; 
import { Redirect } from "react-router-dom";
import Spinner from "./Spinner";

export default class Logout extends Component {
  static contextType = AuthContext; //calling context called Authcontext 
  constructor() {
    super();
    this.state = {
      redirect: null,
      spinner : true,
    };
    this.logout();
  }
  logout = () => {
    fetch("http://127.0.0.1:5000/signout")// data is fetch from server
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.clear(); //storage data is cleared from local storage.
        this.context.userLogout();
        this.setState({ spinner: false });
      })
      .catch((err) => console.log(err));
  };
  render() {
    if (this.state.redirect) {
      setTimeout(function () {
        window.location.reload();// this will reload the current page after redirect
      }, 0);
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <>
      {this.state.spinner?(
        <Spinner/>
      ): (<div>
         {this.setState({  redirect: "/" })} {/*redirect change */}
      </div>)}
      </>
    );
  }
}
