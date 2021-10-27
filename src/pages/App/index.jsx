import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../Home";
import Clients from "../Clients";
import Profile from "../Clients/Profile";
import CreateClient from "../Clients/CreateClient";
import CreateCommande from "../Commandes/CreateCommande";
import Commandes from "../Commandes";
import './app.css'
import Commande from "../Commandes/Commande";
import Login from "../Login";
import Header from "../../components/Header";
import Account from "../Account";
import UpdateAccount from "../Account/UpdateAccount";
import UpdatePassword from "../Account/UpdatePassword";


const App = () => {

    //const [currentUser, setCurrentUser] = useState(localStorage.getItem('userLoggedIn'));
    const [token, setToken] = useState(localStorage.getItem('token'))


    if(!token){
        return <Login setToken={setToken} />
    }

    return(
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/clients">
                    <Clients />
                </Route>
                <Route path="/commandes">
                    <Commandes />
                </Route>
                <Route path="/commande/:id">
                    <Commande />
                </Route>
                <Route path="/profile/:id">
                    <Profile />
                </Route>
                <Route path="/creation_client">
                    <CreateClient />
                </Route>
                <Route path="/creation_commande">
                    <CreateCommande />
                </Route>
                <Route path="/my_account">
                    <Account />
                </Route>
                <Route path="/account_update">
                    <UpdateAccount />
                </Route>
                <Route path="/password_update">
                    <UpdatePassword />
                </Route>
            </Switch>
        </Router>
    )
}
export default App;