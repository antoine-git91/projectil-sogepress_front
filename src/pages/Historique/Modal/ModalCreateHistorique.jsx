import React, {useContext, useEffect, useState} from "react";
import ModalHeader from "../../../components/Modal/parts/ModalHeader";
import ModalBody from "../../../components/Modal/parts/ModalBody";
import Flexbox from "../../../templates/Flexbox";
import {ButtonPrimary, ButtonSecondary} from "../../../utils/styles/button";
import InputSelect from "../../../components/Form/InputSelect";
import {useFetchGet} from "../../../utils/misc/fetch/useFetchGet";
import InputGroupRadio from "../../../components/Form/radio/InputGroupRadio";
import InputTextArea from "../../../components/Form/InputTextArea";
import {useFetchPost} from "../../../utils/misc/fetch/useFetchPost";
import {AddressServer, UserContext} from "../../App";
import Spinner from "../../../components/Spinner";
import {SuccessResponse} from "../../Actions/modals/ModalRelanceAction";
import Modal from "../../../components/Modal/Modal";

const ModalCreateHistorique = ( { closeModal, idClient, idCommande, request, historiqueClient, historiqueCommande } ) => {

    const meUser = useContext(UserContext);

    const [ commentaire, setCommentaire ] = useState("");
    const [ contactSelected, setContactSelected ] = useState({value: "", id: ""});
    const [ selectContactType, setSelectContactType ] = useState({ "value": "Telephone", "id": 1 }  );
    const [ body, setBody] = useState({});

    const { items: contacts, load: loadContacts, loading: loadingContacts } = useFetchGet(useContext(AddressServer) + "/api/contactsByClient/" + idClient);
    const { items: typeHistorique, load: loadTypeHistorique, loading: loadingTypeHistorique } = useFetchGet(useContext(AddressServer) + '/api/type_historiques' );
    const { success, error, loading : loadingPostHistorique, post} = useFetchPost( useContext(AddressServer) + "/api/historique_clients", body );

    // On génère un body de données suivant la nature de l'historique
    useEffect( () => {
        historiqueClient && setBody(
            {
                "commentaire": commentaire,
                "client": "api/clients/" + idClient,
                "contact": "api/contacts/" + contactSelected.value,
                "user": "api/users/" + meUser.id,
                "typeHistorique": "api/type_historiques/" + selectContactType.id
            }
        );

        historiqueCommande && setBody( {
            "commentaire": commentaire,
            "client": "api/clients/" + idClient,
            "contact": "api/contacts/" + contactSelected.value,
            "user": "api/users/" + meUser.id,
            "commande": "api/commandes/" + idCommande,
            "typeHistorique": "api/type_historiques/" + selectContactType.id
        });
    }, [historiqueClient, commentaire, idClient, contactSelected.value, meUser.id, selectContactType.id, historiqueCommande, idCommande]);

    useEffect( () => {
        loadContacts()
    }, [ loadContacts ] );

    useEffect( () => {
        loadTypeHistorique()
    }, [ loadTypeHistorique ] );


    const handleSubmit = ( e ) => {
        e.preventDefault();
        post();
    };

    useEffect( () => {
        if (success.id) {
            setTimeout(() => {
                closeModal()
            }, 1500);
            setTimeout(() => {
                request();
            }, 2000)
        }
    });


    return (
        <Modal closeModal={ closeModal }>
            <ModalHeader>
                <h1>Création d'un nouvel historique</h1>
            </ModalHeader>
                <ModalBody justify={"center"} align={"center"}>
                    { (!loadingContacts && !loadingTypeHistorique && !loadingPostHistorique) && !success.id && (
                        <form onSubmit={ ( e ) => { handleSubmit( e ) } }>
                            <InputGroupRadio
                                label={"Type de contact"}
                                name={"type_contact_historique"}
                                data={ typeHistorique && typeHistorique.map( ( type, key ) => ( { id : key, value : type.libelle, label: type.libelle } ) ) }
                                selected={ selectContactType }
                                setRadioChecked={ setSelectContactType }
                            />
                            <InputSelect
                                label={ "Choix du contact" }
                                name={ "contact_historique" }
                                selectValue={ contactSelected }
                                setSelectValue={ setContactSelected }
                                option={ "Contact" }
                                optionValue={ "" }
                                data={contacts && contacts.map( ( contact, key ) => ({ id : key + contact.id, value : contact.id, valueDisplay: contact.fullname }) ) }
                            />
                            <InputTextArea
                                commentaireRows={15}
                                commentaireCols={100}
                                label={"Commentaire"}
                                name={"commentaire_historique"}
                                value={commentaire}
                                onChange={ (e) => setCommentaire(e.target.value) }
                                placeholder={"Saisissez le texte de l'historique"}
                            />
                            <Flexbox justify={"center"}>
                                <ButtonSecondary onClick={ closeModal }>Annuler</ButtonSecondary>
                                <ButtonPrimary type={"submit"}>Valider l'historique</ButtonPrimary>
                            </Flexbox>
                        </form>
                    )}
                    { (loadingContacts || loadingTypeHistorique || loadingPostHistorique) && <Spinner /> }
                    { success.id && <SuccessResponse>L'historique a bien été ajouté</SuccessResponse>}
                </ModalBody>

        </Modal>
    )
}
export default ModalCreateHistorique;