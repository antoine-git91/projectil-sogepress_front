import ModalHeader from "../../../components/Modal/parts/ModalHeader";
import ModalBody from "../../../components/Modal/parts/ModalBody";
import React, {Fragment} from "react";
import ModalFooter from "../../../components/Modal/parts/ModalFooter";
import Flexbox from "../../../templates/Flexbox";
import {ButtonPrimary, ButtonSecondary} from "../../../utils/styles/button";
import {SectionForm} from "../../Clients/CreateClient";
import styled from "styled-components";


/*
*   title : inputState.commande_name,
    type_commande: typeCommande.value,
    statut: selectStatusesCommande.valueDisplay,
    client: selectClient.valueDisplay,
    contact: selectContactClient.valueDisplay,
    type_produit: typeProduit.value,
    support_communication: typeSupport.value,
    commentaire : inputState.commentaire_commande,
    date: dateIsoFormated(new Date(inputState.delivery_date)),
    price: inputState.bill,
    reduction: inputState.reduction_bill
    *
    * # Print
    type_print: typePrint.value,
    print_quantity: inputState.number_prints
    *
    * # Web
    type_web: typeWeb.value
    address_website: inputState.website_adresse,
    server: inputState.server_name
    *
    * # Contenu
    type_contenu : typeContenu.value,
    number_feuillets : inputState.number_feuillets
    *
    * # Community
    number_posts : inputState.number_posts
    *
    * # Edition magazine
    magazine_name: selectMagazineTypeCommunication.valueDisplay,
    magazine_extension: inputState.magazine_extension,
    number_pages: inputState.magazine_number_pages,
    magazine_quantity: inputState.magazine_number_items
    * # Regie
    magazine_choice: selectMagazineTypeRegie.valueDisplay,
    extension_choice: selectEditionMagazine.valueDisplay,
    place_choice: placeEncart.value,
    encart_choice: formatEncart.value
* */

const Commentaire = styled.p`
  width: 500px;
  line-height: 1.3;
  
  span{
    font-weight: normal;
    display: block;
  }
`

const ModalConfirmCommande = (
    {
        closeModal,
        confirmFor,
        postRequest,
        summary
    } ) => {

    const contratName = (type) => {
        let name;

        // Website
        if(type === "create_site"){
             name = "Création de site";
        } else if(type === "maintenance"){
             name = "Maintenance";
        } else if(type === "hebergement"){
             name = "Hébergement";
        }
        // Contenu
        else if(type === "web"){
            name = "Web";
        } else if(type === "print"){
            name = "Print";
        }
        // Print
        else if(type === "flyer"){
            name = "Flyer";
        } else if(type === "autocollant") {
            name = "Autocollant";
        }
        // Regie
        else if (type === "cover"){
            name = "Première couverture";
        } else if (type === "cover_second"){
            name = "2ème de couverture";
        } else if (type === "cover_third"){
            name = "3ème de couverture";
        } else if (type === "cover_last"){
            name = "4ème de couverture";
        } else {
            name = "Intérieur";
        }

        return  name;
    };

    return(
        <>
            <ModalHeader>
                {
                    confirmFor === "commande_create"
                        ? <h1>Souhaitez-vous créer cette commande ?</h1>
                        : <h1>Souhaitez-vous modifier cette commande ?</h1>
                }
                <p>Vérifier les informations saisies avant de confirmer</p>
            </ModalHeader>
            <ModalBody overflowScrollY={"scroll"}>

                <SectionForm>
                    <p>Titre de la commande : {  summary.title }</p>
                    <p>Type de la commande : {  summary.type_commande === "new_order" ? "Nouvelle commande" : "Renouvellement" }</p>
                    <p>Statut de la commande : { summary.statut }</p>
                    <p>Client : { summary.client }</p>
                    <p>Contact par défault : { summary.contact }</p>
                    <p>Type de produit : { summary.type_produit === "communication" ? "Communication" : "Régie" }</p>
                </SectionForm>
                <SectionForm>
                    {
                        summary.type_produit === "communication" ? (
                                <>
                                    {
                                        summary.support_communication === "print" && (
                                            <>
                                                <h2>Produit imprimé</h2>
                                                <p>Type de produit : { contratName(summary.type_print) }</p>
                                                <p>Nombre d'exemplaires : { summary.print_quantity }</p>
                                            </>
                                        )
                                    }
                                    {
                                        summary.support_communication === "web" && (
                                            <>
                                                <h2>Site Internret</h2>
                                                <p>Type de contrat : { contratName(summary.type_web) }</p>
                                                <p>Adresse du site web : { summary.address_website }</p>
                                                <p>Serveur : { summary.server }</p>
                                            </>
                                        )
                                    }
                                    {
                                        summary.support_communication === "magasine" && (
                                            <>
                                                <h2>Edition magazine</h2>
                                                <p>Nom du magazine : { summary.magazine_name }</p>
                                                <p>Enxtension du magazine : { summary.magazine_extension }</p>
                                                <p>Nombre de page : { summary.number_pages }</p>
                                                <p>Quantités : { summary.magazine_quantity }</p>
                                            </>
                                        )
                                    }
                                    {
                                        summary.support_communication === "contenu" && (
                                            <>
                                                <h2>Régie</h2>
                                                <p>Type de contenu : { contratName(summary.type_contenu) }</p>
                                                <p>Nombre de feuillets : { summary.number_feuillets }</p>
                                            </>
                                        )
                                    }
                                    {
                                        summary.support_communication === "social" && (
                                            <>
                                                <h2>Community Management</h2>
                                                <p>Nombre de posts : { summary.number_posts }</p>
                                            </>
                                        )
                                    }
                                </>
                            )
                            : (
                                <>
                                    <h2>Régie</h2>
                                    <p>Choix du magazine : { summary.magazine_choice}</p>
                                    <p>Choix de l'édition : { summary.extension_choice}</p>
                                    <p>Choix de l'emplacement : { contratName(summary.place_choice)}</p>
                                    <p>Choix de l'encart : { summary.encart_choice}</p>
                                </>
                            )
                    }
                </SectionForm>
                <SectionForm>
                    <Commentaire>Commentaire: <span>{ summary.commentaire }</span></Commentaire>
                </SectionForm>
                <SectionForm>
                    <p>Date d'échéance: {summary.date}</p>
                </SectionForm>
                <SectionForm>
                    <p>Prix : { summary.price }</p>
                    <p>Réduction : { summary.reduction ? summary.reduction : 0 }</p>
                    <p>Total : { summary.price - (summary.reduction ? summary.reduction : 0) }</p>
                </SectionForm>
            </ModalBody>
            <ModalFooter>
                <Flexbox justify={ "center" }>
                    <ButtonSecondary onClick={ closeModal }>Annuler</ButtonSecondary>
                    <ButtonPrimary margin={"0 0 0 20px"} type="submit" onClick={postRequest}>Oui, je souhaite créer cette commande</ButtonPrimary>
                </Flexbox>
            </ModalFooter>
        </>
    )
}
export default ModalConfirmCommande;