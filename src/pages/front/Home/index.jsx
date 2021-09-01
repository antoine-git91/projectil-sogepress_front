import React from "react";
import MainContainer from "../../../components/Container";
import {Link} from "react-router-dom";

const Home = () => {

    return(
        <MainContainer>
            <h1>Dashboard</h1>
            <Link to="/creation_client" >Créer un client</Link>
        </MainContainer>
    )
}
export default Home