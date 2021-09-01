import React from "react";
import InputText from "../../components/Form/InputText";
import InputGroupRadio from "../../components/Form/InputGroupRadio";
import MainContainer from "../../../components/Container";
import {Link} from "react-router-dom";

const Home = () => {

    return(
        <MainContainer>
            <h1>Dashboard</h1>
            <InputText labeltext="coucou" typeinput="text"/>
            <InputGroupRadio />
            <Link to="/creation_client" >Créer un client</Link>
        </MainContainer>
    )
}
export default Home;