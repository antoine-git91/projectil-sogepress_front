import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ButtonAction} from "../../utils/styles/button";
import {dateIsoFormated} from "../../utils/misc/Function";
import {getType} from "../../utils/misc/commandes/functions";
import {Priority, RelanceItem} from "../../pages/Actions";
import Modal from "../Modal/Modal";
import ModalRelanceAction from "../../pages/Actions/modals/ModalRelanceAction";
import Flexbox from "../../templates/Flexbox";
import next from "../../assets/images/next.png"
import {whichPriority, getStatusRelance} from "../../utils/misc/relance/functions";
import Spinner from "../Spinner";

const RelanceContainerStyle = styled.div`
  
  transition: .3s;
  h2{
    margin-top: 0;
    margin-bottom: 0;
  }
  margin-top: 20px;
  border: 3px solid #FF6700;
  padding: 10px 20px;
  border-radius: 10px;
`

const Contenu = styled.span`
  
  & a{
    display: inline-block;
    max-width: 40ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const NumberByPriority = styled.div`
  font-size: 20px;
  margin-left: 20px;
  
  & span{
    margin-right: 10px;
  }
`

const Accordion = styled.button`
  border: transparent;
  background-color: transparent;
  
  &:before{
    content: url(${next});
    display: block;
    transition: .3s;
  }

  &.show:before{
    transform: rotate(90deg);
  }
`

const RelancePostItTable = styled.div`
  height: 0;
  opacity: 0;
  overflow: hidden;
  
  &[aria-expanded="true"]{
    height: initial;
    transition: height .3s;
    opacity: 1;
  }
