import React, { Component } from "react";
// Componements =====================================
import { ColMain, ColMini, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import { app } from "../../config";
// NPMs =============================================
import Calendar from "react-big-calendar";
import moment from "moment";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
// Styles ===========================================
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Bills.css";
import "react-datepicker/dist/react-datepicker.css";

// Localizer for Calendar
Calendar.setLocalizer(Calendar.momentLocalizer(moment));

// Need to set app element for Modal to avoid potential errors
Modal.setAppElement("#root");

// Styles for modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Bills extends Component {
  state = {
    item: "",
    category: "",
    amount: "",
    date: null,
    modalIsOpen: false,
    modalItem: {
      id: 0,
      item: "",
      category: "",
      amount: 0,
      date: null,
      showInput: false
    },
    events: [
      {
        start: new Date(),
        end: new Date(),
        title: "",
        amount: 0
      }
    ],
    email: ""
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
          const filteredEvents = [];

          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].email === this.state.email) {
              filteredEvents.push(res.data[i]);
            }
          }

          const events = filteredEvents.map(event => ({
            title: event.payee,
            start: moment(event.dueDate).toDate(),
            end: moment(event.dueDate).toDate(),
            amount: event.amount,
            id: event._id,
            category: event.category
          }));
          this.setState({ events });
        }
      )
      .catch(err => console.error(err));
  };

  // Handle change for the date in the date picker
  handleChangeDate = date => {
    this.setState({
      date: date
    });
  };

  // Sets the state as the user types the input
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  // Handle change for the category in the category dropdown
  handleCategoryChange = category => {
    this.setState({ category: category.target.value });
  };

  //============Methods for modal ================//
  openModal = item => {
    this.setState({
      modalIsOpen: true,
      modalItem: {
        id: item.id,
        item: item.title,
        category: item.category,
        amount: item.amount,
        date: item.start
      }
    });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  // Deletes a bill from the database with a given id, then reloads the Bills page
  deleteBill = event => {
    event.preventDefault();
    API.deleteBill(this.state.modalItem.id)
      .then(res => {
        this.closeModal();
        this.loadBills();
      })
      .catch(err => console.log(err));
  };
  //==============================================//


  // Run this function for creating a new bill
  handleFormSubmit = event => {
    event.preventDefault();

    if (
      this.state.item &&
      this.state.category &&
      this.state.amount &&
      this.state.date &&
      this.state.email
    ) {
      API.saveBill({
        payee: this.state.item,
        category: this.state.category,
        amount: this.state.amount,
        dueDate: moment(this.state.date).toDate(),
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
          });
        })
        .catch(err => console.log(err));
    } else {
      return alert("Please fill out all inputs");
    }
  };

  //sets the user for the bill
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
          <ColMain size="4">
            <form>
              <label className="spending-label">Upcoming Bills:</label>
              <Input
                value={this.state.item}
                onChange={this.handleInputChange}
                name="item"
                placeholder="Bill name"
              />
              <div className="form-group">
                <select
                  className="custom-select"
                  id="inputGroupSelect02"
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
                >
                  <option value="" disabled>
                    Category
                  </option>
                  <option value="Car_Payment">Car Payment</option>
                  <option value="Childcare">Childcare</option>
                  <option value="Gas">Gas</option>
                  <option value="Health_and_Fitness">Health & Fitness</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Medical">Medical</option>
                  <option value="Misc">Misc</option>
                  <option value="Personal_Care">Personal Care</option>
                  <option value="Phone">Phone</option>
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
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
                  selected={this.state.date ? this.state.date : null}
                  onChange={this.handleChangeDate.bind(this)}
                  selectsStart
                  startDate={this.state.date}
                  endDate={this.state.date}
                  placeholderText="Date"
                  // showTimeSelect
                  // timeFormat="hh:mm:a"
                  // timeIntervals={15}
                  // dateFormat="LLL"
                  // timeCaption="time"
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
          </ColMain>
          <ColMain size="8">
            <div className="Billapp">
              <Calendar
                selectable
                popup
                onSelectEvent={event => this.openModal(event)}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                showMultiDayTimes
                step={60}
                style={{ height: "75vh", width: "100%", float: "right" }}
              />
              <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <div>
                  <h2 className="modal-heading">{this.state.modalItem.item}</h2>
                  <p className="modal-details">Amount: {this.state.modalItem.amount}</p>
                  <p className="modal-details">Category: {this.state.modalItem.category}</p>
                  <p className="modal-details">Date: {moment(this.state.modalItem.date).format("MM-DD-YY")}</p>
                  <form>
                  {/* {this.state.modalItem.showInput ? (
                    <input className="form-control" placeholder="item" /> 
                    <input className="form-control" placeholder="item" /> 
                    <input className="form-control" placeholder="item" /> 
                    <input className="form-control" placeholder="item" />                     
                  ) : null}
                    <button onClick={this.showInput}>Edit</button> */}
                    <button className="modal-close" onClick={this.closeModal}>close</button>
                    <button className="delete-btn" onClick={this.deleteBill}>
                    delete
                    </button>
                  </form>
                  </div>
                </Modal>
            </div>
          </ColMain>


          <ColMini size="12">
            <form>
              <label className="spending-label">Upcoming Bills:</label>
              <Input
                value={this.state.item}
                onChange={this.handleInputChange}
                name="item"
                placeholder="Bill name"
              />
              <div className="form-group">
                <select
                  className="custom-select"
                  id="inputGroupSelect02"
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
                >
                  <option value="" disabled>
                    Category
                  </option>
                  <option value="Car_Payment">Car Payment</option>
                  <option value="Childcare">Childcare</option>
                  <option value="Gas">Gas</option>
                  <option value="Health_and_Fitness">Health & Fitness</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Medical">Medical</option>
                  <option value="Misc">Misc</option>
                  <option value="Personal_Care">Personal Care</option>
                  <option value="Phone">Phone</option>
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
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
                  selected={this.state.date ? this.state.date : null}
                  onChange={this.handleChangeDate.bind(this)}
                  selectsStart
                  startDate={this.state.date}
                  endDate={this.state.date}
                  placeholderText="Date"
                  // showTimeSelect
                  // timeFormat="hh:mm:a"
                  // timeIntervals={15}
                  // dateFormat="LLL"
                  // timeCaption="time"
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
          </ColMini>
          <ColMini size="12">
            <div className="Billapp">
              <Calendar
                selectable
                popup
                onSelectEvent={event => this.openModal(event)}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                showMultiDayTimes
                step={60}
                style={{ height: "75vh", width: "100%", float: "right" }}
              />
              <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <div>
                  <h2 className="modal-heading">{this.state.modalItem.item}</h2>
                  <p className="modal-details">Amount: {this.state.modalItem.amount}</p>
                  <p className="modal-details">Category: {this.state.modalItem.category}</p>
                  <p className="modal-details">Date: {moment(this.state.modalItem.date).format("MM-DD-YY")}</p>
                  <form>
                  {/* {this.state.modalItem.showInput ? (
                    <input className="form-control" placeholder="item" /> 
                    <input className="form-control" placeholder="item" /> 
                    <input className="form-control" placeholder="item" /> 
                    <input className="form-control" placeholder="item" />                     
                  ) : null}
                    <button onClick={this.showInput}>Edit</button> */}
                    <button className="modal-close" onClick={this.closeModal}>close</button>
                    <button className="delete-btn" onClick={this.deleteBill}>
                    delete
                    </button>
                  </form>
                  </div>
                </Modal>
            </div>
          </ColMini>
        </Row>
      </Wrapper>
    );
  }
}

export default Bills;
