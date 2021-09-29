import React, {useEffect} from "react";
import styled from "styled-components";
import {usePaginationFetch} from "../Hook";

const TableStyle = styled.table`
      width: 60%;
    `

const TableClientsIndex = () => {

    const {items: clients, loading, load} = usePaginationFetch('#');
    const headTable = ["Type", "Magasine"];

    const dataPotentiality = [{type: "Site internet", magasine: ""}, {type: "Print", magasine: "Hello"}]

    useEffect(() => load(), [load])

    return(
        <div>
            {!loading && 'Chargement...'}
            <TableStyle>
                <thead>
                    <tr>
                        {headTable.map((item, key) => <th key={key}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                {dataPotentiality.map((potentiality, key) => (
                    <tr>
                        <td>{potentiality.type}</td>
                        <td>{potentiality.magasine}</td>
                    </tr>
                ))}
                </tbody>
            </TableStyle>
            {/*{JSON.stringify(client)}*/}

        </div>
    )
}
export default TableClientsIndex;