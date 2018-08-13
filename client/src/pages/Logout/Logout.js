import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { Spinner } from '@blueprintjs/core'
import { app } from "../../config";

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  componentWillMount() {
    app.auth().signOut().then(user => {
        this.setState({ redirect: true });
      });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3>Logging Out</h3>
      </div>
    );
  }
}

export default Logout;
