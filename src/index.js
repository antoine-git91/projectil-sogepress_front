import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/front/Home";
import Clients from "./pages/front/Clients";
import CreateClient from "./pages/backoffice/Clients/CreateClient";
import CreateCommande from "./pages/backoffice/commandes/CreateCommande";

ReactDOM.render(
  <React.StrictMode>
      <Router>
         <Header />
         <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
             <Route path="/clients">
                 <Clients />
             </Route>
             <Route path="/creation_client">
                 <CreateClient />
             </Route>
             <Route path="/creation_commande">
                 <CreateCommande />
             </Route>
         </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
