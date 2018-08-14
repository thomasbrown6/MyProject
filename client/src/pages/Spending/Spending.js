import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./Spending.css";
import "../Bills/Bills.css";
import moment from "moment";
import Calendar from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));



class Spending extends Component {
  state = {
    item: "",
    category: "",
    amount: "",
    startDate: null,
    endDate: null,
    spendings: [],
    events: [
      {
        start: new Date(),
        end: new Date(),
        title: "",
        amount: 0
      }
    ]
  };

  // When the component mounts, load all the spendings into the table
  componentDidMount() {
    this.loadSpendings();
  }

  // Loads all the spending from the database
  loadSpendings = () => {
    API.getAllSpending()
      .then(res => {
        const events = res.data.map(event => ({
          title: event.item,
          start: moment(event.startDate).toDate(),
          end: moment(event.endDate).toDate(),
          amount: event.amount
        }));
        this.setState({ events });

      })
      .catch(err => console.log(err));
  };

  // Handle input change method
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  // Handle change for the date in the date picker
  handleChangeStart = startDate => {
    this.setState({
      startDate: startDate
    });
  };

    // Handle change for the date in the date picker
    handleChangeEnd = endDate => {
      this.setState({
        endDate: endDate
      });
    };

  // Handle change for the category in the category dropdown
  handleCateChange = category => {
    console.log(category.target.value);
    this.setState({
      category: category.target.value
    });
  };

  // Delete a spending item from the database
  deleteSpendItem = id => {
    API.deleteSpending(id)
      .then(res => this.loadSpendings())
      .catch(err => console.log(err));
  };

  // Shows alert of spending item details
  handleSelectEvent(event) {
    alert(event.title + "\n Amount: " + event.amount);
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.item &&
      this.state.category &&
      this.state.amount &&
      this.state.startDate &&
      this.state.endDate
    ) {
      API.saveSpending({
        item: this.state.item,
        category: this.state.category,
        amount: this.state.amount,
        startDate: moment(this.state.startDate).toDate(),
        endDate: moment(this.state.endDate).toDate()
      }) // load spending
        .then(res => this.loadSpendings())
        .catch(err => console.log("Front end error" + err));
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
              <label className="spending-label">Recent Spending:</label>
              <Input
                value={this.state.item}
                onChange={this.handleInputChange}
                name="item"
                placeholder="Item name"
              />
              <div className="form-group">
                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  value={this.state.category}
                  onChange={this.handleCateChange}
                >
                  <option value="" disabled>
                    Category
                  </option>
                  <option value="Car">Car</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Family">Family</option>
                  <option value="Food">Food</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Investment">Investment</option>
                  <option value="Misc">Misc</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Work">Work</option>
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
                  className="datePickerStartDate"
                  selected={this.state.startDate ? this.state.startDate : null}
                  onChange={this.handleChangeStart.bind(this)}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  placeholderText="Date"
                  showTimeSelect
                  timeFormat="hh:mm:a"
                  timeIntervals={15}
                  dateFormat="LLL"
                  timeCaption="time"
                />
                <DatePicker
                  className="datePickerEndDate"
                  selected={this.state.endDate ? this.state.endDate : null}
                  onChange={this.handleChangeEnd.bind(this)}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  placeholderText="Date"
                  showTimeSelect
                  timeFormat="hh:mm:a"
                  timeIntervals={15}
                  dateFormat="LLL"
                  timeCaption="time"
                />
              </div>

              <FormBtn
                disabled={
                  !(
                    this.state.item &&
                    this.state.category &&
                    this.state.amount &&
                    this.state.startDate &&
                    this.state.endDate
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
                selectable
                popup
                onSelectEvent={event => this.handleSelectEvent(event)}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                showMultiDayTimes
                step={60}
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
