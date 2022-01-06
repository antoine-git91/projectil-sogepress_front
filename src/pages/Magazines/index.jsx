import React, {useEffect} from "react";
import MainContainer from "../../templates/Container";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import TableClientsIndex from "../../components/table/TableClientsIndex";
import Pagination from "../../components/Pagination";
import * as PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useFetchGet} from "../../utils/misc/useFetchGet";

const TableStyle = styled.table`
  width: 100%;
`

function TableMagazinesIndex({magazines, loading}) {
    const headTable = ["Nom", "Client" ];

    if (loading) {
        return <Spinner />
    }

    return(
        <div>
            <TableStyle>
                <thead>
                <tr>
                    { headTable.map( ( item, key) => <th key={key}>{item}</th> ) }
                </tr>
                </thead>
                <tbody>
                {magazines &&
                    magazines.map( ( dataMagazine, key ) => (
                        <tr key={key}>
                            <td><Link to={{pathname: `/magazine/${dataMagazine.id}`}}>{dataMagazine.nom}</Link></td>
                            <td><Link to={{pathname: `/magazine/${dataMagazine.id}`}}>{ dataMagazine.client.raisonSociale}</Link></td>
                        </tr>
                    ))}
                </tbody>
            </TableStyle>
        </div>
    )
}

TableMagazinesIndex.propTypes = {
    selectCodePostal: PropTypes.any,
    loading: PropTypes.any,
    setArrayClient: PropTypes.any,
    clients: PropTypes.any,
    selectActivite: PropTypes.any,
    selectVille: PropTypes.any,
    getStatus: PropTypes.any
};
const Magazines = () => {

    const { items: magazines, loading: loadingMagazine, load: loadMagazine } = useFetchGet( "https://localhost:8000/api/magazines" );

    useEffect( () => {
        loadMagazine()
    }, [ loadMagazine ] )

    console.log(magazines)

    return (
        <MainContainer>
            <DivButtonAction margin={"0 0 50px 0"}>
                <ButtonPrimaryLink to="/creation_magazine">Créer un magazine</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_commande">Créer une commande</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_relance">Créer une relance</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Magazines</h1>
            <TableMagazinesIndex magazines={magazines}
                               loading={loadingMagazine}
            />
            <Pagination />
        </MainContainer>
    )
}
export default Magazines