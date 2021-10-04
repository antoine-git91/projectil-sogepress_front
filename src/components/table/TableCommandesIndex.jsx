import React, {useEffect} from "react";
import styled from "styled-components";
import {usePaginationFetch} from "../Hook";
import {Link} from "react-router-dom";

const TableStyle = styled.table`
      width: 100%;
    `

const TableCommandesIndex = () => {

    const {items: commandes, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/commandes');
    const headTable = ["Type", "Client", "Ville", "Prix", "Date de livraison", "Status" ];

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
                    <tr>
                        <td>{dataCommande.raison_sociale}</td>
                        <td>{dataCommande.email}</td>
                        <td>{dataCommande.type_facturation ? "mail" : "courrier"}</td>
                        <td>{dataCommande.site_internet}</td>
                        <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>Voir le profil</Link></td>
                    </tr>
                ))}
                </tbody>
            </TableStyle>
            {/*{JSON.stringify(client)}*/}

        </div>
    )
}
export default TableCommandesIndex;