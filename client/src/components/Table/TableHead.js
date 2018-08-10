import React from "react";
import "./Table.css";

export const TableHead = props => (
    <thead>
        <tr>
            <th scope="col">{props.col1}</th>
            <th scope="col">{props.col2}</th>
            <th scope="col">{props.col3}</th>
            <th scope="col">{props.col4}</th>
        </tr>
    </thead>
)