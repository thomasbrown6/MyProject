import React from "react";
import "./Wrapper.css";

export const Wrapper = props => (
  <div className={"container sub"}>
    {props.children}
  </div>
);
