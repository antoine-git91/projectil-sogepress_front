import React from "react";
import styled from "styled-components";
import {DeleteButton} from "../../utils/styles/button";

const TableStyle = styled.table`
      width: 60%;
    `
const AutoWidth = styled.td`
  width: 1px;
  white-space: nowrap;
`

const TablePotentiality = ({headTable, dataPotentiality, removePotentiality}) => {


    return(
        <div>
            {/*{!loading && 'Chargement...'}*/}
            <TableStyle>
                <thead>
                    <tr>
                        {headTable.map((item, key) => <th key={key}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {dataPotentiality && dataPotentiality.length > 0 ? dataPotentiality.map((potentiality, key) => (
                        <tr key={key+potentiality.type.value} id={key}>
                            <AutoWidth>{potentiality ? potentiality.type.valueDisplay : ""}</AutoWidth>
                            <AutoWidth>{potentiality ? potentiality.magazine.valueDisplay : ""}</AutoWidth>
                            {removePotentiality && <AutoWidth ><DeleteButton onClick={(e) => removePotentiality(e, key)}>Supprimer X</DeleteButton></AutoWidth>}
                        </tr>
                    )): ""}
                </tbody>
            </TableStyle>
        </div>
    )
}
export default TablePotentiality;