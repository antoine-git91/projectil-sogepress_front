import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./pages/Home";

ReactDOM.render(
  <React.StrictMode>
      <Router>
         <Header />
          <Route exact path="/">
              <Home />
          </Route>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
