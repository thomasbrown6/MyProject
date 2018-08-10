import React from "react";
import "./Card.css";

export const ProfileCard = props => (
  <div className="card">
    <div className="card-body profileCard">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text boldSubTitle">{props.body1}</p>
        <p className="card-text">{props.body2}</p>
        {props.children}
    </div>
  </div>
);