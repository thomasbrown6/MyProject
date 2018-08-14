import React, { Component } from "react";
import MortgageCalculator from "mortgage-calculator-react";
import "./Mortgage.css";
import { Col, Row, Wrapper } from "../../components/Grid";
import axios from "axios";

class Mortgage extends Component {
  state = {
    tyf: "",
    fyf: "",
    sya: "",
    fya: "",
    tyv: ""
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
  componentDidMount() {
    axios.get("/api/scrape")
      .then( (results) => {
        console.log(results)
        this.setState({
          fyf : results.data[0].rates[0],
          tyf : results.data[0].rates[1],
          sya : results.data[0].rates[2],
          fya : results.data[0].rates[3],
          tyv : results.data[0].rates[4]
        });
      })

  }

  render() {
    return (
      <Wrapper>
        <Row>
          <Col size="1">

          </Col>
          <Col size="6">
            <div className="mc">
              {/* <MortgageCalculator styles={customStyle} /> */}
              <MortgageCalculator />

            </div>
          </Col>
          <Col size="1">

          </Col>
          <Col size="4">
            <div className="qlrates">
              <h4>Today's Mortgage Rates</h4>
              <p className="ctext">Courtesy of <a className="findHome" href="https://www.quickenloans.com/mortgage-rates?qlsource=nav" target="_blank">QuickenLoans</a></p>
              <ul>
                <li>30 Year Fixed: {this.state.tyf}%</li>
                <li>15 Year Fixed: {this.state.fyf}%</li>
                <li> 7 Year ARM: {this.state.sya}%</li>
                <li> 5 Year ARM: {this.state.fya}%</li>
                <li>30 Year VA: {this.state.tyv}%</li>
              </ul>
              <br />
              <a className="findHome" href="https://www.zillow.com/" target="_blank">Find a Home on Zillow</a>
              <br />
              <a className="findHome" href ="https://www.realtor.com/realestateagents" target="_blank">Find a Realtor</a>
            </div>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Mortgage;
