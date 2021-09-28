import React from "react";
import MainContainer from "../../../templates/Container";
import Table from "../../../components/table";

const Clients = () => {

    const headTable = ["id", "Raison sociale", "mail", "Type de facturation", "Site internet", "" ];

    return(
        <MainContainer>
            <h1>Clients page</h1>
            <Table headTable={headTable} />
        </MainContainer>
    )
}
export default Clients;