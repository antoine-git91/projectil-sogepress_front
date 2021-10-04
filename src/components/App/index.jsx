import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../../pages/front/Home";
import Clients from "../../pages/front/Clients";
import Profile from "../../pages/front/Clients/Profile";
import CreateClient from "../../pages/backoffice/Clients/CreateClient";
import CreateCommande from "../../pages/backoffice/commandes/CreateCommande";
import Header from "../Header";
import Commandes from "../../pages/front/Commandes";
import './app.css'

const App = () => {

    /*const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState(null)*/

    /*const [value, setValue] = useState({
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
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({username: value.username, password: value.password})
        };
        fetch('http://127.0.0.1:8000/api/login', requestOptions)
            .then(response => response.json())
            .then(data => setToken(data.token))
    }*/

    /*if(!token){
        return (
            <Login submit={handleSubmit} inputChange={handleChange} valueUser={value.username} valuePass={value.password} />
        )
    }*/

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
                    <Commandes />
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