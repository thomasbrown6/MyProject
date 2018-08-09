import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { TableHead, TableRow } from "../../components/Table";
import { Card } from "../../components/Card";
import API from "../../utils/API";
import "./Account.css";


class Account extends Component {
  state = {
    incomeAmount: "",
    goalSavings: ""
  };


  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.item && this.state.category && this.state.amount) {
        API.saveIncome({
            incomeAmount: this.state.incomeAmount,
            goalSavings: this.state.goalSavings
        })      // need to load income
            .then(res => console.log(res))
            .catch(err => console.log(err));

    } else {
        return alert("Please fill out all inputs");
    }

  };

  render() {
    return (
        <Wrapper>
            <Row>
                <Col size="2">
                    <form>
                        <label className="account-label">
                            What's your monthly income?
                        </label>
                        <Input
                            value={this.state.incomeAmount}
                            onChange={this.handleInputChange}
                            name="incomeAmount"
                            placeholder="$00.00"
                        />
                        
                        
                    </form>
                </Col>
                <Col size="2">
                    <form>
                        <label className="account-label">
                            What's your goal for savings this month?
                        </label>
                        <Input
                            value={this.state.goalSavings}
                            onChange={this.handleInputChange}
                            name="goalSavings"
                            placeholder="$00.00"
                        />
                        <FormBtn
                        disabled={!(this.state.item && this.state.category && this.state.amount && this.state.date)}
                        onClick={this.handleFormSubmit}
                    >
                        Submit 
                    </FormBtn>
                    </form>
                </Col>
                <Col size="5">
                
                </Col>

                <Col size="3">
                    <Card
                        title="Account Details"
                        body1="Name:"
                        body2="Email:"
                        body3="Reset Password:"
                        body4={"Savings: " + this.state.goalSavings}
                        body5={"Income: " + this.state.incomeAmount}
                    />    
            
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Account;
