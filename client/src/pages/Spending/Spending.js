import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./Spending.css";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Spending extends Component {
  state = {
    item: "",
    category: "",
    amount: "",
    date: "",
    spendings: []
  };

  // When the component mounts, load all the spendings into the table
  componentDidMount() {
    this.loadSpendings();
  }

  // Loads all the spending from the database
  loadSpendings = () => {
    API.getAllSpending()
      .then(res => {
        this.setState({
          spendings: res.data,
          item: "",
          category: "",
          amount: "",
          date: ""
        });
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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.item && this.state.category && this.state.amount && this.state.date) {
      API.saveSpending({
        item: this.state.item,
        category: this.state.category,
        amount: this.state.amount,
        date: this.state.date
      }) // need to load spending
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
                <select className="custom-select" id="inputGroupSelect01"
                    value={this.state.category}
                    onChange={this.handleCateChange} 
                    >
                    <option name="category" value="" disabled >Category</option>
                    <option name="category" value="Food">Food</option>
                    <option name="category" value="Entertainment">Entertainment</option>
                    <option name="category" value="Car">Car</option>
                    <option name="category" value="Family">Family</option>
                    <option name="category" value="Shopping">Shopping</option>
                    <option name="category" value="Gifts">Gifts</option>
                    <option name="category" value="Investment">Investment</option>
                    <option name="category" value="Vacation">Vacation</option>
                    <option name="category" value="Emergency">Emergency</option>
                    <option name="category" value="Misc">Misc</option>
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
          <Col size="1" />
          <Col size="7">
            <div className="table">
              <h1 className="spendingList">Spending List</h1>
              {this.state.spendings.length ? (
                <List>
                  {this.state.spendings.map(spend => (
                    <ListItem
                      key={spend._id}
                      heading={spend.item}
                      category={spend.category}
                      amount={spend.amount}
                      date={moment(spend.date).format("MM-DD-YY")}
                    >
                      <DeleteBtn
                        onClick={() => this.deleteSpendItem(spend._id)}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>  </h3>
              )}
            </div>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Spending;
