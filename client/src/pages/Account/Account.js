import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { ProfileCard } from "../../components/Card";
import { EditButton } from "../../components/Button";
import API from "../../utils/API";
import "./Account.css";


class Account extends Component {
  state = {
    incomeAmount: "",
    goalSavings: "",
    spending: ""
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
                <Col size="4">
                    <ProfileCard
                    title="Thomas Brown"   // this.user.name
                    body2="Email: Thomas.brown1125@gmail.com"
                    />

                    <ProfileCard
                        body1="Spending"
                        body2={this.state.spending}
                    >
                    </ProfileCard>
                    <ProfileCard
                        body1="Income"
                        body2={this.state.incomeAmount}
                    >
                        <EditButton>
                            Edit
                        </EditButton>
                    </ProfileCard>
                    <ProfileCard
                        body1="Goal to Save"
                        body2={this.state.goalSavings}
                    >
                        <EditButton>
                            Edit
                        </EditButton>
                    </ProfileCard>
                    
                    {/* <form>
                        <label className="account-label">
                            What's your monthly income?
                        </label>
                        <Input
                            value={this.state.incomeAmount}
                            onChange={this.handleInputChange}
                            name="incomeAmount"
                            placeholder="$00.00"
                        />
                        
                        
                    </form> */}
                </Col>
                <Col size="1">
                    {/* <form>
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
                    </form> */}
                </Col>
                <Col size="4">
                
                </Col>

                <Col size="3">
            
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Account;
