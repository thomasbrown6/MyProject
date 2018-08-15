import React, { Component } from "react";
import MortgageCalculator from "mortgage-calculator-react";
import "./Mortgage.css";
import { Col, Row, Wrapper } from "../../components/Grid";
import axios from "axios";

class Mortgage extends Component {
  state = {
    tyf: "",
    fyf: "",
    fyj: "",
    fya: "",
    tyj: "",
    oya: ""
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
          tyf : results.data[0].rates[2],
          fyj : results.data[0].rates[1],
          fya : results.data[0].rates[5],
          tyj : results.data[0].rates[3],
          oya : results.data[0].rates[4],
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
              <p className="ctext">Courtesy of the <a className="findHome" href="https://markets.on.nytimes.com/research/markets/rates/rates.asp" target="_blank" rel="noopener noreferrer">New York Times</a></p>
              <ul>
                <li>30 Year Fixed: {this.state.tyf}%</li>
                <li>15 Year Fixed: {this.state.fyf}%</li>
                <li>30 Year Jumbo: {this.state.tyj}%</li>
                <li>15 Year Jumbo: {this.state.fyj}%</li>
                <li>5 Year ARM: {this.state.fya}%</li>
                <li>1 Year ARM: {this.state.oya}%</li>
              </ul>
              <br />
              <a className="findHome" href="https://www.zillow.com/" target="_blank" rel="noopener noreferrer">Find a Home on Zillow</a>
              <br />
              <a className="findHome" href ="https://www.realtor.com/realestateagents" target="_blank" rel="noopener noreferrer">Find a Realtor</a>
            </div>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Mortgage;
