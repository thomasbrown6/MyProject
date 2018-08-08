import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import "./Bills.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import logo from "./logo.svg";
// import { width } from "window-size";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class Billapp extends Component {
  state = {
    events: [
      {
        start: new Date(),
        // end: new Date(moment().add(1, "days")),
        end: new Date(),
        title: "Bill Due"
      }
    ]
    
  };


  render() {
    return (
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
    );
  }
}

export default Billapp;
