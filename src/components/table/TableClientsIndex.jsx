import React, {useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const TableStyle = styled.table`
  width: 100%;
`

const TableClientsIndex = ({clients, load, loading, nameClientSearch, selectVille, selectCodePostal, selectActivite, getStatus}) => {

    const headTable = ["Raison sociale", "Activité", "Email", "Code Postal", "Ville" , "Acquis/Prospect" ];

    useEffect(() => load(), [load]);

    return(
        <div>
            {loading && 'Chargement...'}
            <TableStyle>
                <thead>
                    <tr>
                        {headTable.map((item, key) => <th key={key}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                {clients.filter(client => client.raison_sociale.toLowerCase().includes(nameClientSearch)
                    && client.naf_sous_classe.libelle.includes(selectActivite)
                    && client.adresses[0].ville.code_postal.includes(selectCodePostal)
                    && client.adresses[0].ville.nom.includes(selectVille)
                    && getStatus(client))
                    .map((dataClient, key) => (
                    <tr key={key}>
                        <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{dataClient.raison_sociale}</Link></td>
                        <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{ dataClient.naf_sous_classe.libelle}</Link></td>
                        <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{dataClient.email}</Link></td>
                        <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{ dataClient.adresses[0].ville.code_postal}</Link></td>
                        <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{ dataClient.adresses[0].ville.nom}</Link></td>
                        <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{ dataClient.statut ? "Acquis" : "Prospect"}</Link></td>

                    </tr>
                ))}
                </tbody>
            </TableStyle>
            {/*{JSON.stringify(client)}*/}

        </div>
    )
}
export default TableClientsIndex;