import React, {useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const TableStyle = styled.table`
      width: 100%;
    `

const TableClientsIndex = ({clients, load, loading, nameClientSearch}) => {

    const headTable = ["Raison sociale", "mail", "Type de facturation", "Acquis/Prospect", "Code Postal" ];

    useEffect(() => load(), [load])

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
                {clients.filter(client => client.raison_sociale.toLowerCase().includes(nameClientSearch)).map((dataClient, key) => (
                    <tr key={key}>
                        {/*{Object.values(data.data).map((el, key) => <td key={key}>{el}</td>)}*/}
                        <td>{dataClient.raison_sociale}</td>
                        <td>{dataClient.email}</td>
                        <td>{dataClient.type_facturation ? "mail" : "courrier"}</td>
                        <td>{ dataClient.statut ? "Acquis" : "Prospect"}</td>
                        <td><Link to={{pathname: `/profile/${dataClient.id}`}}>Voir le profil</Link></td>
                    </tr>
                ))}
                </tbody>
            </TableStyle>
            {/*{JSON.stringify(client)}*/}

        </div>
    )
}
export default TableClientsIndex;