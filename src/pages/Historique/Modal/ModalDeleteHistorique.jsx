import React, {useContext, useEffect} from "react";
import ModalHeader from "../../../components/Modal/parts/ModalHeader";
import ModalBody from "../../../components/Modal/parts/ModalBody";
import Flexbox from "../../../templates/Flexbox";
import {ButtonPrimary, ButtonSecondary} from "../../../utils/styles/button";
import {AddressServer} from "../../App";
import Spinner from "../../../components/Spinner";
import {SuccessResponse} from "../../Actions/modals/ModalRelanceAction";
import {useFetchDelete} from "../../../utils/misc/fetch/useFetchDelete";
import {dateIsoFormated} from "../../../utils/misc/Function";
import styled from "styled-components";
import Modal from "../../../components/Modal/Modal";

const InfoHistorique = styled.div`
  margin-bottom: 30px;
`

const ModalDeleteHistorique = ( { closeModal, request, historique } ) => {

    const { load, loading, response } = useFetchDelete( useContext(AddressServer) + "/api/historique_clients/" + historique.id );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        load();
    };

    useEffect( () => {
        if(response === 204) {
            setTimeout(() => {
                closeModal()
            }, 1500);
            setTimeout(() => {
                request();
            }, 1500)
        }
    } );


    return (
        <Modal closeModal={closeModal}>
            <ModalHeader>
                <h1>Voulez vous supprimer cet historique ?</h1>
            </ModalHeader>
                <ModalBody justify={"center"} align={"center"}>
                    { (!loading && !response) &&
                        <form onSubmit={ ( e ) => { handleSubmit( e ) } }>
                            <InfoHistorique>
                                <p>Créé le : { dateIsoFormated(historique.createdAt) }</p>
                                <p>Commentaire associé : { historique.commentaire }</p>
                                <p>Type de contact : { historique.typeHistorique && historique.typeHistorique.libelle }</p>
                                <p>Contact : { historique.contact && historique.contact.fullname }</p>
                            </InfoHistorique>
                            <Flexbox>
                                <ButtonSecondary onClick={closeModal}>Non, retour</ButtonSecondary>
                                <ButtonPrimary type={"submit"}>Oui, je supprime</ButtonPrimary>
                            </Flexbox>
                        </form>
                    }
                    { loading && <Spinner /> }
                    { response === 204 && <SuccessResponse>L'historique a bien été supprimé</SuccessResponse>}
                </ModalBody>

        </Modal>
    )
}
export default ModalDeleteHistorique;