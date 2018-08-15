import React, { Component } from "react";
// Components ===================================
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import { app } from "../../config";
// NPMs =========================================
import moment from "moment";
import Calendar from "react-big-calendar";
import DatePicker from "react-datepicker";
import Modal from 'react-modal';
// Styles =======================================
import "./Spending.css";
import "../Bills/Bills.css";
import "react-datepicker/dist/react-datepicker.css";

// Localizer for Calendar
Calendar.setLocalizer(Calendar.momentLocalizer(moment));

// Need to set app element for Modal to avoid potential errors
Modal.setAppElement("#root");

// Styles for modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



class Spending extends Component {
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
          start: moment(event.date).toDate(),
          end: moment(event.date).toDate(),
          amount: event.amount,
          id: event._id,
          category: event.category
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
  handleChangeDate = date => {
    this.setState({
      date: date
    });
  };

  // Handle change for the category in the category dropdown
  handleCategoryChange = category => {
    this.setState({ category: category.target.value });
  };

  //============Methods for modal ================//
  openModal = (item) => {
    this.setState({
      modalIsOpen: true,
      modalItem:{
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
    this.setState({modalIsOpen: false});
  };

    // Delete a spending item from the database
    deleteSpendItem = event => {
      event.preventDefault();
      API.deleteSpending(this.state.modalItem.id)
        .then(res => {
          this.closeModal();
          this.loadSpendings();
        })
        .catch(err => console.log(err));
    };

  // Method to show input so user can update item
  // showInput = event => {
  //   event.preventDefault();
  //   this.setState({
  //     modalItem: {
  //     showInput: true
  //   }
  // });
  // }
  //==============================================//

  // Handles the submission of the form
  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.item &&
      this.state.category &&
      this.state.amount &&
      this.state.date &&
      this.state.email
    ) {

      API.saveSpending({
        item: this.state.item,
        category: this.state.category,
        amount: this.state.amount,
        date: moment(this.state.date).toDate(),
        //added email to associate to current logged in user
        email: this.state.email
      })
        .then(res => {
          this.loadSpendings();
          this.setState({
            item: "",
            category: "",
            amount: "",
            date: ""
          });
        })
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
                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  value={this.state.category}
                  onChange={this.handleCategoryChange}
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
          </Col>
          <Col size="8">
            <div className="Billapp">
              <Calendar
                selectable
                popup
                //event => this.handleSelectEvent(event)
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
                    <button className="delete-btn" onClick={this.deleteSpendItem}>
                    delete
                    </button>
                  </form>
                  </div>
                </Modal>
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
