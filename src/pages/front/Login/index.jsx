import React from 'react';
import InputText from "../../../components/Form/InputText";
import styled from "styled-components";
import {useState} from "react";

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

const Login = ({submit, inputChange, valueUser, valuePass}) => {

    return(
        <Container>
            <h1 style={{textAlign: "center"}}>Bienvenue sur Projectil-Sogepress</h1>
            <p style={{textAlign: "center"}}>Connecter vous pour accéder à votre compte</p>
            <FormStyle onSubmit={submit}>
                <InputText label="Mon identifiant" name="username"  onChange={inputChange} value={valueUser}/>
                <InputText label="Mon mot de passe" name="password" type="password" onChange={inputChange} value={valuePass} />
                <button>Me connecter</button>
            </FormStyle>
        </Container>
    )
}
export default Login