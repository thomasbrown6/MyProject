import React from "react";
import "./Card.css";

export const Card = props => (
  <div className="card">
    <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.body1}</p>
        <p className="card-text">{props.body2}</p>
        <p className="card-text">{props.body3}</p>
        <p className="card-text">{props.body4}</p>
        <p className="card-text">{props.body5}</p>
    </div>
  </div>
);