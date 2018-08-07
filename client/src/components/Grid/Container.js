import React from "react";
import "./Container.css";

export const Container = props => (
  <div className={"container main"}>
    {props.children}
  </div>
);
