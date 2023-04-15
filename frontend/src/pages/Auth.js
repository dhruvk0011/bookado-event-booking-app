import React, { Component } from "react";
import "./Auth.css";
import AuthContext from "../context/auth-context";

class AuthPage extends Component {
  state = {
    isLogin: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEle = React.createRef();
    this.passwordEle = React.createRef();
  }

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.emailEle.current.value;
    const pwd = this.passwordEle.current.value;
    if (email.trim().length === 0 || pwd.trim().length === 0) return;
    console.log(`data input format - valid`);

    // default is we are Logging in
    let requestBody = {
      query: `
      query {
        login(email:"${email}",password:"${pwd}") {
          userId
          tokenExpiration
          token
        }
      }
      `,
    };
    if (!this.state.isLogin) {
      requestBody = {
        query: `
        mutation {
            createUser(userInpt:{email:"${email}",password:"${pwd}"}) {
              _id
              email
            }
          }
        `,
      };
    }

    // sending requests to backend
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (this.state.isLogin) {
          if (resData.data.login.token) {
            this.context.login(
              resData.data.login.token,
              resData.data.login.userId,
              resData.data.login.tokenExpiration
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };
  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEle} />
        </div>
        <div className="form-control">
          <label htmlFor="pwd">Password</label>
          <input type="password" id="pwd" ref={this.passwordEle} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? "Signup" : "Login"}
          </button>
        </div>
      </form>
    );
  }
}
export default AuthPage;
