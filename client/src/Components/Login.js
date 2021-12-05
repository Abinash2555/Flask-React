// this is login class

import React, { Component } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link, Redirect } from "react-router-dom";

export default class Login extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    //state is created in constructor
    this.state = {
      email: "",
      password: "",
      redirect: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 // event handler function for password
  passwordhandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
 // event handler function for email
  emailhandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
 // event handler function for submit
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.state.email);
    const body = {
      email: this.state.email,
      password: this.state.password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("http://127.0.0.1:5000/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (Object.keys(data)[0] === "error") {
          alert(Object.values(data)[0]);
        } else {
          this.context.userAuth(data);
          this.setState({  redirect: "/" });
        }
      })
      .catch((err) => console.log(err));

    this.setState({
      password: "",
      email: "",
    });
    console.log(this.context.AuthenticatedUser);
  };
  render() {
    if (this.state.redirect) {
      setTimeout(function () {
        window.location.reload();
      }, 500);
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="container center my-5 ">
        <h3 className="text-center my-5">Login Here</h3>
        {/* Login Form Start */}
        <form onSubmit={this.handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="emailid"
                placeholder="Email"
                value={this.state.email}
                onChange={this.emailhandler}
                name="email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password1"
                placeholder="Password"
                value={this.state.password}
                onChange={this.passwordhandler}
                name="password"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" value="Submit">
            Submit
          </button>
        </form>
        {/* Login Form End */}
        <div className="text-center">
       <span class="abt">Don't have an account? <Link to="/signup">Create an Account</Link></span>
    </div>
      </div>
    );
  }
}
