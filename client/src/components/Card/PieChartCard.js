import React from "react";
import PieChart from "react-svg-piechart";


export const PieChartCard = props => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <p className="card-text cardItems">{props.cardCategory}</p>
      <p className="card-text">
        <PieChart
          data={props.data}
          // If you need expand on hover (or touch) effect
          expandOnHover
          // If you need custom behavior when sector is hovered (or touched)
          onSectorHover={(d, i, e) => {
            if (d) {
              console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e);
            } else {
              console.log("Mouse leave - Index:", i, "Event:", e);
            }
          }}
        />
      </p>
    </div>
  </div>
);
