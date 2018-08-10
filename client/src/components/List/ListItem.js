import React from "react";

export const ListItem = props => (
  <li className="list-group-item">
    <p className="listHeading">{props.heading}</p>
    <p className="listItem"><span className="listItemCategory">Amount: </span>{props.amount}</p>
    <p className="listItem"><span className="listItemCategory">Category: </span>{props.category}</p>        
    <p className="listItem"><span className="listItemCategory">Date: </span>{props.date}</p>
    {props.children}
  </li>
);
