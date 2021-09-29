import React from "react";
import MainContainer from "../../../templates/Container";
import {ButtonPrimaryLink} from "../../../utils/styles/button-primary";
import DivButtonAction from "../../../utils/styles/DivButton";
import TableCommandesIndex from "../../../components/table/TableCommandesIndex";

const Commandes = () => {

    const headTable = ["Raison sociale", "mail", "Type de facturation", "Site internet", "" ];
    const dataUrl= 'http://127.0.0.1:8000/api/clients';

    return(
        <MainContainer>
            <DivButtonAction>
                <ButtonPrimaryLink to="/creation_commande">Créer une commande</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Commandes page</h1>
            <TableCommandesIndex />
        </MainContainer>
    )
}
export default Commandes;