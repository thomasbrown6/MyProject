import React, { Component } from "react";
import { Card, PieChartCard } from "../../components/Card";
import { Col, Row, Wrapper } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import moment from "moment";
import API from "../../utils/API";
import "./Organizer.css";
import { app } from "../../config";
import { Input, FormBtn } from "../../components/Form";


class Organizer extends Component {
  state = {
    data: [],
    upcomingBills: [],
    email: "",
    monthlyIncome: [0],
    amount: "",
    date: "",
    spendingTotal: 0,
    billsTotal: 0,
    totalOfAllSpent: 0,
    month: moment().subtract(0, "month").startOf("month").format('MMMM')

  };
  // When the component mounts, load all the bills into the calender
  componentDidMount() {
    this.getUpcomingBills();
    this.getSpendingItems();
    this.loadIncome();
  
  }

  // Loads all the upcomingBills into the calender
  getUpcomingBills = () => {
    API.getBills()
      .then(res => {
        const arr = [];
        let total = 0;

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email === this.state.email) {
              //added if statement to check for upcoming bills
            if (moment(res.data[i].dueDate).subtract(0, "month").startOf("month").format('MMMM')===(moment().subtract(0, "month").startOf("month").format('MMMM'))) {
              arr.push(res.data[i]);
              total += res.data[i].amount;
              this.setState({ billsTotal: total });
            }
          }
        }
        this.setState({ upcomingBills: arr });
        this.setState({
          totalOfAllSpent: this.state.totalOfAllSpent + this.state.billsTotal
        });
      })
      .catch(err => console.error(err));
  };

  // Delete a upcoming bill from database
  deleteBillItem = id => {
    API.deleteBill(id)
      .then(res => this.getUpcomingBills())
      .catch(err => console.log(err));
  };

  // Loads all the spending items into the pie chart
  getSpendingItems = () => {
    API.getAllSpending()
      .then(res => {        
        const color = ["red","blue","green","orange","grey","purple","yellow","pink","grey","magenta","brown"];
        const categoryObjects = [];
        let values = {
          Car: 0,
          Emergency: 0,
          Family: 0,
          Food: 0,
          Gifts: 0,
          Investment: 0,
          Misc: 0,
          Shopping: 0,
          Vacation: 0,
          Work: 0,
          Entertainment: 0,
        };
        let counter = 0;

        //this loop adds the dollar amount spend to the respective categories
        let total = 0;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email === this.state.email) {
            if (res.data[i].category in values) {
              if (moment(res.data[i].date).subtract(0, "month").startOf("month").format('MMMM')===(moment().subtract(0, "month").startOf("month").format('MMMM'))) {
                total += res.data[i].amount;
                values[res.data[i].category] += res.data[i].amount;

              }
            }
          }
        }
        this.setState({ spendingTotal: total });

        //for every key value pair in values array create an object for the data state
        for (var val in values) {
          let obj = {};
          obj["title"] = val.toString() + ": $" + values[val];
          obj["value"] = values[val];
          obj["color"] = color[counter];
          console.log(obj);
          categoryObjects.push(obj);
          counter++;
        }

        //assign categoryObjects to the data state
        this.setState({ data: categoryObjects });
      })
      .catch(err => console.error(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  //get the income from incomes db
  loadIncome = () => {
    API.getIncomes()
      .then(res =>
        {
          const filteredIncome=[];
          //Here I added the formula to assign each user with their spending
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].email === this.state.email) {
                filteredIncome.push(res.data[i]);
            }
          }

          const amounts = filteredIncome.map(income => ({
            amount: income.amount
          }));

          let amountsSorted=amounts.sort(function(a,b) { 
            return new Date(a.start).getTime() - new Date(b.start).getTime() 
        });

          console.log(amountsSorted);
          console.log("currentIncome");

          const incomeObject = amounts[Object.keys(amounts)[0]];
          const monthIncome = [];

          for (var amount in incomeObject) {
            monthIncome.push(incomeObject[amount]);
            break;
          }
          this.setState({ monthlyIncome: monthIncome });
        }
      )
      .catch(err => console.error(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.amount) {
      API.saveIncome({
        amount: this.state.amount,
        date: moment().format(),
        email: this.state.email
      }) // need to load income
        .then(res => this.loadIncome())
        .catch(err => console.log("Front end error" + err));
    } else {
      return alert("Please fill out all monthly income");
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  //checks which user is logged in
  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          email: user.email
        });
      }
    });
  }

  render() {
    return (
      <Wrapper>
        <Row>
          <Col size="4">
          <form>
              <label className="spending-label">Monthly Income:</label>
              <Input
                value={this.state.amount}
                onChange={this.handleInputChange}
                name="amount"
                placeholder="Enter amount"
              />
              <FormBtn
                disabled={!this.state.amount}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
            <br />
            <div className="incomeApp">
              <Card
                title={this.state.month+` Income`}
                body1={`$`+this.state.monthlyIncome}
              />
            </div>
            <Card
              title={this.state.month+` Budget`}
              body1={`Income    +$` + this.state.monthlyIncome}
              body2={`Spending  -$` + this.state.spendingTotal}
              body3={`Bills     -$` + this.state.billsTotal}
              body4={`Savings  $` + (this.state.monthlyIncome-(this.state.billsTotal+this.state.spendingTotal))}
            />
          </Col>
          <Col size="4">
            <PieChartCard
              title="Spending"
              cardCategory=""
              data={this.state.data}
            />
          </Col>
          <Col size="4">
            <Card title="Upcoming Bills" />
            <List>
              {this.state.upcomingBills.map(bill => (
                <ListItem
                  key={bill._id}
                  heading={bill.payee}
                  category={bill.category}
                  amount={bill.amount}
                  date={moment(bill.dueDate).format("MM-DD-YY")}
                >
                  <DeleteBtn onClick={() => this.deleteBillItem(bill._id)} />
                </ListItem>
              ))}
            </List>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Organizer;