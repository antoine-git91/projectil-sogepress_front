import React from "react";
import MainContainer from "../../../components/Container";
import {Link} from "react-router-dom";
import InputGroupRadio from "../../../components/Form/InputGroupRadio";

const Home = () => {

    return(
        <MainContainer>
            <h1>Dashboard</h1>
            <InputGroupRadio />
            <Link to="/creation_client" >Créer un client</Link>
        </MainContainer>
    )
}
export default Home;