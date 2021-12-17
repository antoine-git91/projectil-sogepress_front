import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {InputStyle} from "../../utils/styles/InputStyle";
import PropTypes from "prop-types";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const FormStyle = styled.form`
  width: max-content;
  margin: auto;
`

async function loginUser(credentials) {
    return fetch('https://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data =>
            data.json()
        )
}
const Login = ({setToken, setCurrentUser, setLoading}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        localStorage.setItem('token', token['token']);
        localStorage.setItem('refreshToken', token['refreshToken']);
        setToken(token['token']);
        setIsLoggedIn(true);

        fetch('https://localhost:8000/api/loggedin', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                if(response.ok){
                    response.json()
                        .then(user => {
                            const currentUser = JSON.stringify({"id": user.id ,"prenom": user.prenom, "nom": user.nom, "email": user.email, "role": user.roles[0]});
                            localStorage.setItem('meUser', currentUser);
                        })
                }
            })
    }




    return(
        <Container>
            <h1 style={{textAlign: "center"}}>Bienvenue sur Projectil-Sogepress</h1>
            <p style={{textAlign: "center"}}>Connecter vous pour accéder à votre compte</p>
            <FormStyle onSubmit={handleSubmit}>
                <label>Identifiant
                    <InputStyle type="text" onChange={e => setUserName(e.target.value)} value={username} name="username" />
                </label>
                <label>Mot de passe
                    <InputStyle type="password" onChange={e => setPassword(e.target.value)} value={password} name="password" />
                </label>
                <button>Me connecter</button>
            </FormStyle>
        </Container>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login