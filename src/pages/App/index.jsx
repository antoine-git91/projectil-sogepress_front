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
import UpdateClient from "../Clients/UpdateClient";
import Magazines from "../Magazines";
import Magazine from "../Magazines/Magazine";
import CreateMagazine from "../Magazines/CreateMagazine";
import Users from "../Users";
import User from "../Users/User";
import UpdateUser from "../Users/UpdateUser";


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
                <Route path="/profile/:idClient">
                    <Profile />
                </Route>
                <Route path="/creation_client">
                    <CreateClient />
                </Route>
                <Route path="/update_client/:id">
                    <UpdateClient />
                </Route>
                <Route path="/commandes">
                    <Commandes />
                </Route>
                <Route path="/commande/:id">
                    <Commande />
                </Route>
                <Route path="/creation_commande">
                    <CreateCommande />
                </Route>
                <Route path="/magazines">
                    <Magazines />
                </Route>
                <Route path="/magazine/:idMagazine">
                    <Magazine />
                </Route>
                <Route path="/creation_magazine">
                    <CreateMagazine />
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
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/user/:id_user">
                    <User />
                </Route>
                <Route path="/update_user/:id_user">
                    <UpdateUser />
                </Route>
            </Switch>
        </Router>
    )
}
export default App;