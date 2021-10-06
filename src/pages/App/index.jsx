import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../Home";
import Clients from "../Clients";
import Profile from "../Clients/Profile";
import CreateClient from "../Clients/CreateClient";
import CreateCommande from "../Commandes/CreateCommande";
import Header from "../../components/Header";
import Commandes from "../Commandes";
import './app.css'
import Commande from "../Commandes/Commande";
import Login from "../Login";

const App = () => {

    const [token, setToken] = useState(localStorage.getItem('itemName'));
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
            .then(response => response.json())
            .then(data => setToken(data.token))
    }

    localStorage.setItem('itemName', token)
    console.log(localStorage.getItem('itemName'))

    if(!token || localStorage.getItem('itemName').includes(null) ){
        console.log('nope')
        return (
            <Login submit={handleSubmit} inputChange={handleChange} valueUser={value.username} valuePass={value.password} />
        )
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
            </Switch>
        </Router>
    )
}
export default App;