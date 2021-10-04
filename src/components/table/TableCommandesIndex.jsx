import React, {useEffect} from "react";
import styled from "styled-components";
import {usePaginationFetch} from "../Hook";
import {Link} from "react-router-dom";

const TableStyle = styled.table`
      width: 100%;
    `

const TableCommandesIndex = () => {

    const {items: clients, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/commandes');
    const headTable = ["Type", "Client", "Prix", "Date de livraison", "Status" ];

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
                    <tr key={key}>
                        <td><Link to={{pathname: `/commande/${dataClient.id}`}}>{dataClient.client.nom}</Link></td>
                        <td><Link to={{pathname: `/commande/${dataClient.id}`}}>{dataClient.email}</Link></td>
                        <td><Link to={{pathname: `/commande/${dataClient.id}`}}>{dataClient.type_facturation ? "mail" : "courrier"}</Link></td>
                        <td><Link to={{pathname: `/commande/${dataClient.id}`}}>{dataClient.site_internet}</Link></td>
                        <td><Link to={{pathname: `/commande/${dataClient.id}`}}>{dataClient.statut.libelle}</Link></td>
                    </tr>
                ))}
                </tbody>
            </TableStyle>
            {/*{JSON.stringify(client)}*/}

        </div>
    )
}
export default TableCommandesIndex;