`

const RelanceContainer = ({ relances, commande, client, loading, request }) => {

    const [ showModal, setShowModal ] = useState( false );
    const [ showModalValidated, setShowModalValidated ] = useState( false );
    const [ showModalDeleted, setShowModalDeleted ] = useState( false );
    const [ showModalRestored, setShowModalRestored ] = useState( false );
    const [ relanceClicked, setRelanceClicked ] = useState({});
    const [ arrayRelance, setArrayRelance ] = useState([]);
    const headTableClient = ["statut", "titre", "info supp.", "échéance", "type relance", "type comm.", "titre comm."];
    const headTableCommande = ["statut", "titre", "info supp.", "échéance", "type relance", "Client"];

    const closeModal = () => {
        showModalValidated && setShowModalValidated(false );
        showModalDeleted && setShowModalDeleted(false );
        showModalRestored && setShowModalRestored(false );
        setShowModal(false );
    }

    useEffect( () => {
        setArrayRelance(relances);
    }, [ relances ]);

    const arrow = useRef();
    const table = useRef();

    const showItems = () => {
        arrow.current.classList.toggle("show");
        arrow.current.classList.contains("show") ? table.current.setAttribute('aria-expanded', "true") : table.current.setAttribute('aria-expanded', "false");
    };

    const countRelanceByPriority = () => {
        let obj = {
            "urgent": 0,
            "moyenne": 0,
            "faible": 0,
            "retard" : 0
        }
        arrayRelance.forEach(el => {
           if (whichPriority(el.dateEcheance) === "urgente"){
               obj["urgent"] += 1
           }else if (whichPriority(el.dateEcheance) === "faible"){
               obj["faible"] += 1
           }else if (whichPriority(el.dateEcheance) === "moyenne"){
               obj["moyenne"] += 1
           }if (whichPriority(el.dateEcheance) === "retard"){
                obj["retard"] += 1
           }
        })
        return obj
    }


    return (

        <RelanceContainerStyle>
          <Flexbox align={"center"}>
              <h2>Relance</h2>
              <NumberByPriority>
                  {countRelanceByPriority()["urgent"] > 0 && <span>Urgente ({countRelanceByPriority()["urgent"]})</span>}
                  {countRelanceByPriority()["moyenne"] > 0 &&  <span>Moyenne ({countRelanceByPriority()["moyenne"]})</span>}
                  {countRelanceByPriority()["faible"] > 0 && <span>Faible ({countRelanceByPriority()["faible"]})</span>}
                  {countRelanceByPriority()["retard"] > 0 && <span>Retard ({countRelanceByPriority()["retard"]})</span>}
              </NumberByPriority>
              <Accordion ref={arrow} onClick={showItems} className={"show"}><span className={"screen-reader-text"}>Déplier les relances</span></Accordion>
          </Flexbox>
            {!loading && (
                <RelancePostItTable ref={table}  aria-expanded={"true"}>
                    <table>
                        <thead>
                           <tr>
                               { commande && headTableClient.map((el) => <th key={ el }>{ el }</th>) }
                               { client && headTableCommande.map((el) => <th key={ el }>{ el }</th>) }
                           </tr>
                        </thead>
                        <tbody>
                        {
                            arrayRelance && arrayRelance.map( ( relance ) =>
                                <RelanceItem key={ relance.id } className={ getStatusRelance(relance.status && relance.status.nom )} >
                                    <td>
                                        <Link to={ "/action/" + relance.id }>
                                            <Priority className={ whichPriority( relance.dateEcheance ) }>{ whichPriority( relance.dateEcheance ) }</Priority>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={ "/action/" + relance.id }>{ relance.objet }</Link>
                                    </td>
                                    <td>
                                        <Contenu>
                                            <Link to={ "/action/" + relance.id }>{ relance.contenu ? relance.contenu : "NC" }</Link>
                                        </Contenu>
                                    </td>
                                    <td>
                                        <Link to={ "/action/" + relance.id }>{ dateIsoFormated( relance.dateEcheance ) }</Link>
                                    </td>
                                    <td>
                                        <Link to={ { pathname: `/action/${ relance.id }` } }>{ relance.typeRelance === 0 ? "Prospection" : "Commande en cours" }</Link>
                                    </td>
                                    { commande && (
                                        <>
                                            <td>
                                                <Link to={ { pathname: `/action/${ relance.id }` } }>{ relance.commande ? getType( relance.commande ) : "Aucune" }</Link>
                                            </td>
                                            <td>
                                                <Link to={ { pathname: `/action/${ relance.id }` } }>{ relance.commande ? relance.commande.title : "Aucune" }</Link>
                                            </td>
                                        </>
                                    ) }
                                    { client && (
                                        <td>
                                            <Link to={ { pathname: `/action/${ relance.id }` } }>{ relance.client && relance.client.raisonSociale }</Link>
                                        </td>
                                    ) }
                                    { getStatusRelance(relance.status && relance.status.nom ) === "validated"
                                        ? <td>
                                            <ButtonAction
                                                onClick={ () => (
                                                    setShowModal(true ),
                                                    setShowModalRestored( true ),
                                                    setRelanceClicked( relance )
                                                ) }>
                                                <span className="screen-reader-text">Restaurer la relance</span>
                                                <i className={ "return" }/>
                                            </ButtonAction>
                                        </td>
                                        : <td>
                                            <ButtonAction
                                                onClick={ () => (
                                                    setShowModal(true ),
                                                    setShowModalValidated( true ),
                                                    setRelanceClicked( relance )
                                                ) }>
                                                <span className="screen-reader-text">Valider la relance</span>
                                                <i className={ "checked" }/>
                                            </ButtonAction>
                                        </td>
                                    }
                                    <td>
                                        <ButtonAction onClick={ () =>  (
                                            setShowModal(true ),
                                            setShowModalDeleted( true ),
                                            setRelanceClicked( relance ) ) }>
                                            <span className="screen-reader-text">Supprimer la relance</span>
                                            <i className={"deleted"}/></ButtonAction>
                                    </td>
                                </RelanceItem>
                            )
                        }
                        </tbody>
                    </table>
                </RelancePostItTable>
            )}
            { ( showModal === true &&
                <Modal
                    children={
                        //Validation
                        ( showModalValidated &&
                            <ModalRelanceAction
                                relanceClicked={ relanceClicked }
                                closeModal={ closeModal }
                                array={ arrayRelance }
                                setArray={ setArrayRelance }
                                action={ "validated" }
                                request={ request }
                            />
                        )
                        ||
                        // Restauration
                        ( showModalRestored &&
                            <ModalRelanceAction
                                relanceClicked={ relanceClicked }
                                closeModal={ closeModal }
                                array={ arrayRelance }
                                setArray={ setArrayRelance }
                                action={ "restored" }
                            />
                        )
                        ||
                        // Suppression
                        ( showModalDeleted &&
                            <ModalRelanceAction
                                relanceClicked={ relanceClicked }
                                closeModal={ closeModal }
                                array={ arrayRelance }
                                setArray={ setArrayRelance }
                                action={ "deleted" }
                            />
                        )
                    }
                    closeButton={ closeModal }
                />
            ) }
            {loading && <Spinner />}
        </RelanceContainerStyle>

    )
}

export default RelanceContainer;