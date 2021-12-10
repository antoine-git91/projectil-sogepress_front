import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

export const TotalCa = styled.div`
display : flex;
justify-content: flex-end;
font-weight: 900;
  margin-top: 30px;
`

const TableCommandeStyle = styled.table`
      width: 100%;
    `

const TableCommandeSingle = ({commandes}) => {


    //const {items: clients, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/clients/' + idUser);
    const [totalCommandesPrice, setTotalCommandesPrice] = useState(0);

    useEffect(() => {
        let allPrice = commandes.map(commande => totalCommandesPrice + commande.facturation )
        const total = allPrice.reduce((previousValue, currentValue) => previousValue + currentValue)
        setTotalCommandesPrice(total)
    }, [])

    const headTable = ["Type", "Magasine", "Prix", "Status", ""];

    //useEffect(() => load(), [load])

    return(
        <div>
            {/*{!loading && 'Chargement...'}*/}
            <TableCommandeStyle>
                 <thead>
                    <tr>
                        {headTable.map((item, key) => <th key={key}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                {commandes.map( (commande,key) => (
                    <tr key={key}>
                        <td><Link to={{pathname: `/commande/${commande.id}`}}>Type de produit</Link></td>
                        <td><Link to={{pathname: `/commande/${commande.id}`}}>{commande.fin}</Link></td>
                        <td><Link to={{pathname: `/commande/${commande.id}`}}>Champ manquant</Link></td>
                        <td><Link to={{pathname: `/commande/${commande.id}`}}>{commande.facturation}</Link></td>
                    </tr>
                ))}
                </tbody>
            </TableCommandeStyle>
            <TotalCa>Total de CA : {totalCommandesPrice}€</TotalCa>

        </div>
    )
}
export default TableCommandeSingle;