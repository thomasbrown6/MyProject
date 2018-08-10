import React, { Component } from "react";
import { Col, Row, Wrapper } from "../../components/Grid";
// import { Input, FormBtn } from "../../components/Form";
// import { TableHead, TableRow } from "../../components/Table";
// import API from "../../utils/API";
import "./Signup.css";





class Spending extends Component {
  state = {
   
  };

  // When the component mounts,
  componentDidMount() {

  }



  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
      
    event.preventDefault();

  };
  

  render() {
    return (
        <Wrapper>
            <Row>
                <Col size="12">
                    
                </Col>
            </Row>
        </Wrapper>
    );
  }
}

export default Spending;
