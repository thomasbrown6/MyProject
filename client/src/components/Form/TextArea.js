import React from "react";
import "./Form.css";

export const TextArea = props => (
  <div className="form-group">
    <textarea className="form-control" rows="20" {...props} />
  </div>
);
