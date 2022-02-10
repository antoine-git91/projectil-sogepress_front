import React, {useContext, useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import Pagination from "../../components/Pagination";
import * as PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import {S} from "react-select/dist/Select-dbb12e54.esm";
import {AddressServer} from "../App";

const TableStyle = styled.table`
  width: 100%;
`

const Magazines = () => {

    let offset = 20;
    const headTable = ["Nom", "Client" ];
    const [ numberPage, setNumberPage ] = useState({value:1, valueDisplay:1} );

    const { items: magazines, loading: loadingMagazine, totalItems, load: loadMagazine } = useFetchGet( useContext(AddressServer) + "/api/magazines" );
    const numberOfPages = Math.ceil(totalItems/offset);

    useEffect( () => {
        loadMagazine()
    }, [ loadMagazine ] )


    return (
        <MainContainer>
            <DivButtonAction margin={"0 0 50px 0"}>
                <ButtonPrimaryLink to="/creation_magazine">Créer un magazine</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_commande">Créer une commande</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_relance">Créer une relance</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Magazines</h1>
            { loadingMagazine
                ? <Spinner />
                : (
                    <>
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
                    </>
                )
            }
            <Pagination
                numberOfPages={ numberOfPages }
                setNumberPage={ setNumberPage }
                numberPage={ numberPage.value }
            />
        </MainContainer>
    )
}
export default Magazines