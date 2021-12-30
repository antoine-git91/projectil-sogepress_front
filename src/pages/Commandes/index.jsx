import React from "react";
import MainContainer from "../../templates/Container";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import TableCommandesIndex from "../../components/table/TableCommandesIndex";
import Pagination from "../../components/Pagination";

const Commandes = () => {

    return(
        <>
            <MainContainer>
                <DivButtonAction margin={"0 0 50px 0"}>
                    <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_commande">Créer une commande</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_relance">Créer une relance</ButtonPrimaryLink>
                </DivButtonAction>
                <h1>Commandes page</h1>
                <TableCommandesIndex />
                <Pagination/>
            </MainContainer>
        </>
    )
}
export default Commandes;