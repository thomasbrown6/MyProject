import React from "react";
import "./Wrapper.css";

export const Wrapper = ({ fluid, children }) => (
  <div className={`container${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
