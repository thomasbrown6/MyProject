import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">
      <p className="navbar-name">GET IT</p>
      <p className="navbar-subname">TOGETHER</p>
    </a>

    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item">
      <Link
          to="/"
          className={
            window.location.pathname === "/"
              ? "nav-link active homeTab"
              : "nav-link homeTab"
          }
        >
          HOME
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/organizer"
          className={
            window.location.pathname === "/organizer"
              ? "nav-link active organizerTab"
              : "nav-link organizerTab"
          }
        >
          ORGANIZER
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/spending"
          className={
            window.location.pathname === "/spending"
              ? "nav-link active spendingTab"
              : "nav-link spendingTab"
          }
        >
          SPENDING
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/bills"
          className={
            window.location.pathname === "/bills"
              ? "nav-link active billTab"
              : "nav-link billTab"
          }
        >
          BILLS
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/mortgage"
          className={
            window.location.pathname === "/mortgage"
              ? "nav-link active mortgageTab"
              : "nav-link mortgageTab"
          }
        >
          MORTGAGE
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/account"
          className={
            window.location.pathname === "/account"
              ? "nav-link active accountTab"
              : "nav-link accountTab"
          }
        >
          ACCOUNT
        </Link>
      </li>
      <li className="nav-item">
      <Link
          to="/signout"
          className={
            window.location.pathname === "/signout"
              ? "nav-link active signoutTab"
              : "nav-link signoutTab"
          }
        >
          SIGN OUT
        </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
