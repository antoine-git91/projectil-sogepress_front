import React from "react";
<<<<<<< HEAD:src/pages/Home/index.jsx
import InputText from "../../components/Form/InputText";
import InputGroupRadio from "../../components/Form/InputGroupRadio";
import styled from "styled-components";
=======
import MainContainer from "../../../components/Container";
import {Link} from "react-router-dom";
>>>>>>> antoine:src/pages/front/Home/index.jsx

const Home = () => {

    return(
        <MainContainer>
            <h1>Dashboard</h1>
<<<<<<< HEAD:src/pages/Home/index.jsx
            <InputText labeltext="coucou" typeinput="text"/>
            <InputGroupRadio />
        </Main>
=======
            <Link to="/creation_client" >Créer un client</Link>
        </MainContainer>
>>>>>>> antoine:src/pages/front/Home/index.jsx
    )
}
export default Home