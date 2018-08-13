import React, { Component } from "react";
import { Card, PieChartCard } from "../../components/Card";
import { Col, Row, Wrapper } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import moment from "moment";
import API from "../../utils/API";
import "./Organizer.css";

class Organizer extends Component {
  state = {
    data: [
      { title: "Data 1", value: 100, color: "red" },
      { title: "Data 2", value: 60, color: "blue" },
      { title: "Data 3", value: 30, color: "green" },
      { title: "Data 4", value: 20, color: "orange" },
      { title: "Data 5", value: 10, color: "grey" }
    ],
    upcomingBills: []
  };
  // When the component mounts, load all the bills into the calender
  componentDidMount() {
    this.getUpcomingBills();
    this.getSpendingItems();
  }

  // Loads all the upcomingBills into the calender
  getUpcomingBills = () => {
    API.getBills()
      .then(res => {
        //console.log(res);
        this.setState({ upcomingBills: res.data });
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
          console.log(res.data);
          //this.setState({ data: res.data });
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].category === "Food") {
              
              
          
            }
          // const spendingItems = res.data.map(spendItem => ({
          //   title: spendItem.category,
          //   value: spendItem.amount,
          // }))
          }
          
          // this.setState({ data: spendingItems });
        })
        .catch(err => console.error(err));
    };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Wrapper>
        <Row>
          <Col size="4">
            <Card title="Income" body1="$2480.00" />
            <Card
              title="Amount Saved (current month)"
              body1={this.state.savings}
              body2="$580.00"
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
