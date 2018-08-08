import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Wrapper } from "../../components/Grid";

class Home extends Component {
  state = {

  };


  handleFormSubmit = event => {
    event.preventDefault();

  };

  render() {
    return (
        <Wrapper>
            <Row>
                <Col size="12">
                    <Jumbotron>
                    <h1>GET IT TOGETHER</h1>
                    <h4>Personal Financial Website</h4>
                    </Jumbotron>
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Home;
