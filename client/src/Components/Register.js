import React, { Component } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link,Redirect } from "react-router-dom";

export default class Register extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
//state is created in constructor
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      conpassword: "",
      email: "",
      username: "",
      serverResponse: "",
      redirect: "",
      show: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
// event handler function for first name
  firsthandler = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  // event handler function for last name
  lasthandler = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

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

  // event handler function for user name
  usernamehandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  // event handler function for confirm  password
  conpasswordhandler = (event) => {
    this.setState({
      conpassword: event.target.value,
    });
  };
  // event handler function for submit

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.state.email);
    if (this.state.password === this.state.conpassword) {
      const body = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };

      // request body is start to create
      const requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      };
     // request body is end to create

      fetch("http://127.0.0.1:5000/signup", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          this.context.userLogout();
          this.context.userAuth(data);
          this.setState({ redirect: "/" });
          this.setState({
            serverResponse: data,
            show: true,
          });
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords do not match");
    }
    this.setState({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      username: "",
      conpassword: "",
    });
    console.log("State value");
    console.log(Object.keys(this.state.serverResponse));
  };
  render() {
    if (this.state.redirect) {
      setTimeout(function () {
        window.location.reload();
      }, 100);
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="container center my-5">
        <h3 className="text-center my-5">Create an account</h3>
        {/* Start Registration form */}
        <form onSubmit={this.handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={this.state.firstName}
                onChange={this.firsthandler}
                name="fname"
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                aria-label="Last name"
                value={this.state.lastName}
                onChange={this.lasthandler}
                name="lname"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="usernameid"
              placeholder="Username"
              value={this.state.username}
              onChange={this.usernamehandler}
              name="unameid"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password2"
              placeholder="Confirm Password"
              name="cpassword"
              value={this.state.conpassword}
              onChange={this.conpasswordhandler}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" value="Submit">
            Submit
          </button>
        </form>
        {/* End Registration form */}
        <div className="text-center">
         <span class="abt">Already have an account? <Link to="/login">Sign In</Link></span>
    </div>
      </div>
    );
  }
}
