import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import  logo from "../../assets/images/logo_200.png";
import  eye from "../../assets/images/eye.png";
import eyeOrange from "../../assets/images/eye_orange.png";
import InputText from "../../components/Form/InputText";
import {useFetchPost} from "../../utils/misc/fetch/useFetchPost";
import {toggleTypeInput} from "../../utils/misc/input/Password";
import {ButtonSecondary, ButtonSecondaryLink} from "../../utils/styles/button";
import {AddressServer} from "../App";

const Body = styled.body`
  background: rgb(252, 154, 87);
  background: linear-gradient(0deg, rgba(252, 154, 87, 1) 0%, rgba(247, 127, 45, 1) 35%, rgb(255, 126, 39) 100%);
  width: 100vw;
  height: 100vh;

  section {
    margin-bottom: 40px;
    
    p{
      font-size: 24px;
      color: #fff;
    }
  }

  & img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
  }
`

export const ContentInputClear = styled.div`
  position: relative;
  width: max-content;
`

export const ClearPassBtn = styled.button`
  border: 0px solid transparent;
  background-color: transparent;
  left: 100%;
  top: 34px;
  position: absolute;
  margin-left: 10px;
  &:after{
    content: url(${({ eye_orange }) => eye_orange ? eyeOrange : eye});
  }
`

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const FormStyle = styled.form`
  width: max-content;
  margin: auto;
  
  input{
    width: calc(100% - 20px);
    margin-right: 0;
  }
`

const ConnectBtn = styled.button`
  width: 100%;
  border: transparent;
  background-color: #ff6023;
  padding: 15px 20px;
  border-radius: 5px;
  color: #ffffff;
  font-weight: bolder;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Login = ( { setToken } ) => {

    const [ username, setUserName ] = useState("admin@test.com");
    const [ password, setPassword ] = useState("antoine123");
    const [ typeInputPass, setTypeInputPass ] = useState(true);


    const { success, error, post, loading, responseStatut } = useFetchPost(
        useContext(AddressServer) +"/api/login",
        {
            username,
            password
        }
    );


    useEffect( () => {
        if(responseStatut === 200){
            localStorage.setItem( 'token', success.token );
            localStorage.setItem( 'refreshToken', success.refreshToken );
            setToken( success.token );
        }
    }, [ responseStatut, post ] );


    const handleSubmit = e => {
        e.preventDefault();
        post();
    }


    return(
        <Body>
            <Container>
                <section>
                <img src={logo} alt=""/>
                    <h1 style={{textAlign: "center"}}>Connecter vous pour accéder à votre compte</h1>
                </section>
                <FormStyle onSubmit={handleSubmit}>
                    <InputText
                        label={ "Identifiant" }
                        value={ username }
                        name={ "username" }
                        placeholder={ "Saisir votre identifiant" }
                        onChange={ e => setUserName( e.target.value ) }
                        required
                    />
                    <ContentInputClear>
                        <InputText
                            type={typeInputPass ? "password" : "text"}
                            label={ "Mot de passe" }
                            value={ password }
                            name={ "password" }
                            placeholder={ "Saisir votre mot de passe" }
                            onChange={ e => setPassword( e.target.value ) }
                            required
                        />
                        <ClearPassBtn onClick={ ( e ) => toggleTypeInput( e, setTypeInputPass, typeInputPass ) }><span className="screen-reader-text">Mettre en claire le mot de passe</span></ClearPassBtn>
                    </ContentInputClear>
                    <ConnectBtn>Me connecter</ConnectBtn>
                    <button>Mot de passe oublié ?</button>
                </FormStyle>
            </Container>
        </Body>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login