import React, {useEffect} from "react";
import styled from "styled-components";
import {usePaginationFetch} from "../Hook";

export const TotalCa = styled.div`
display : flex;
justify-content: flex-end;
font-weight: 900;
`

const TableCommandeStyle = styled.table`
      width: 60%;
    `

const TableCommandeSingle = () => {

    const {items: clients, loading, load} = usePaginationFetch('#');
    const headTable = ["Type", "Magasine"];

    const dataPotentiality = [{type: "Site internet", magasine: ""}, {type: "Print", magasine: "Hello"}]

    useEffect(() => load(), [load])

    return(
        <div>
            {!loading && 'Chargement...'}
            <TableCommandeStyle>
                {/* <thead>
                    <tr>
                        {headTable.map((item, key) => <th key={key}>{item}</th>)}
                    </tr>
                </thead> */}
                <tbody>
                {dataPotentiality.map((potentiality, key) => (
                    <tr>
                        {/* <td>{potentiality.type}</td> */}
                        <td>Type de produit</td>
                        <td>11/09/2021</td>
                        <td>200€</td>
                        <td>Status</td>
                    </tr>
                ))}
                </tbody>
            </TableCommandeStyle>
            {/*{JSON.stringify(client)}*/}
            <TotalCa>Total de CA : 1854€</TotalCa>

        </div>
    )
}
export default TableCommandeSingle;