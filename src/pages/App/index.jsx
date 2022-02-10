import React, {createContext, useContext, useEffect, useState} from "react";
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
import Actions from "../Actions";
import CreateUser from "../Users/CreateUser";
import Action from "../Actions/Action";
import CreateAction from "../Actions/CreateAction";
import UpdateCommande from "../Commandes/UpdateCommande";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import Spinner from "../../components/Spinner";

export const UserContext = createContext({});
export const AddressServer = createContext("https://localhost:8000");

const App = () => {

    const [token, setToken] = useState(localStorage.getItem("token"));

    const { items, loading: loadingUser, load: loadUser } = useFetchGet(useContext(AddressServer) + "/api/loggedin");
    const {items: ca, load: loadCa, loading: loadingCa} = useFetchGet(useContext(AddressServer) + "/api/getCaOfMonthByUserLogged/" + (items.id) )
    const {items: numberClients, load: loadNumberClients, loading: loadingNumberClients} = useFetchGet(useContext(AddressServer) + "/api/getNumberClientCurrentMonth/" + (items.id) )

    // on lance la requete avec l'ID du user logged sans context
    useEffect( () => {
        if(items.id){
            loadCa();
            loadNumberClients();
        }
    }, [ items.id, loadCa, loadNumberClients ] );

    // on récupère les données du user logged que si on a un token
    useEffect( () => {
       localStorage.getItem("token") && token !== "" && loadUser()
    }, [ loadUser, token ] );

    // Si pas de token on reste sur la page de connexion
    if( !token ){
        return <Login setToken={setToken} />
    }

    // On lance le spinner tant que tout n'est pas chargé
    if( loadingUser ){
        return <Spinner height={"100vh"}/>
    }

    return(
        <UserContext.Provider value={items}>
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home ca={ca} clients={ numberClients } loadingNumberClients={ loadingNumberClients } loadingCa={ loadingCa } />
                </Route>
                <Route path="/clients">
                    <Clients />
                </Route>
                <Route path="/profile/:idClient">
                    <Profile />
                </Route>
                <Route path="/creation_client">
                    <CreateClient  loadNumberClients={loadNumberClients} />
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
                    <CreateCommande loadCa={ loadCa } />
                </Route>
                <Route path="/update_commande/:id_commande">
                    <UpdateCommande />
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
                <Route path="/actions">
                    <Actions />
                </Route>
                <Route path="/create_action">
                    <CreateAction />
                </Route>
                <Route path="/action/:id_relance">
                    <Action />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/create_user">
                    <CreateUser />
                </Route>
                <Route path="/user/:id_user">
                    <User />
                </Route>
                <Route path="/update_user/:id_user">
                    <UpdateUser />
                </Route>
                <Route path={"/login"}>
                    <Login setToken={setToken} />
                </Route>
            </Switch>
        </Router>
        </UserContext.Provider>
    )
}
export default App;