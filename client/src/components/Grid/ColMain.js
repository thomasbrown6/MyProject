import React from "react";

export const ColMain = ({ size, children }) => (
  <div className={"hideSecond " + size.split(" ").map(size => "col-lg-" + size).join(" ")}>
    {children}
  </div>
);
