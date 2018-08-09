import React, { Component } from "react";
import { Card, PieChartCard } from "../../components/Card";
import { Col, Row, Wrapper } from "../../components/Grid";
import API from "../../utils/API";
import "./Organizer.css";

 

class Organizer extends Component {
  state = {
    data: [
        {title: "Data 1", value: 100, color: "red"},
        {title: "Data 2", value: 60, color: "blue"},
        {title: "Data 3", value: 30, color: "green"},
        {title: "Data 4", value: 20, color: "orange"},
        {title: "Data 5", value: 10, color: "grey"},
    ]
    // upcomingBills: [
    //     {
    //         title: "",
    //         category: "",
    //         amount: "",
    //         date: ""
    //     }
    // ]
  };
    // When the component mounts, load all the bills into the calender
    componentDidMount() {
        this.getUpcomingBills();
    }
   
    // Loads all the upcomingBills into the calender
    getUpcomingBills = () => {
        API.getBills()
        .then(res => {
            console.log(res);
            // const upcomingBills = res.data.map(event => ({
            // title: event.payee,
            // category: event.category,
            // amount: event.amount,
            // date: event.dueDate
            // }));
            this.setState({  });
        })
        .catch(err => console.error(err));
    }

  handleFormSubmit = event => {
    event.preventDefault();

  };

  render() {
    return (
        <Wrapper>
            <Row>
                <Col size="4">
                    <Card
                        title="Income"
                        body1="$2480.00"     
                    />
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
                    <Card
                        title="Upcoming Bills"
                        body1={this.state.upcomingBills}
                    />
                </Col>
   
            </Row>
        </Wrapper>
    );
  }
}

export default Organizer;
