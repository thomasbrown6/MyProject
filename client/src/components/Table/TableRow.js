import React from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import "./Table.css";

const deleteSpendItem = id => {
  API.deleteSpending(id)
      .then(res => this.loadSpendings())
      .catch(err => console.log(err));
}

export const TableRow = props => (
  <tr>
      <td>{props.item}</td>
      <td>{props.category}</td>
      <td>${props.amount}</td>
      <td>{props.date}</td>
      <DeleteBtn onClick={() => deleteSpendItem(props.id)} />      
  </tr>
);
