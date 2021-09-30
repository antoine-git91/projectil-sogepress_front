import React from "react";
import MainContainer from "../../../templates/Container";
import Table from "../../../components/table/TableClientsIndex";
import DivButtonAction from "../../../utils/styles/DivButton";
import {ButtonPrimaryLink} from "../../../utils/styles/button-primary";
import TableClientsIndex from "../../../components/table/TableClientsIndex";

const Clients = () => {

    return(
        <MainContainer>
            <DivButtonAction>
                <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Clients page</h1>
            <TableClientsIndex />
        </MainContainer>
    )
}
export default Clients;