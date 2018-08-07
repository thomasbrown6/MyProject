import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { Container } from "./components/Grid";
import "./App.css";

const App = () => (
  <Router>
    <div> 
      <Container>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/books/:id" component={Detail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </Container>
    </div>
  </Router>
  
);

export default App;
