import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link, useParams} from "react-router-dom";
import {useFetchGet} from "../../utils/misc/useFetchGet";

export const TotalCa = styled.div`
display : flex;
justify-content: flex-end;
font-weight: 900;
  margin-top: 30px;
`

const TableCommandeStyle = styled.table`
      width: 100%;
    `

const TableCommandeSingle = ({ commandes }) => {

    const {idClient} = useParams();
    const headTable = ["Type", "Magasine", "Montant", "Status", ""];
    const {items: clients, loading, load} = useFetchGet(`https://127.0.0.1:8000/api/clients/${idClient}`);
    const [totalCommandesPrice, setTotalCommandesPrice] = useState(0);

    useEffect(() => {
        if( commandes && commandes.length > 0 ){
            let allPrice = commandes.map(commande => totalCommandesPrice + commande.facturation )
            const total = allPrice.reduce((previousValue, currentValue) => previousValue + currentValue)
            setTotalCommandesPrice(total)
        }
    }, [])

    useEffect(() => load(), [load])

    return(
        <div>
            {/*{!loading && 'Chargement...'}*/}
            { commandes && commandes.length > 0
            ?  <React.Fragment>
                    <TableCommandeStyle>
                        <thead>
                            <tr>
                                {headTable.map((item, key) => <th key={key}>{item}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {commandes.map((commande, key) => (
                                <tr key={key}>
                                    <td><Link to={{pathname: `/commande/${commande.id}`}}>Type de produit</Link></td>
                                    <td><Link to={{pathname: `/commande/${commande.id}`}}>{commande.fin}</Link></td>
                                    <td><Link to={{pathname: `/commande/${commande.id}`}}>{commande.facturation}</Link></td>
                                    <td><Link to={{pathname: `/commande/${commande.id}`}}>Champ manquant</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </TableCommandeStyle>
                    <TotalCa>Total de CA : {totalCommandesPrice}€</TotalCa>
                </React.Fragment>
            : "Aucune commandes" }
        </div>
    )
}
export default TableCommandeSingle;