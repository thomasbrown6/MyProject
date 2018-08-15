import React from "react";

export const ColMain = ({ size, children }) => (
  <div className={"hideSecond " + size.split(" ").map(size => "col-" + size).join(" ")}>
    {children}
  </div>
);
