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
import {Redirect} from "react-router";
import {useEffect} from "react";

const App = () => {

    const [token, setToken] = useState(localStorage.getItem('itemName'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh'));
    //const [errorMessage, setErrorMessage] = useState(null)

    const [value, setValue] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const values = e.target.value;
        setValue({
            ...value,
            [e.target.name]: values
        });
    }

    const [loggedIn, setLoggedIn] = useState(false);

    localStorage.setItem('itemName', token);
    localStorage.setItem('refresh', refreshToken);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify({username: value.username, password: value.password})
        };
        fetch('http://127.0.0.1:8000/api/login', requestOptions)
            .then(response => {
                if(response.ok){
                    response.json()
                        .then(data => {
                            setToken(data.token)
                            setRefreshToken(data.refreshToken)
                        })
                    setLoggedIn(true)
                } else if (response.status === 401){
                }
            })

    }

    useEffect(() => {
        if(!localStorage.getItem('itemName').includes(null)){
            setLoggedIn(true)
        } else if (localStorage.getItem('itemName').includes('null')){
            setLoggedIn(false)
            console.log('deco')
        }
    }, [token])


    return(
        <Router>
            {!loggedIn ? <Redirect to="/login" /> : <Redirect to="/" />}
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
                <Route path="/magasines">
                </Route>
                <Route path="/actions">
                </Route>
                <Route path="/ventes">
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
                <Route exact path={"/login"} >
                    <Login submit={handleSubmit} inputChange={handleChange} valueUser={value.username} valuePass={value.password} />
                </Route>
            </Switch>
        </Router>
    )
}
export default App;