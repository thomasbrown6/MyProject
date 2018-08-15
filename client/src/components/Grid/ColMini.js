import React from "react";

export const ColMini = ({ size, children }) => (
  <div className={"hideFirst " + size.split(" ").map(size => "col-" + size).join(" ")}>
    {children}
  </div>
);
