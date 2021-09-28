import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"

const ItemList = styled.tr`
      cursor: pointer;
`

const TableField = ({dataClient, index}) => {

    return(
        <ItemList>
            {/*{Object.values(data.data).map((el, key) => <td key={key}>{el}</td>)}*/}
            <td>{index}</td>
            <td>{dataClient.raison_sociale}</td>
            <td>{dataClient.email}</td>
            <td>{dataClient.type_facturation ? "mail" : "courrier"}</td>
            <td>{dataClient.site_internet}</td>
            <td><Link to={{pathname: `/profile/${dataClient.id}`}}>Voir le profil</Link></td>
        </ItemList>
    )
}
export default TableField