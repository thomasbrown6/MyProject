import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Calendar from "react-big-calendar";
import moment from "moment";
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
          // end: new Date(moment().add(1, "days")),
          end: new Date(),
          title: "Bill Due"
        }
      ]
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (!this.state.item || this.state.category || this.state.amount || this.state.date) {
        return alert("Please fill out all inputs");
    } 

    this.setState({

    });
  };


  render() {
    return (
        <Wrapper>
            <Row>
                <Col size="5">
                    <form>
                        <label className="spending-label">
                            Log your recent bills:
                        </label>
                        <Input
                            value={this.state.item}
                            onChange={this.handleInputChange}
                            name="item"
                            placeholder="Item name"
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
                            placeholder="Enter date"
                        />
                        <FormBtn
                            disabled={!(this.state.item && this.state.category && this.state.amount && this.state.date)}
                            onClick={this.handleFormSubmit}
                        >
                            Submit 
                        </FormBtn>
                    </form>
                </Col>
                <Col size="7">
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
                        style={{ height: "75vh", width: "40vw", float: "right"}}
                        />
                    </div>
                </Col>
         
            </Row>
        </Wrapper>

     );
   }
 }

export default Bills;
