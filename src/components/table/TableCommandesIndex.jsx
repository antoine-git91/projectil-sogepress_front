import React, {useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Spinner from "../Spinner";
import {useFetchGet} from "../../utils/misc/useFetchGet";

const TableStyle = styled.table`
      width: 100%;
    `

const TableCommandesIndex = () => {

    const headTable = ["Type", "Client", "Prix", "Date de livraison", "Status" ];

    const {items: commandes, loading, load} = useFetchGet('http://localhost:8000/api/commandes');
    useEffect(() => {
        load()
    }, [load])


    if (loading){
        return <Spinner />
    }

    return(
        <div>
            <TableStyle>
                <thead>
                    <tr>
                        {headTable.map((item, key) => <th key={key}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                {
                    commandes.map((dataCommande, key) => (
                        <tr key={key}>
                            <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>A faire</Link></td>
                            <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>{dataCommande.client.raisonSociale}</Link></td>
                            <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>{dataCommande.facturation}</Link></td>
                            <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>{dataCommande.fin}</Link></td>
                            <td><Link to={{pathname: `/commande/${dataCommande.id}`}}>{dataCommande.statut.libelle}</Link></td>
                        </tr>
                    )) }
                </tbody>
            </TableStyle>
        </div>
    )
}
export default TableCommandesIndex;