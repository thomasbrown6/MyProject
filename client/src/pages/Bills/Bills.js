import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Calendar from "react-big-calendar";
import moment from "moment";
import API from "../../utils/API";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Bills.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { app } from "../../config";

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
        title: ""
      }
    ],
    //added email LH
    email:""
  };

  // When the component mounts, load all the bills into the calender
  componentDidMount() {
    this.loadBills();
  }

  // Loads all the bills into the calender
  loadBills = () => {
    API.getBills()
      .then(res => 
      //Here I added the formula to assign each user with their bills
      {
        const filteredEvents=[];
  
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].email===this.state.email){
            filteredEvents.push(res.data[i]);
          }
        }

        const events = filteredEvents.map(event => ({
          title: event.payee,
          start: event.dueDate,
          end: event.dueDate
        }));
        this.setState({ events });      
      })
      .catch(err => console.error(err));
  };

  // Deletes a bill from the database with a given id, then reloads the Bills page
  deleteBill = id => {
    API.deleteBill(id)
      .then(res => this.loadBills())
      .catch(err => console.log(err));
  };

  handleChange = date => {
    this.setState({
      date: date,
      
    })
  };

  // Sets the state as the user types the input
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleDropdownChange = event => {
    this.setState({ category: event.target.value });
  };


  // Run this function for creating a new bill
  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.item && this.state.category && this.state.amount && this.state.date && this.state.email) {
      API.saveBill({
        payee: this.state.item,
        category: this.state.category,
        amount: this.state.amount,
        dueDate: this.state.date,

        //added email to associate to current logged in user
        email: this.state.email
      })
        .then(res => {
           this.loadBills();
           this.setState({
             item: "",
             category: "",
             amount: "",
             date: ""
           })
        })
        .catch(err => console.log(err));

    } else {
      return alert("Please fill out all inputs");
    }
  };

  //sets the user for the bill
  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true, 
          email: user.email
        });
      }
    })
  }

  render() {
    return (
      <Wrapper>
        <Row>
          <Col size="4">
            <form>
              <label className="spending-label">Upcoming Bills:</label>
              <Input
                value={this.state.item}
                onChange={this.handleInputChange}
                name="item"
                placeholder="Bill name"
              />
              <div className="form-group">
                <select className="custom-select" id="inputGroupSelect02"
                    value={this.state.category}
                    onChange={this.handleDropdownChange} 
                    >
                    <option value="" disabled>Category</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Gas">Gas</option>
                    <option value="Car Payment">Car Payment</option>
                    <option value="Phone">Phone</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Rent">Rent</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Daycare">Daycare</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Misc">Misc</option>
                </select>
              </div>
              <Input
                value={this.state.amount}
                onChange={this.handleInputChange}
                name="amount"
                placeholder="Enter amount"
              />
              <div className="form-group">
                <DatePicker
                  selected={this.state.date ? this.state.date : null}
                  onChange={this.handleChange.bind(this)}
                  placeholderText="Date"
                />                
                </div>
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
              <Calendar
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}

                style={{ height: "75vh", width: "100%", float: "right" }}
              />
            </div>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Bills;
