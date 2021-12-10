import React from "react";
import MainContainer from "../../templates/Container";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";

const Home = () => {

    return(
        <React.Fragment>
            <MainContainer>
                <DivButtonAction>
                    <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_commande">Créer une commande</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_relance">Créer une relance</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_relance">Créer un magazine</ButtonPrimaryLink>
                </DivButtonAction>
                <h1>Dashboard</h1>
            </MainContainer>
        </React.Fragment>
    )
}
export default Home;