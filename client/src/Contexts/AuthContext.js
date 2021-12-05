import React, { Component, createContext } from 'react';

export const AuthContext = createContext();
//React context allows us to pass down and use (consume) data in whatever component we need in our React app without using props.
class AuthContextProvider extends Component {
  state = {
    AuthenticatedUser: ""
  }
  userAuth = (data) => {
    this.setState({ AuthenticatedUser: data });
    localStorage.setItem("user",JSON.stringify(data)); //data is store in local storage
  }
  userLogout = () => {
    this.setState({ AuthenticatedUser: "" });
    window.localStorage.clear();
  }
  render() { 
    return (
      <AuthContext.Provider value={{...this.state, userAuth: this.userAuth, userLogout:this.userLogout}}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default AuthContextProvider;