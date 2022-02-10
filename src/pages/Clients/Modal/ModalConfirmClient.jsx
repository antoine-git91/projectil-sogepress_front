import ModalHeader from "../../../components/Modal/parts/ModalHeader";
import ModalBody from "../../../components/Modal/parts/ModalBody";
import React, {Fragment} from "react";
import ModalFooter from "../../../components/Modal/parts/ModalFooter";
import Flexbox from "../../../templates/Flexbox";
import {ButtonPrimary, ButtonSecondary} from "../../../utils/styles/button";
import Modal from "../../../components/Modal/Modal";

const ModalConfirmClient = (
    {
        postRequest,
        field,
        clientStatut,
        ville,
        villeDelivery,
        deliveryAddress,
        billType,
        contacts,
        contactCommentaire,
        typeContact,
        potentialities,
        closeModal,
        confirmFor
    } ) => {

    return (
        <Modal closeModal={closeModal} justify={"center"} align={"center"}>
            <ModalHeader>
                {
                    confirmFor === "client"
                        ? <h1>Souhaitez-vous créer ce client ?</h1>
                        : <h1>Souhaitez-vous modifier ce client ?</h1>
                }
                <p>Vérifier les informations saisies avant de confirmer</p>
            </ModalHeader>
            <ModalBody overflowScrollY={"scroll"}>
                <p>Statut du client: <span>{ clientStatut.value === "prospect" ? "Prospect" : "Acquis" }</span></p>
                <p>Nom: <span>{ field.client_name ? field.client_name : "Non communiqué" }</span></p>
                <p>Activité: <span>{  field.client_ape ? field.client_ape + " - " + document.querySelector('input[name="client_activite"]').value : "Non communiqué" }</span></p>
                <h2>Coordonnées</h2>
                <p>Mail: <span>{ field.client_mail ? field.client_mail : "Non communiqué" }</span></p>
                <p>Téléphone: <span>{ field.client_phone ? field.client_phone : "Non communiqué" }</span></p>
                <p>Adresse: <span>{ field.client_street_number && field.client_street_wayType && field.client_street_name && field.client_street_codePostal && ville ? field.client_street_number + " " + field.client_street_wayType + " " + field.client_street_name + " " + field.client_street_codePostal + " " + ville.valueDisplay : "Non communiqué" }</span></p>
                <p>Site internet: <span>{ field.client_website ? field.client_website : "Non communiqué" }</span></p>
                <h2>Adresse de livraison</h2>
                <p>Adresse de Livraison: <span>{ deliveryAddress.value === "true" && field.client_street_number_delivery && field.client_street_wayType_delivery && field.client_street_name_delivery && field.client_street_codePostal_delivery && villeDelivery.valueDisplay ? field.client_street_number_delivery + " " + field.client_street_wayType_delivery + " " + field.client_street_name_delivery + " " + field.client_street_codePostal_delivery + " " + villeDelivery.valueDisplay : "Identique à l'adresse de facturation" }</span></p>
                <h2>Choix de la facturation</h2>
                <p>type de facturation: <span>{ billType.value === "mail" ? "Mail" : "Courrier" }</span></p>
                <h2>Contacts</h2>
                {
                    contacts.length > 0 ? contacts.map((contact, index) =>{
                            return (
                                <Fragment key={index}>
                                    <h3>Contact { index + 1 }</h3>
                                    <p>Nom et Prénom: <span>{ contact.nom + " " + contact.prenom }</span></p>
                                    <p>Fonction: <span>{contact.fonction }</span></p>
                                    <p>Email: <span>{ contact.mail }</span></p>
                                    <p>Téléphone: <span>{ contact.tel }</span></p>
                                </Fragment>
                            )
                        }
                    ) : "Aucun contact"
                }
                { confirmFor === "client" &&
                    <>
                        <h2>Commentaire</h2>
                        <p>Contact: <span>{ contactCommentaire.valueDisplay ? contactCommentaire.valueDisplay : "Non communiqué" }</span></p>
                        <p>Type de contact: <span>{ typeContact.valueDisplay ? typeContact.valueDisplay : "Non communiqué" }</span></p>
                        <p>Commentaire: <span>{ field.commentaire ? field.commentaire : "Non communiqué" }</span></p>
                    </>
                }
                <h2>Indice de Potentialité</h2>
                {
                    potentialities.length > 0 ? potentialities.map(( potentiality, index ) => {
                        return (
                            <Fragment key={index}>
                                <p>{ index + 1 }: <span>{ potentiality.type.valueDisplay + " " + (potentiality.magazine.valueDisplay !== undefined ? "/ " + potentiality.magazine.valueDisplay : "") }</span></p>
                            </Fragment>
                        )
                    }) : "Aucune potentialité"
                }
            </ModalBody>
            <ModalFooter>
                <Flexbox justify={ "center" }>
                    <ButtonSecondary onClick={ closeModal }>Annuler</ButtonSecondary>
                    <ButtonPrimary margin={"0 0 0 20px"} type="submit" onClick={postRequest}>Oui, je souhaite créer ce client</ButtonPrimary>
                </Flexbox>
            </ModalFooter>
        </Modal>
    )
}

export default ModalConfirmClient;