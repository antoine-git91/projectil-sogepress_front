import React, {useEffect} from "react";
import styled from "styled-components";
import {usePaginationFetch} from "../Hook";
import {Link} from "react-router-dom";

const TableStyle = styled.table`
      width: 100%;
    `

const TableCommandesIndex = () => {

    const {items: commandes, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/commandes');
    const headTable = ["Type", "Client", "Prix", "Date de livraison", "Status" ];

    console.log(commandes)

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
                {commandes.map((dataCommande, key) => (
                    <tr key={key}>
                        <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>A faire</Link></td>
                        <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>{dataCommande.client.raisonSociale}</Link></td>
                        <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>{dataCommande.facturation}</Link></td>
                        <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>{dataCommande.fin}</Link></td>
                        <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>{dataCommande.statut.libelle}</Link></td>
                    </tr>
                ))}
                </tbody>
            </TableStyle>
            {/*{JSON.stringify(client)}*/}

        </div>
    )
}
export default TableCommandesIndex;