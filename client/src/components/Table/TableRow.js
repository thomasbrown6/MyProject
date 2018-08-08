import React from "react";

export const TableRow = props => (
  <tr>
      <td>{props.item}</td>
      <td>{props.category}</td>
      <td>{props.amount}</td>
      <td>{props.date}</td>
  </tr>
);
