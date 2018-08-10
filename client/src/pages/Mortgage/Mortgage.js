import React, { Component } from "react";
import MortgageCalculator from "mortgage-calculator-react";
 import "./Mortgage.css";
import { Col, Row, Wrapper } from "../../components/Grid";

class Mortgage extends Component {
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
                <Col size="3">

                </Col>
                <Col size="6">
                <div className="mc">
                    {/* <MortgageCalculator styles={customStyle} /> */}
                    <MortgageCalculator />

                </div>
                </Col>
                <Col size="3">
 
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Mortgage;
