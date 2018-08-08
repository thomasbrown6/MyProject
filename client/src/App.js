import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { Container } from "./components/Grid";
import "./App.css";
// *********
import Billapp from "./pages/Bills";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// ****************
const App = () => (
  <Router>
    <div> 
      <Container>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          { <Route exact path="/expenses/" component={Billapp} /> }
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </Container>
    </div>
  </Router>
  
);

export default App;
