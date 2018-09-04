import React from "react";

export const Col = ({ size, children }) => (
  <div className={size.split(" ").map(size => "col-lg-" + size).join(" ")}>
    {children}
  </div>
);
