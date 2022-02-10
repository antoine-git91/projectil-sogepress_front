import React, {useContext, useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import Pagination from "../../components/Pagination";
import {Link} from "react-router-dom";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import Spinner from "../../components/Spinner";
import styled from "styled-components";
import {dateIsoFormated} from "../../utils/misc/Function";
import {getType} from "../../utils/misc/commandes/functions";
import InfoPage from "../../components/Pagination/InfoPage";
import {AddressServer} from "../App";

const TableStyle = styled.table`
      width: 100%;
`

const Commandes = () => {

    let offset = 20;
    const headTable = [ "Type", "Titre" , "Client", "Prix", "Date de livraison", "Status" ];
    const [ numberPage, setNumberPage ] = useState({value:1, valueDisplay:1} );
    const { items: commandes, totalItems, loading, load } = useFetchGet( useContext(AddressServer) + "/api/commandes?page=" + numberPage.value );

    const numberOfPages = Math.ceil(totalItems/offset);

    useEffect(() => {
        load()
    }, [ load ] );


    return(
        <>
            <MainContainer>
                <DivButtonAction margin={"0 0 50px 0"}>
                    <ButtonPrimaryLink to="/creation_commande">Créer une commande</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/create_action">Créer une relance</ButtonPrimaryLink>
                </DivButtonAction>
                <h1>Commandes</h1>
                { loading
                    ? <Spinner />
                    : (
                        <>
                            <InfoPage numberPage={numberPage.value} numberOfPages={numberOfPages} offset={offset} totalItems={totalItems} />
                            <TableStyle>
                                <thead>
                                <tr>
                                    { headTable.map( ( item, key) => <th key={ key }>{ item }</th> ) }
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    commandes.map( ( dataCommande, key ) => (
                                        <tr key={ key }>
                                            <td><Link to={ { pathname: `/commande/${ dataCommande.id }` } }>{ getType( dataCommande ) }</Link></td>
                                            <td><Link to={ { pathname: `/commande/${ dataCommande.id }` } }>{ dataCommande.title }</Link></td>
                                            <td><Link to={ { pathname: `/commande/${ dataCommande.id }` } }>{ dataCommande.client.raisonSociale }</Link></td>
                                            <td><Link to={ { pathname: `/commande/${ dataCommande.id }` } }>{ dataCommande.facturation }</Link></td>
                                            <td><Link to={ { pathname: `/commande/${ dataCommande.id }` } }>{ dateIsoFormated( dataCommande.fin ) }</Link></td>
                                            <td><Link to={ { pathname: `/commande/${ dataCommande.id }` } }>{ dataCommande.statut && dataCommande.statut.libelle }</Link></td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </TableStyle></>
                    )
                }
                <Pagination
                    numberOfPages={ numberOfPages }
                    setNumberPage={ setNumberPage }
                    numberPage={ numberPage.value }
                />
            </MainContainer>
        </>
    )
}
export default Commandes;