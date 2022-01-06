import React, {useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {useParams} from "react-router-dom";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import {useFetchGet} from "../../utils/misc/useFetchGet";
import {BoxTitle, InfoContainer, InfoViewContainer} from "../../utils/styles/single";
import {BtnTabs} from "../../utils/styles/tab";
import BoxInfos from "../../components/Single/BoxInfos";
import Flexbox from "../../templates/Flexbox";
import styled from "styled-components";

const TableEditions = styled.table`
  td{
    padding: 10px;
  }
`

const Magazine = () => {

    const { idMagazine } = useParams();

    const tabs = [ "client", "edition" ];
    const [ tabActive, setTabActive ] = useState( tabs[ 0 ] );

    const { items: magazine, loading: loadingMagazine, load: loadMagazine } = useFetchGet( "https://localhost:8000/api/magazines/" + idMagazine );
    const { items: client, loading: loadingClient, load: loadClient } = useFetchGet( "https://localhost:8000/api/clients/" +  (Object.keys(magazine).length > 0 && magazine.client.id) );
    const { items: editions, loading: loadingEdition, load: loadEdition } = useFetchGet( "https://localhost:8000/api/editionsByMagazine/" + idMagazine );


    useEffect( () => {
        loadMagazine()
    }, [ loadMagazine ] );

    useEffect( () => {
        Object.keys(magazine).length > 0 &&
        loadClient()
    }, [ loadClient, magazine.length ] );

    useEffect( () => {
        (tabActive === "edition") &&
            loadEdition()
    }, [ loadEdition, tabActive ] );

    console.log(editions)

    return(
        <MainContainer>
            <DivButtonAction>
                <ButtonPrimaryLink to={ { pathname: `/update_magazine/${ idMagazine }` } }>Modifier le magazine</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_magazine">Nouveau magazine</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_commande">Nouvelle commande</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_client">Nouvelle relance</ButtonPrimaryLink>
            </DivButtonAction>
            <BoxTitle>
                <h1>{ magazine.nom }</h1>
            </BoxTitle>
            <div>
                { tabs.map( tab => (
                    <BtnTabs
                        key={ tab }
                        active={ tabActive === tab }
                        onClick={(e) => {
                            e.preventDefault()
                            setTabActive( tab )
                        }}
                    >{ tab }</BtnTabs>
                ) ) }
            </div>
            { tabActive === "client" &&
                <>
                    <Flexbox>
                        <InfoViewContainer>
                            <h2>Client</h2>
                            { client &&
                            <InfoContainer>
                                <BoxInfos titre="Raison Sociale" information={ client.raisonSociale ? client.raisonSociale : "Aucun numéro de téléphone" } />
                                <BoxInfos titre="Téléphone" information={ client.telephone ? client.telephone : "Aucun numéro de téléphone" } />
                                <BoxInfos titre="Email" information={ client.email } />
                                { client.adresse &&
                                <BoxInfos titre="Adresse" information={ client.adresse[ 0 ].numero + ' ' + client.adresse[ 0 ].typeVoie + ' ' + client.adresse[ 0 ].nomVoie + ' ' + client.adresse[ 0 ].ville.nom + ' ' + client.adresse[ 0 ].ville.codePostal } /> }
                                { client.adresse && client.adresse.length > 1 &&
                                ( <BoxInfos titre="Adresse de livraison" information={ client.adresse[ 1 ].numero + ' ' + client.adresse[ 1 ].typeVoie + ' ' + client.adresse[ 1 ].nomVoie + ' ' + client.adresse[ 1 ].ville.nom + ' ' + client.adresse[ 1 ].ville.codePostal } /> ) }
                                <BoxInfos titre="Site internet" information={ client.siteInternet ? client.siteInternet : "Aucun site internet" } />
                            </InfoContainer>
                            }
                        </InfoViewContainer>
                    </Flexbox>
                    <ButtonPrimaryLink to={"/profile/" + client.id }>Voir la fiche client</ButtonPrimaryLink>
                </>
            }
            {
                tabActive === "edition" &&
                    <>
                        <h2>Edition</h2>
                        { editions && editions.length > 0 ?
                            ( <TableEditions>
                                <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>nombre de page</th>
                                    <th>Quantité de magazines</th>
                                </tr>
                                </thead>
                                <tbody>
                                { editions.map( ( edition, key ) => (
                                    <tr key={ key + edition.id } id={ key }>
                                        <td>{ edition.nom }</td>
                                        <td>{ edition.pages }</td>
                                        <td>{ edition.quantite }</td>
                                    </tr>
                                ) ) }
                                </tbody>
                            </TableEditions> )
                            : "Aucune potentialité" }
                    </>
            }
        </MainContainer>
    )

}
export default Magazine