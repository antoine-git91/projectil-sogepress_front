import React, {useContext, useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {BoxTitle} from "../../utils/styles/single";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import Spinner from "../../components/Spinner";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {ButtonAction, ButtonPrimary} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import {dateIsoFormated} from "../../utils/misc/Function";
import {getType} from "../../utils/misc/commandes/functions";
import {AddressServer, UserContext} from "../App";
import Pagination from "../../components/Pagination";
import ModalRelanceAction from "./modals/ModalRelanceAction";
import ModalCreateAction from "./modals/ModalCreateAction";
import InfoPage from "../../components/Pagination/InfoPage";
import {whichPriority, getStatusRelance} from "../../utils/misc/relance/functions";

export const Priority = styled.span`
  min-width: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  display: inline-block;
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;

  &.retard {
    background-color: #ff1313;
  }

  &.urgente {
    background-color: #ff5a13;
  }

  &.moyenne {
    background-color: #ffd21c;
  }

  &.faible {
    background-color: #0eb90e;
  }
`

export const RelanceItem = styled.tr`
    &.validated td{
      background-color: #e5e5e5;
      
      & a{
        color: #989898;
        
        & span{
          background-color: #7e7e7e !important;
        }
      }
    }
`


const Actions = () => {

    const meUser = useContext(UserContext);
    let offset = 20;
    const [ numberPage, setNumberPage ] = useState({value:1, valueDisplay:1} );

    const headTableIndexRelance = ["Priorité", "Echéance", "Titre", "Type de relance", "Client", "Type comm. ", "Statut"];

    const { items: relances, loading: loadingRelances, totalItems, load: loadRelances } = useFetchGet(useContext(AddressServer) + "/api/getRelancesByUser/" + meUser.id);
    const numberOfPages = Math.ceil(totalItems/offset);

    const [ showModalValidated, setShowModalValidated ] = useState( false );
    const [ showModalDeleted, setShowModalDeleted ] = useState( false );
    const [ showModalRestored, setShowModalRestored ] = useState( false );
    const [ showModalCreateRelance, setShowModalCreateRelance ] = useState(false );
    const [ relanceClicked, setRelanceClicked ] = useState({});
    const [ arrayRelance, setArrayRelance ] = useState([]);


    useEffect( () => {
        loadRelances();
    }, [ loadRelances ]);

    useEffect( () => {
        setArrayRelance(relances);
    }, [ relances ]);


    const closeModal = () => {
        showModalValidated && setShowModalValidated(false );
        showModalDeleted && setShowModalDeleted(false );
        showModalRestored && setShowModalRestored(false );
        setShowModalCreateRelance(false );
    }


    return(
        <MainContainer>
            <DivButtonAction margin={ "0 0 50px 0" }>
                <ButtonPrimary onClick={() => (
                    setShowModalCreateRelance(true)
                )}>Créer une relance</ButtonPrimary>
            </DivButtonAction>
            <BoxTitle>
                <h1>Mes Actions</h1>
            </BoxTitle>
            { loadingRelances ?
                <Spinner />
                :
                <>
                    <InfoPage numberPage={ numberPage.value } numberOfPages={ numberOfPages } offset={ offset } totalItems={ totalItems } />
                    <table style={ { width: "100%" } }>
                        <thead>
                        <tr>
                            { headTableIndexRelance.map(( item, key) => <th key={ key }>{ item }</th> ) }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            arrayRelance.map( ( dataRelance, key) => (
                                <RelanceItem id={ dataRelance.id } className={ getStatusRelance(dataRelance.status && dataRelance.status.nom ) }>
                                    <td>
                                        <Link to={ { pathname: `/action/${ dataRelance.id }` } }>
                                            <Priority className={ whichPriority( dataRelance.dateEcheance ) }>{ whichPriority( dataRelance.dateEcheance ) }</Priority>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={ { pathname: `/action/${ dataRelance.id}` } }>{ dateIsoFormated( dataRelance.dateEcheance ) }</Link>
                                    </td>
                                    <td>
                                        <Link to={ { pathname: `/action/${ dataRelance.id }`} }>{ dataRelance.objet }</Link>
                                    </td>
                                    <td>
                                        <Link to={ { pathname: `/action/${ dataRelance.id }` } }>{ dataRelance.typeRelance === 0 ? "Prospection" : "Commande en cours" }</Link>
                                    </td>
                                    <td>
                                        <Link to={ { pathname: `/action/${ dataRelance.id }` } }>{ dataRelance.client.raisonSociale }</Link>
                                    </td>
                                    <td>
                                        <Link to={ { pathname: `/action/${ dataRelance.id }` } }>{ dataRelance.commande ? getType( dataRelance.commande ) : "Aucune" }</Link>
                                    </td>
                                    <td>
                                        <Link to={ { pathname: `/action/${ dataRelance.id }` } }>{ dataRelance.status && dataRelance.status.nom }</Link>
                                    </td>
                                    { getStatusRelance(dataRelance.status && dataRelance.status.nom ) === "validated"
                                        ? <td>
                                            <ButtonAction
                                                onClick={ () => (
                                                    setShowModalRestored( true ),
                                                    setRelanceClicked( dataRelance )
                                                ) }>
                                                <span className="screen-reader-text">Restaurer la relance</span>
                                                <i className={ "return" }/>
                                            </ButtonAction>
                                        </td>
                                        : <td>
                                            <ButtonAction
                                                onClick={ () => (
                                                    setShowModalValidated( true ),
                                                    setRelanceClicked( dataRelance )
                                                ) }>
                                                <span className="screen-reader-text">Valider la relance</span>
                                                <i className={ "checked" }/>
                                            </ButtonAction>
                                        </td>
                                    }
                                    <td>
                                        <ButtonAction onClick={ () =>  (
                                            setShowModalDeleted( true ),
                                            setRelanceClicked( dataRelance ) ) }>
                                            <span className="screen-reader-text">Supprimer la relance</span>
                                            <i className={ "deleted" }/>
                                        </ButtonAction>
                                    </td>
                                </RelanceItem>
                            )) }
                        </tbody>
                    </table>
                </>
            }
            {showModalValidated &&
                <ModalRelanceAction
                    relanceClicked={relanceClicked}
                    closeModal={closeModal}
                    action={"validated"}
                    request={loadRelances}
                />
            }
            { showModalRestored &&
                <ModalRelanceAction
                    relanceClicked={relanceClicked}
                    closeModal={closeModal}
                    action={"restored"}
                    request={loadRelances}
                />
            }
            { showModalDeleted &&
                <ModalRelanceAction
                    relanceClicked={relanceClicked}
                    closeModal={closeModal}
                    action={"deleted"}
                    request={loadRelances}
                />
            }
            { showModalCreateRelance && <ModalCreateAction closeModal={closeModal} request={loadRelances}/> }
            <Pagination
                numberOfPages={ numberOfPages.value }
                setNumberPage={ setNumberPage }
                numberPage={ numberPage.value }
            />
        </MainContainer>
    )
}
export default Actions;
