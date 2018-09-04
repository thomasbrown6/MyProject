import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { ProfileCard } from "../../components/Card";
import API from "../../utils/API";
import "./Account.css";
import { app } from "../../config";

class Account extends Component {
  state = {
    income: "",
    goalSavings: "",
    spending: "",
    email: ""
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    API.getAllSpending()
      .then(res => {
        const getUserSpending = [];

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email === this.state.email) {
            getUserSpending.push(res.data[i]);
          }
        }
        const totalSpending = [];
        for (let i = 0; i < getUserSpending.length; i++) {
          totalSpending.push(getUserSpending[i].amount);
        }

        const addSpendAmount = (accumulator, currentValue) =>
          accumulator + currentValue;

        const total = totalSpending.reduce(addSpendAmount);
        this.setState({ spending: "$" + total });
      })
      .catch(err => console.error(err));

    API.getIncomes().then(res => {
      console.log(res.data[0].amount);
      let amount = res.data[0].amount;
      this.setState({ income: "$" + amount });
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          email: user.email
        });
   
      } else {
        this.setState({
          authenticated: false,
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    return (
      <Wrapper>
        <Row>
          <Col size="2" />
          <Col size="8">
            <ProfileCard
              body1="Account Email:" // this.user.name
              body2={this.state.email}
            />

            {/* <ProfileCard body1="Total Spending:" body2={this.state.spending} />
            <ProfileCard body1="Monthly Income:" body2={this.state.income} /> */}
            {/* <ProfileCard
                        body1="Goal to Save:"
                        body2={this.state.goalSavings}
                    >
                    </ProfileCard> */}

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
            {/* </Col>
                <Col size="1"> */}
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
          {/* <Col size="4">
                
                </Col> */}

          <Col size="2" />
        </Row>
      </Wrapper>
    );
  }
}

export default Account;
