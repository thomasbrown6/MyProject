import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Calendar from "react-big-calendar";
import moment from "moment";
import API from "../../utils/API";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Bills.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class Bills extends Component {
  state = {
    item: "",
    category: "",
    amount: "",
    date: "",
    events: [
      {
        start: new Date(),
        end: new Date(),
        title: "Bill Due"
      }
    ]
  };

  // When the component mounts, load all the bills into the calender
  componentDidMount() {
    this.loadBills();
  }

  // Loads all the bills into the calender
  loadBills = () => {
    API.getBills()
      .then(res => {
        const events = res.data.map(event => ({
          title: event.payee,
          start: event.dueDate,
          end: event.dueDate
        }));
        this.setState({ events });
      })
      .catch(err => console.error(err));
  }

  // Deletes a bill from the database with a given id, then reloads the Bills page
  deleteBill = id => {
    API.deleteBill(id)
      .then(res => this.loadBills())
      .catch(err => console.log(err));
  }


  // Sets the state as the user types the input
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  // Run this function for creating a new bill
  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.item && this.state.category && this.state.amount) {
      API.saveBill({
        payee: this.state.item,
        category: this.state.category,
        amount: this.state.amount,
        dueDate: this.state.date
      })
        .then(res => this.loadBills())
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
            <form>
              <label className="spending-label">Log your upcoming bills:</label>
              <Input
                value={this.state.item}
                onChange={this.handleInputChange}
                name="item"
                placeholder="Bill name"
              />
              <Input
                value={this.state.category}
                onChange={this.handleInputChange}
                name="category"
                placeholder="Category"
              />
              <Input
                value={this.state.amount}
                onChange={this.handleInputChange}
                name="amount"
                placeholder="Enter amount"
              />
              <Input
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Enter due date ex. 01/12/2018"
              />
              <FormBtn
                disabled={
                  !(
                    this.state.item &&
                    this.state.category &&
                    this.state.amount &&
                    this.state.date
                  )
                }
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="8">
            <div className="Billapp">
              {/* <header className="Billapp-header">
                        {/* <img src={logo} className="Billapp-logo" alt="logo" /> */}
              {/* <h1 className="Billapp-title">Welcome to Bills</h1>
                        </header> */}
              {/* <p className="Billapp-intro"> */}
              {/* To get started, edit <code>src/Billapp.js</code> and save to reload. */}
              {/* </p> */}
              <Calendar
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                style={{ height: "75vh", width: "40vw", float: "right" }}
              />
            </div>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Bills;
