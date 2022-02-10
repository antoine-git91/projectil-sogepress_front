import styled from "styled-components";
import checkSuccess from "../../../assets/images/check_success.png";
import checkError from "../../../assets/images/check_error.png";
import {useFetchDelete} from "../../../utils/misc/fetch/useFetchDelete";
import {useFetchPatch} from "../../../utils/misc/fetch/useFetchPatch";
import React, {useContext, useEffect, useState} from "react";
import ModalHeader from "../../../components/Modal/parts/ModalHeader";
import ModalBody from "../../../components/Modal/parts/ModalBody";
import {getType} from "../../../utils/misc/commandes/functions";
import Flexbox from "../../../templates/Flexbox";
import {ButtonPrimary, ButtonSecondary} from "../../../utils/styles/button";
import Spinner from "../../../components/Spinner";
import Modal from "../../../components/Modal/Modal";
import {useHistory} from "react-router-dom";
import {AddressServer} from "../../App";

export const SuccessResponse = styled.p`
  &:before{
    content: url(${checkSuccess});
    display: block;
    text-align: center;
    margin-bottom: 30px;
  }
`
export const ErrorResponse = styled.p`
  &:before{
    content: url(${checkError});
    display: block;
    text-align: center;
    margin-bottom: 30px;
  }
`

const InfoRelance = styled.div`
 margin-bottom: 50px;
  text-align: left;
  
  p{
    font-size: 20px;
    line-height: 1.4;
  }
`

const ModalRelanceAction = ({ relanceClicked, closeModal, action, request }) => {

    const history = useHistory();
    // Delete
    const {
        load: loadDeleted,
        response: responseDeleted
    } = useFetchDelete(useContext(AddressServer) +"/api/relances/" + relanceClicked.id);

    //Restore
    const {
        success: successRestored,
        error : errorRestored,
        responseStatut: responseStatusRestored,
        post: patchRelanceRestored
    } = useFetchPatch(
        useContext(AddressServer) +"/api/relances/" + relanceClicked.id,
        { "status": "/api/relance_statuses/1" }
    );

    //Validate
    const {
        success: successValidated,
        error : errorValidated,
        responseStatut: responseStatusValidated,
        post: patchRelanceValidated
    } = useFetchPatch(
        useContext(AddressServer) + "/api/relances/" + relanceClicked.id,
        { "status": "/api/relance_statuses/2" }
    );

    // On regroupe les loading et les reponses des statut des différntes requêtes pour l'affichage de la modale
    const [ loading, setLoading ] = useState(false);
    const [ response, setResponse ] = useState(0);
    const [ responseSentence, setresponseSentence ] = useState("");
    const [ errorObject, setErrorObject ] = useState({});

    // On check l'action et sa réponse pour gérer l'affichage
    useEffect( () => {
        if(action ==="deleted"){
            if(responseDeleted === 204){
                setResponse(204);
                setresponseSentence("La relance à bien été supprimée")
                setTimeout(() => {
                    closeModal();
                }, 2000);
                setTimeout(() => {
                    request ? request() : history.goBack();
                }, 2500);
                setLoading(false);
            }
        } else {
            if (action === "restored"){
                if(successRestored.id){
                    setresponseSentence("La relance à bien été restaurée")
                    setResponse(200);
                    setTimeout(() => {
                        request && request();
                    }, 2500);
                } else {
                   setErrorObject(errorRestored);
                }
            } else {
                if(successValidated.id){
                    setresponseSentence("La relance à bien été validée")
                    setResponse(200);
                    setTimeout(() => {
                        request && request();
                    }, 2500);
                } else {
                    setErrorObject(errorValidated);
                }
            }
            setLoading(false);
            if( (responseStatusRestored === 200) || ( responseStatusValidated === 200 ) ) {
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }
        }
    }, [
        action,
        responseStatusValidated,
        responseStatusRestored,
        responseDeleted,
        successRestored.id,
        successValidated.id,
        relanceClicked.id,
        closeModal,
        responseDeleted,
        errorObject,
        errorRestored,
        errorValidated
    ] );

    const deleteItem = () => {
        loadDeleted();
        setLoading(true);
    };

    const restoreRelance = () => {
        patchRelanceRestored();
        setLoading(true);
    };

    const valideRelance = () => {
        patchRelanceValidated();
        setLoading(true);
    };


    return(
        <Modal closeModal={closeModal} justify={"center"} align={"center"}>
            <ModalHeader>
                { action === "deleted" && <h1>Souhaitez vous supprimer cette relance ?</h1> }
                { action === "restored" && <h1>Souhaitez vous restaurer cette relance ?</h1> }
                { action === "validated" && <h1>Souhaitez vous valider cette relance ?</h1> }
            </ModalHeader>
            <ModalBody justify={"center"} align={"center"}>
                { Object.keys(errorObject).length <= 0
                    ? (
                         ( ( !loading && response === 0 ) &&
                             (
                                <>
                                    <InfoRelance>
                                        <p>Titre de la relance: <span>{relanceClicked.objet}</span></p>
                                        <p>Type de relance: <span>{relanceClicked.typeRelance === 0 ? "Prospection" : "Commande en cours" }</span></p>
                                        <p>Client: <span>{relanceClicked.client.raisonSociale}</span></p>
                                        <p>Commande: <span>{getType(relanceClicked.commande)}</span></p>
                                    </InfoRelance>
                                    <Flexbox justify={"center"}>
                                        <ButtonSecondary onClick={ () => closeModal() }>Non, retour aux relances</ButtonSecondary>
                                        { action === "deleted" && <ButtonPrimary onClick={deleteItem}>Oui, je supprime cette relance</ButtonPrimary> }
                                        { action === "restored" && <ButtonPrimary onClick={ restoreRelance }>Oui, je restaure cette relance</ButtonPrimary> }
                                        { action === "validated" && <ButtonPrimary onClick={ valideRelance }>Oui, je valide cette relance</ButtonPrimary> }
                                    </Flexbox>
                                </>
                             )
                         )
                         ||  (loading && <Spinner />)
                         || (response !== 0 && <SuccessResponse>{responseSentence}</SuccessResponse>)
                    )
                    : Object.keys(errorObject).length > 0 && <ErrorResponse>{errorObject["hydra:title"]} <br/> {errorObject["hydra:description"]} <br/> Veuillez rééssayer ou recharger la page.</ErrorResponse>
                }

            </ModalBody>
        </Modal>
    )
}
export default ModalRelanceAction;