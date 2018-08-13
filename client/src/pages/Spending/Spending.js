import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./Spending.css";
import "../Bills/Bills.css";
// import { List, ListItem } from "../../components/List";
// import DeleteBtn from "../../components/DeleteBtn";
// import moment from "moment";
import Calendar from "react-big-calendar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { app } from "../../config";


let allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k])

class Spending extends Component {
  state = {
    item: "",
    category: "",
    amount: "",
    date: "",
    spendings: [],
    events: [
      {
        start: new Date(),
        end: new Date(),
        title: "",
        amount: 0
      }
    ],
    email:""
  };

  // When the component mounts, load all the spendings into the table
  componentDidMount() {
    this.loadSpendings();
  }

  // Loads all the spending from the database
  loadSpendings = () => {
    API.getAllSpending()
      .then(res => 
      //Here I added the formula to assign each user with their spending
      {
        const filteredSpending=[];
  
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].email===this.state.email){
            filteredSpending.push(res.data[i]);
          }
        }

        const events = filteredSpending.map(event => ({
          title: event.item,
          start: event.date,
          end: event.date,
          amount: event.amount
        }));
        this.setState({ events });      
      })
      .catch(err => console.error(err));
  };

  // Handle input change method
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  // Handle change for the date in the date picker
  handleChange = date => {
    this.setState({
      date: date,
      
    })
  };

    
    // Handle change for the category in the category dropdown
    handleCateChange = category => {
      console.log(category.target.value)
      this.setState({
        category: category.target.value,
        
      })
    };

  // Delete a spending item from the database
  deleteSpendItem = id => {
    API.deleteSpending(id)
      .then(res => this.loadSpendings())
      .catch(err => console.log(err));
  };

  handleSelectEvent(event) {
    console.log(event);
    alert(event.title + "\n Amount: " + 
    event.amount);
}


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.item && this.state.category && this.state.amount && this.state.date && this.state.email) {
      API.saveSpending({
        item: this.state.item,
        category: this.state.category,
        amount: this.state.amount,
        date: this.state.date,
        email: this.state.email
      }) // need to load spending
        .then(res => this.loadSpendings())
        .catch(err => console.log("Front end error" + err));
    } else {
      return alert("Please fill out all inputs");
    }
  };

  //get the email the user used to log in
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
              <label className="spending-label">Recent Spending:</label>
              <Input
                value={this.state.item}
                onChange={this.handleInputChange}
                name="item"
                placeholder="Item name"
              />
              <div className="form-group">
                <select className="custom-select" id="inputGroupSelect01"
                    value={this.state.category}
                    onChange={this.handleCateChange} 
                    >
                    <option value="" disabled >Category</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Car">Car</option>
                    <option value="Family">Family</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Gifts">Gifts</option>
                    <option value="Investment">Investment</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Emergency">Emergency</option>
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
                  !(this.state.item && this.state.category && this.state.amount && this.state.date)
                }
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="8" >
            <div className="Billapp">
              <Calendar
                selectable
                popup
                onSelectEvent={(event) =>this.handleSelectEvent(event)}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                views={allViews}
                style={{ height: "75vh", width: "100%", float: "right" }}
              />
            </div>
            </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Spending;



// <div className="table">
//               <h1 className="spendingList">Spending List</h1>
//               {this.state.spendings.length ? (
//                 <List>
//                   {this.state.spendings.map(spend => (
//                     <ListItem
//                       key={spend._id}
//                       heading={spend.item}
//                       category={spend.category}
//                       amount={spend.amount}
//                       date={moment(spend.date).format("MM-DD-YY")}
//                     >
//                       <DeleteBtn
//                         onClick={() => this.deleteSpendItem(spend._id)}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               ) : (
//                 <h3>  </h3>
//               )}
//             </div>