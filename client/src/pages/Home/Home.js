import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Wrapper } from "../../components/Grid";

class Home extends Component {
  state = {

  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

  };

  render() {
    return (
        <Wrapper>
            <Row>
                <Col size="md-4">
                    <Jumbotron>
                    <h1>GET IT TOGETHER</h1>
                    <h4>Personal Financial Website</h4>
                    </Jumbotron>
                </Col>
                <Col size="md-4">
                </Col>
                <Col size="md-4">
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Home;
