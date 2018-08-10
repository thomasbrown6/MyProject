import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { TableHead, TableRow } from "../../components/Table";
import API from "../../utils/API";
import "./Spending.css";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import moment from "moment"
// import moment from "moment";

// const dateFormat = require('dateformat');

// const dateFormatter = date => {
//     dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
// }

// const fomatted_date = moment(res.data.date).format('DD-MM-YYYY');        



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
        this.setState({ spendings: res.data, item: "", category: "", amount: "", date: "" })
      })
      .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
      
    event.preventDefault();
    if (this.state.item && this.state.category && this.state.amount) {
        API.saveSpending({
            item: this.state.item,
            category: this.state.category,
            amount: this.state.amount,
            date: this.state.date
        })      // need to load spending
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
                        <label className="spending-label">
                            Recent Spending:
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
                            placeholder="Enter date ex. 01/12/2018"
                        />
                        <FormBtn
                            disabled={!(this.state.item && this.state.category && this.state.amount)}
                            onClick={this.handleFormSubmit}
                        >
                            Submit 
                        </FormBtn>
                    </form>
                </Col>
                <Col size="1">
                </Col>
                <Col size="7">
                <div className="table">
                    <h1 className="spendingList">Spending List</h1>
                        {this.state.spendings.length ? (
                            <List>
                                {this.state.spendings.map(spend => (
                                <ListItem key={spend._id}
                                    heading={spend.item}
                                    category={spend.category}
                                    amount={spend.amount}
                                    date={moment(spend.date).format("MM-DD-YY hh:mm")}
                                    >
                                    <DeleteBtn onClick={() => this.deleteSpendItem(spend._id)}/>
                                </ListItem>
            
                        ))}
                        </List>
                        ) : (
                            <h3>Add something to spending list</h3>
                        )}
 
                </div>
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Spending;
