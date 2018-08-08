import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { TableHead, TableRow } from "../../components/Table";
import "./Spending.css";


class Spending extends Component {
  state = {
    item: "",
    category: "",
    amount: "",
    date: ""
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
                            Log your recent spending:
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
                            placeholder="Select date"
                        />
                        <FormBtn
                            disabled={!(this.state.item && this.state.category && this.state.amount && this.state.date)}
                            onClick={this.handleFormSubmit}
                        >
                            Submit 
                        </FormBtn>
                    </form>
                </Col>
                <Col size="1">
                </Col>
                <Col size="5">
                <table className="table">
                    <TableHead
                        col1="Item"
                        col2="Category"
                        col3="Amount"
                        col4="Date"
                    >
                    </TableHead>
                    <tbody>
                        <TableRow
                            item={this.state.item}
                            category={this.state.category}
                            amount={this.state.amount}
                            date={this.state.date}
                        >
                        </TableRow>
                    </tbody>
                </table>
                </Col>
                <Col size="1">
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Spending;
