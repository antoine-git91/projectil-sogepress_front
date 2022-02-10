import React, {useContext} from "react";
import MainContainer from "../../templates/Container";
import DivButtonAction from "../../utils/styles/DivButton";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import {useState, useEffect} from "react";
import Pagination from "../../components/Pagination";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import Spinner from "../../components/Spinner";
import {Link} from "react-router-dom";
import styled from "styled-components";
import InfoPage from "../../components/Pagination/InfoPage";
import {AddressServer} from "../App";


const TableStyle = styled.table`
  width: 100%;
`


const Clients = () => {

    let offset = 20;
    const headTable = ["Raison sociale", "Activité", "Email", "Code Postal", "Ville" , "Acquis/Prospect" ];
    const [ numberPage, setNumberPage ] = useState({value:1, valueDisplay:1} );
    const { items: clients, loading: loadingClients, totalItems, load: loadClients } = useFetchGet(useContext(AddressServer) + '/api/clients?page=' + numberPage.value );
    const numberOfPages = Math.ceil(totalItems/offset);

    useEffect(() => {
        loadClients();
    }, [ loadClients ]);


    return(

        <>
        <MainContainer>
            <DivButtonAction margin={"0 0 50px 0"}>
                <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/create_action">Créer une relance</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Clients</h1>
            { loadingClients
                ? <Spinner />
                : (
                    <>
                        <InfoPage numberPage={numberPage.value} numberOfPages={numberOfPages} offset={offset} totalItems={totalItems} />
                        <TableStyle>
                            <thead>
                            <tr>
                                { headTable.map( ( item, key) => <th key={ key+item }>{ item }</th> ) }
                            </tr>
                            </thead>
                            <tbody>
                            {clients && clients.map((dataClient, key) => (
                                <tr key={ key + dataClient.id }>
                                    <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{dataClient.raisonSociale}</Link></td>
                                    <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{ dataClient.nafSousClasse.libelle}</Link></td>
                                    <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{dataClient.email}</Link></td>
                                    <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{ dataClient.adresse[0] && dataClient.adresse[0].ville.codePostal}</Link></td>
                                    <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{ dataClient.adresse[0] && dataClient.adresse[0].ville.nom}</Link></td>
                                    <td><Link to={{pathname: `/profile/${dataClient.id}`}}>{ dataClient.statut ? "Acquis" : "Prospect"}</Link></td>
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
        </>
    )
}
export default Clients;