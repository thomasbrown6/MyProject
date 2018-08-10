import React from "react";
import "./Button.css";

export const EditButton = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn editButton">
    {props.children}
  </button>
);
