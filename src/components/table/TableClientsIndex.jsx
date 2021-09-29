import React, {useEffect} from "react";
import styled from "styled-components";
import {usePaginationFetch} from "../Hook";
import {Link} from "react-router-dom";

const TableStyle = styled.table`
      width: 100%;
    `

const TableClientsIndex = () => {

    const {items: clients, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/clients');
    const headTable = ["Raison sociale", "mail", "Type de facturation", "Site internet", "" ];

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
                {clients.map((dataClient, key) => (
                    <tr>
                        {/*{Object.values(data.data).map((el, key) => <td key={key}>{el}</td>)}*/}
                        <td>{dataClient.raison_sociale}</td>
                        <td>{dataClient.email}</td>
                        <td>{dataClient.type_facturation ? "mail" : "courrier"}</td>
                        <td>{dataClient.site_internet}</td>
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