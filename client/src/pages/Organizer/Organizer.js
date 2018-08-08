import React, { Component } from "react";
import { Card } from "../../components/Card";
import { Col, Row, Wrapper } from "../../components/Grid";

class Organizer extends Component {
  state = {

  };


  handleFormSubmit = event => {
    event.preventDefault();

  };

  render() {
    return (
        <Wrapper>
            <Row>
                <Col size="4">
                    <Card
                        title="Accounts"
                        body1="Income"
                        body2="Credit Cards"
                    />
                </Col>
                <Col size="4">
 
                </Col>
                <Col size="4">
 
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Organizer;
