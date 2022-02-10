import React, {useEffect, useReducer, useState, useContext} from "react";
import Flexbox from "../../templates/Flexbox";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import MainContainer from "../../templates/Container";
import ContactBlock from "../../components/Clients/ContactBlock";
import InputSelect from "../../components/Form/InputSelect";
import BtnAjout from "../../components/btn_ajout";
import {ButtonPrimary, ButtonReturn} from "../../utils/styles/button";
import styled from "styled-components";
import {handleChangeInput} from "../../utils/misc/input/inputChange";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import InputTextArea from "../../components/Form/InputTextArea";
import TablePotentiality from "../../components/table/TablePotentiality";
import {useFetchPost} from "../../utils/misc/fetch/useFetchPost";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal/Modal";
import ModalConfirmClient from "./Modal/ModalConfirmClient";
import InputText from "../../components/Form/InputText";
import {AddressServer, UserContext} from "../App";
import {addContact, insertDataFromChild, removeContact} from "../../utils/misc/ContactBlock/functions";
import {addPotentiality, removePotentiality} from "../../utils/misc/Potentialities/fonctions";
import ModalResponse from "../../components/Modal/ModalResponse";
import {useHistory} from "react-router-dom";
import DivButtonAction from "../../utils/styles/DivButton";

const GroupList = styled.ul`
  margin-left: 0;
  padding-left: 0;
`

const CommentaireBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  
  & div:last-child{
    width: 75%;
  }
`

export const SectionForm = styled.div`
  background-color: #fff4ee;
  min-width: 500px;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`

const CreateClient = ( { loadNumberClients } ) => {

    const meUser = useContext(UserContext);
    const history = useHistory();

    /* On initialise les input text simple */
    const [ inputState, setInputState ] = useReducer(
        ( state, newState ) => ( { ...state, ...newState } ),
        {
            client_name: "",
            client_ape: "",
            client_phone: "",
            client_mail: "",
            client_street_number: "",
            client_street_wayType: "",
            client_street_name: "",
            client_street_codePostal: "",
            client_website: "",
            client_street_number_delivery: "",
            client_street_wayType_delivery: "",
            client_street_name_delivery: "",
            client_street_codePostal_delivery: ""
        }
    )


    /* --- Statut Client --- */
    const [ clientStatut, setClientStatut ] = useState(  { "value":"prospect", "id": 1 } );

    /* --- Activites --- */
    /* Input Activite libelle */
    const[ activite, setActivite ] = useState('' );
    /* On remplace le point du code APE pour être conforme */
    const codeApe = inputState.client_ape.replace(".", "" );

    /* --- Villes --- */
    /* a - villes Adresse principale client */
    const[ villes, setVilles ] = useState([] );
    /* On récupère la ville selectionnée pour adresse principale */
    const [ selectVilles, setSelectVilles ] = useState({ value: "", valueDisplay: "" } );
    /* Tag Select Disabled */
    const [ disabledSelectVilles, setDisabledSelectVilles ] = useState(true );

    /* b - villes de livraison client */
    const [ hasDeliveryAddress, setHasDeliveryAddress ] = useState(  { "value": "no", "id": 1 } );
        /* Requête pour avoir les villes par raport au code postal */
    const[ villesDelivery, setVillesDelivery ] = useState([] );

    /* Si adresse de livraison : Select villes suivant le code postal */
    /* On récupère la ville selectionnée pour Adresse de livraison */
    const [ selectVillesDelivery, setSelectVillesDelivery ] = useState({ value: "", valueDisplay: "" } );
    const [ disabledSelectVillesDelivery, setDisabledSelectVillesDelivery ] = useState(true );
    const [ arrayAdressesClient, setArrayAdressesClient ] = useState([
        {
            "numero": "",
            "typeVoie": "",
            "nomVoie": "",
            "ville": "",
            "statutAdresse": true
        }
    ]);

    /* --- Contacts ---- */
    /* tableau des contacts du clients*/
    const [ arrayContact, setArrayContact ] = useState([] );

    /* --- Contact historique --- */
    /* On récupère la donnée voulue du select contact historique */
    const [ selectContact, setSelectContact ] = useState({ "value": "", "valueDisplay": "" } );
    /* Pour gérer l'acces au select de contact historique */
    const [ disabledSelectContact, setDisabledSelectContact ] = useState(true );
    /* On récupère le type d'historique choisi dans le select */
    const [ selectContactType, setSelectContactType ] = useState({ "value": "", "valueDisplay": "" } );
    const [ fullContactSelected, setFullContactSelected ] = useState({} );

    /* --- Commentaire --- */
    const [ hasCommentaire, setHasCommentaire ] = useState({ "value": "no", "id": 1 } );

    /* --- Facturation --- */
    const [ billType, setBillType ] = useState({ "value": "mail", "id": 1 } );

    /* --- Potentialités --- */
    /* Affichage des potentialité en Front */
    const [ dataPotentiality, setDataPotentiality ] = useState([] );
    /* Données des potentialités pour persister en BDD */
    const [ potentialitePost, setPotentialityPost ] = useState([] );
    /* Pour récupérer l'option sélectionnée */
    const [ selectPotentialityType, setSelectPotentiaityType ] = useState({ "value": "", "valueDisplay": "" } );


    /* Magazines */
    /* On lance une requête pour récupérer les magazines si potentialitiesType === Régie */
    const [ selectMagazine, setSelectMagazine ] = useState({ "value": "", "valueDisplay": "" } );
    const [ disabledSelectMagazine, setDisabledSelectMagazine ] = useState(true );

    /* Modal */
    const [ showModalConfirm, setShowModalConfirm ] = useState(false );

    /* Formulaire Validation */
    const [ fieldsRequired, setFieldsRequired ] = useState();


    /* Requests */
    const { items : activiteClient, loading: loadingActivite, load: loadActivite } = useFetchGet(useContext(AddressServer) + '/api/naf_sous_classes/' + codeApe );
    const {items: villesClient, load: loadVilles, loading: loadingVilles } = useFetchGet(useContext(AddressServer) + '/api/villesByCp/' + inputState.client_street_codePostal );
    const { items: villesClientDelivery, load: loadVillesDelivery, loading: loadingVillesDelivery } = useFetchGet(useContext(AddressServer) + '/api/villesByCp/' + inputState.client_street_codePostal_delivery );
    const { items: typeHistorique, load: loadTypeHistorique, loading: loadingTypeHistorique } = useFetchGet(useContext(AddressServer) + '/api/type_historiques' );
    /* On lance une requête pour récupérer les types de potentialités */
    const{ items: potentialitiesTypes, loading: loadingPotentialities, load: loadPotentialities } = useFetchGet(useContext(AddressServer) + '/api/type_potentialites' );
    const { items: magazines, load: loadMagazines, loading: loadingMagazines }=  useFetchGet(useContext(AddressServer) + '/api/magazines' );


    /* --- POST --- */
    /* Etape 1: POST CLIENT */
    const { success: successPostClient, error: postClientError, post: postClient , loading: loadingPostClient, responseStatut } = useFetchPost(
        useContext(AddressServer) + '/api/clients',
        {
            "raisonSociale": inputState.client_name,
            "statut": clientStatut === "client_validated",
            "telephone": inputState.client_phone,
            "email": inputState.client_mail,
            "siteInternet": inputState.client_website,
            "typeFacturation": billType === "post",
            "nafSousClasse": "/api/naf_sous_classes/" + codeApe,
            "adresse": arrayAdressesClient,
            "contacts": arrayContact,
            "potentialites": potentialitePost,
            "user": "/api/users/" + meUser.id
        }
    )

    const { post: postHistorique, loading: loadingHistorique, success: successHistorique, error: errorHistorique, responseStatut: responseStatutHistorique} = useFetchPost(
        useContext(AddressServer) + '/api/historique_clients',
        {
            "commentaire": inputState.commentaire,
            "user": "/api/users/" + meUser.id,
            "client": "/api/clients/" + successPostClient.id,
            "typeHistorique": "/api/type_historiques/" + selectContactType.value,
            "contact": !disabledSelectContact ? "/api/contacts/" + fullContactSelected.id : null
        })

    /* Étape 2: POST HISTORIQUE */
    useEffect(() => {
        if( hasCommentaire.value === "yes" && successPostClient.id ) {
            postHistorique();
        }
    }, [ hasCommentaire, successPostClient.id ] );


    /* Récupère le libelle du code NAF */
    useEffect(() => {
        const valueLength = inputState.client_ape.length;
        if( valueLength === 6 ){
            loadActivite();
        }
        else if( valueLength < 6 ){
            setActivite( "" );
        }
    }, [ inputState.client_ape ]);

    /* Inscription de l'activité dans le champ activité */
    useEffect(() => {
        setActivite( activiteClient.libelle );
    }, [ activiteClient ] );

    //Adresse client
    // Load Ville Adresse principale
    useEffect( () => {
        if( inputState.client_street_codePostal.length === 5 ){
            setTimeout(() => {
                loadVilles();
                setDisabledSelectVilles( false );

            }, 300 );
        }
        if( inputState.client_street_codePostal.length === 0 ){
            setVilles( [] );
            setDisabledSelectVilles( true );
        }
    }, [inputState.client_street_codePostal]);

    // Mise à jour des donnée Adresse principale
    useEffect(() => {
        arrayAdressesClient[ 0 ] = {
            "numero" : inputState.client_street_number,
            "typeVoie" : inputState.client_street_wayType,
            "nomVoie" : inputState.client_street_name,
            "ville" : "/api/villes/" + selectVilles.value,
            "statutAdresse" : true
        }
    }, [ arrayAdressesClient, inputState.client_street_number, inputState.client_street_wayType, inputState.client_street_name, selectVilles.value ]);

    // Load Ville Adresse livraison
    useEffect( () => {
        if( inputState.client_street_codePostal_delivery.length === 5 ){
            setTimeout(() => {
                loadVillesDelivery();
                setDisabledSelectVillesDelivery( false );

            }, 300 );
        }
        if( inputState.client_street_codePostal_delivery.length === 0 ){
            setVillesDelivery( [] );
            setDisabledSelectVillesDelivery( true );
        }
    }, [inputState.client_street_codePostal_delivery]);

    // Si adresse de livraison : on enrichi le tableau "arrayAdressesClient" d'un nouvel objet avec des valeurs vides
    // Sinon : on supprime l'objet créé
    useEffect(() => {
        if( hasDeliveryAddress.value === "yes" ){
            setArrayAdressesClient( arrayAdressesClient.concat(
                {
                    "numero": "",
                    "typeVoie": "",
                    "nomVoie": "",
                    "ville": "",
                    "statutAdresse": null
                }
            ) )

        } else if( hasDeliveryAddress.value === "no" ){
            if( arrayAdressesClient[ 1 ] ) {
                setInputState({
                    client_street_number_delivery: "",
                    client_street_wayType_delivery: "",
                    client_street_name_delivery: "",
                    client_street_codePostal_delivery: "",
                });
                arrayAdressesClient.pop();
                setVillesDelivery([] );
                setDisabledSelectVillesDelivery(true );
                setArrayAdressesClient( arrayAdressesClient );
            }
        }
    }, [ hasDeliveryAddress.value, arrayAdressesClient ] );

    // Mise à jour des données Adresse livraison
    useEffect(() => {
        if(arrayAdressesClient[ 1 ]) {
            arrayAdressesClient[ 1 ] = {
                "numero" : inputState.client_street_number_delivery,
                "typeVoie" : inputState.client_street_wayType_delivery,
                "nomVoie" : inputState.client_street_name_delivery,
                "ville" : "/api/villes/" + selectVillesDelivery.value,
                "statutAdresse" : false
            }
            setArrayAdressesClient( arrayAdressesClient );
        }
    }, [ arrayAdressesClient, inputState.client_street_number_delivery, inputState.client_street_wayType_delivery, inputState.client_street_name_delivery, selectVillesDelivery.value ] );


    /* Mise à jour du state */
    useEffect(() => {
        setVilles( villesClient );
    }, [ villesClient ] );

    /* Mise à jour du state */
    useEffect(() => {
        setVillesDelivery( villesClientDelivery );
    }, [ villesClientDelivery ] );
    /* ################# */

    /* COMMENTAIRE */
    useEffect(() => {
        loadTypeHistorique()
    }, [ loadTypeHistorique ] );

    // On verifie si tous les champs de nouveaux contact sont saisis
    // pour enrichir le select de liste de contacts si Ajout de commentaire
    useEffect( () => {
        if(arrayContact.length > 0 ){
            arrayContact.forEach( el => {
                let count = 0;
                for( let items in el ){
                    if( el[ items ].length > 2 ){
                        count++
                        if( count === 5 ){
                            setDisabledSelectContact(false );
                        }
                    } else {
                        setDisabledSelectContact(true );
                    }
                }
            } )
        } else {
            setDisabledSelectContact(true );
        }
    } );


    /* POTENTIALITÉS */
    /* 1 - Potentialités types */
    useEffect(() => {
        loadPotentialities();
    }, [ loadPotentialities ] );


    /* Si le type de potentialités est de type Régie */
    useEffect(() => {
        if ( selectPotentialityType.valueDisplay === "Régie" ){
            setDisabledSelectMagazine(false );
            loadMagazines();
        } else {
            setDisabledSelectMagazine(true );
            setSelectMagazine({ "value": "", "valueDisplay": "" } );
        }
    }, [ selectPotentialityType, loadMagazines ] );

    /* On cherche une correspondance entre l'option choisie et la réponse du tableau de contact du client */
    useEffect(() => {
        successPostClient.id &&
        setFullContactSelected( successPostClient.contacts.find( contact => contact.nom + " " + contact.prenom === selectContact.valueDisplay ) );
    }, [ successPostClient.id ] );


    /* On met à jour les éléments Required à chaque changement des dépendances */
    useEffect(() => {
        setFieldsRequired( document.querySelectorAll('[ required ]' ) );
    }, [hasCommentaire, arrayContact.length, hasDeliveryAddress, document.querySelectorAll('[ required ]' ).length] );


    useEffect( () => {
        ((hasCommentaire.value === "yes") && successPostClient.id && successHistorique.id) && loadNumberClients();
        ((hasCommentaire.value === "no") && successPostClient.id) && loadNumberClients();
    }, [ loadNumberClients, successHistorique.id, successPostClient.id ]);

    const handleSubmit = ( e ) => {
        e.preventDefault();
        postClient();
    };

    const closeModal = () => {
        setShowModalConfirm(false)
    }



    if( loadingTypeHistorique && loadingPotentialities ){
        return (
            <MainContainer>
                <Spinner />
            </MainContainer>
        )
    }


    return(
        <>
            <MainContainer>
                <DivButtonAction justify={"flex-start"}>
                    <ButtonReturn onClick={history.goBack} margin={"10px 0 0 0"}>Retour</ButtonReturn>
                </DivButtonAction>
                <h1>Créer un client</h1>
                <form onSubmit={ ( e) => { e.preventDefault(); }}>
                    <SectionForm>
                        <h2>Identité</h2>
                        <Flexbox>
                            <InputGroupRadio
                                label={ "Statut du client" }
                                setRadioChecked={ setClientStatut }
                                selected={ clientStatut }
                                name="client_statut"
                                data={ [ { "id": 1, "label": "Prospect", "value": "prospect" }, { "id": 2, "label": "Acquis", "value": "client_validated" } ] }
                            />
                        </Flexbox>
                        <Flexbox>
                            <InputText
                                label={ "Nom du client" }
                                type={ "text" }
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                name={ "client_name" }
                                required
                            />
                            <InputText
                                label={ "Code APE" }
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                name={ "client_ape" }
                                required
                            />
                            <Flexbox align={"center"}>
                                <InputText
                                    label={ "Activité" }
                                    name={ "client_activite" }
                                    value={ activite }
                                    readOnly
                                />
                                {loadingActivite && <Spinner className={"little"}/>}
                            </Flexbox>
                        </Flexbox>
                        <InputText
                            label={ "Site internet" }
                            type="url"
                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                            name="client_website"
                        />
                    </SectionForm>
                    <SectionForm>
                        <h2>Coordonnées</h2>
                        <Flexbox>
                            <InputText
                                label={ "Telephone" }
                                type={ "tel" }
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                name={ "client_phone" }
                                required
                            />
                            <InputText
                                label={ "Email de l'entreprise" }
                                type={ "email" }
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                name={ "client_mail" }
                                required
                            />
                        </Flexbox>
                        <Flexbox>
                            <InputText
                                type={"number"}
                                label={ "Numéro" }
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                name={ "client_street_number" }
                                required
                            />
                            <InputText
                                label={ "Type de voie" }
                                type={ "text" }
                                onChange={( e ) => handleChangeInput( e, setInputState ) }
                                name={"client_street_wayType"}
                                required
                            />
                            <InputText
                                label={ "Nom de la voie" }
                                type={ "text" }
                                onChange={( e ) => handleChangeInput( e, setInputState ) }
                                name={ "client_street_name" }
                                required
                            />
                        </Flexbox>
                        <Flexbox>
                            <InputText
                                label={"Code postal"}
                                type={ "number" }
                                onChange={ ( e ) =>  handleChangeInput(e, setInputState) }
                                onWheel={ ( e ) => e.target.blur() }
                                name={ "client_street_codePostal" }
                                value={ inputState.client_street_codePostal }
                                required
                            />
                            <Flexbox align={"center"}>
                                <InputSelect
                                    name={ "select_villes_client" }
                                    label={ "Villes" }
                                    data={ villes && villes.map( ( ville, key) => ( { id : key, value : ville.id, valueDisplay: ville.nom } ) ) }
                                    option={ "Villes" }
                                    optionValue={ "" }
                                    selectValue={ selectVilles }
                                    setSelectValue={ setSelectVilles }
                                    disabled={ disabledSelectVilles }
                                    required
                                />
                                { loadingVilles && <Spinner className={"little"}/> }
                            </Flexbox>
                        </Flexbox>
                    </SectionForm>
                    <SectionForm>
                        <h2>Adresse de livraison</h2>
                        <Flexbox>
                            <InputGroupRadio
                                label={ "Le client a une adresse différente :" }
                                setRadioChecked={ setHasDeliveryAddress }
                                selected={ hasDeliveryAddress }
                                name="isHasAddressDelivery"
                                data={ [ { "id": 1, "label": "Non", "value": "no" }, { "id": 2, "label": "Oui", "value": "yes" } ] }
                            />
                        </Flexbox>
                    {hasDeliveryAddress.value === "yes" &&
                        (<>
                            <Flexbox>
                                <InputText
                                    label={ "Numéro" }
                                    type="number"
                                    onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                    name="client_street_number_delivery"
                                    required
                                />
                                <InputText
                                    label={ "Type de voie" }
                                    type="text"
                                    onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                    name="client_street_wayType_delivery"
                                    required
                                />
                                <InputText
                                    label={ "Nom de la voie" }
                                    type="text"
                                    onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                    name="client_street_name_delivery"
                                    required
                                />
                            </Flexbox>
                            <Flexbox>
                                <InputText
                                    label={"Code postal"}
                                    type={ "number" }
                                    onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                    onWheel={ ( e ) => e.target.blur() }
                                    value={ inputState.client_street_codePostal_delivery }
                                    name={ "client_street_codePostal_delivery" }
                                    required
                                />
                                <Flexbox align={"center"}>
                                    <InputSelect
                                        name={ "select_villes_delivery" }
                                        label={ "Villes" }
                                        data={ villesDelivery && villesDelivery.map( ( el, key) => ( { id : key, value : el.id, valueDisplay: el.nom } ) ) }
                                        option={ "Villes" }
                                        optionValue={ "" }
                                        selectValue={ selectVillesDelivery }
                                        setSelectValue={ setSelectVillesDelivery }
                                        disabled={ disabledSelectVillesDelivery }
                                        required
                                    />
                                    { loadingVillesDelivery && <Spinner className={"little"}/> }
                                </Flexbox>
                            </Flexbox>
                        </>)
                    }
                    </SectionForm>
                    <SectionForm>
                        <h2>Choix de la facturation</h2>
                        <InputGroupRadio
                            label={"Le moyen par lequel le client souhaite recevoir se facturation :"}
                            setRadioChecked={ setBillType }
                            selected={ billType }
                            name="typeBill"
                            data={ [ {"id": 1, "label": "Mail", "value": "mail"}, {"id": 2, "label": "Courrier", "value": "post"} ] }
                        />
                    </SectionForm>
                    <SectionForm>
                        <h2>Contact</h2>
                        <GroupList>
                            { arrayContact.map(
                                ( contact, index) =>
                                    <ContactBlock
                                        key={ Object.values( contact ).join( '*=*' ) + index }
                                        numberContact={ index }
                                        firstname={ contact.prenom }
                                        lastname={ contact.nom }
                                        job={ contact.fonction }
                                        phone={ contact.tel }
                                        mail={ contact.email }
                                        onChange={ ( newContact ) => insertDataFromChild( arrayContact, setArrayContact, newContact, index ) }
                                        removeContact={ () => removeContact( index, setArrayContact, arrayContact ) }
                                    />
                            ) }
                        </GroupList>
                        <Flexbox align={ "baseline" }>
                            <BtnAjout text="Ajouter un contact" add={( e ) => ( addContact(e, arrayContact, setArrayContact, setDisabledSelectContact)) } />
                        </Flexbox>
                    </SectionForm>
                    <SectionForm>
                        <h2>Commentaire</h2>
                        <InputGroupRadio
                            label={"Ajouter un commentaire"}
                            name={"has_commentaire"}
                            setRadioChecked={setHasCommentaire}
                            selected={hasCommentaire}
                            data={[ {"id": 1, "label": "Non", "value": "no"}, {"id": 2, "label": "Oui", "value": "yes"} ]}
                        />
                        { hasCommentaire.value === "yes" && (
                            <CommentaireBox>
                                <div>
                                    <InputSelect
                                        name={ "select_contact_historiques_name" }
                                        label={ "Contact" }
                                        data={ arrayContact && arrayContact.map( ( el, key) => ( { id : key, value : key, valueDisplay: el.nom + " " + el.prenom } ) ) }
                                        option={ "Saisir le contact" }
                                        optionValue={ "" }
                                        selectValue={ selectContact }
                                        setSelectValue={ setSelectContact }
                                        disabled={ disabledSelectContact }
                                    />
                                    <InputSelect
                                        label={ "Type de contact" }
                                        name={ "select_contact_historiques_type" }
                                        data={ typeHistorique ? typeHistorique.map( ( el, key ) => ( { id : key, value : el.id, valueDisplay: el.libelle } ) ) : "" }
                                        option={ "Saisir le type de contact" }
                                        optionValue={ "" }
                                        selectValue={ selectContactType }
                                        setSelectValue={ setSelectContactType }
                                        required
                                    />
                                </div>
                                <div>
                                    <InputTextArea
                                        label={ "Saisir votre comentaire:" }
                                        commentaireRows={ 10 }
                                        onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                        name={ "commentaire" }
                                        required
                                    />
                                </div>
                            </CommentaireBox>
                        )}
                    </SectionForm>
                    <SectionForm>
                        <h2>Indice de potentialité</h2>
                        <Flexbox align={ "center" }>
                            <InputSelect
                                name={ "select_potentialities_types" }
                                label={ "Type de potentialité" }
                                data={ potentialitiesTypes && potentialitiesTypes.map( ( el, key ) => ( { id : key, value : el.id, valueDisplay: el.libelle } ) ) }
                                option={ "Saisir le type de contact" }
                                optionValue={ "" }
                                selectValue={ selectPotentialityType }
                                setSelectValue={ setSelectPotentiaityType }
                                disabled={ false }
                            />
                            <Flexbox align={"center"}>
                                <InputSelect
                                    name={ "select_magazines" }
                                    label={ "Nom du magazine si type encard" }
                                    data={ magazines.map( ( magazine, key ) => ( { id : key, value : magazine.id, valueDisplay: magazine.nom } ) ) }
                                    option={ "Saisir le type de contact" }
                                    optionValue={ "" }
                                    selectValue={ selectMagazine }
                                    setSelectValue={ setSelectMagazine }
                                    disabled={ disabledSelectMagazine }
                                />
                                {loadingMagazines && <Spinner className={"little"} />}
                            </Flexbox>
                            <BtnAjout
                                text={ "Ajouter la potentialité" }
                                margin={ "0 0 0 15px" }
                                add={ ( e ) => (
                                    addPotentiality(e, selectPotentialityType,
                                        setDataPotentiality,
                                        dataPotentiality,
                                        selectMagazine,
                                        setPotentialityPost,
                                        potentialitePost)
                                    )
                                }
                            />
                        </Flexbox>
                        <TablePotentiality
                            headTable={ [ "Type", "Magazines" ] }
                            dataPotentiality={ dataPotentiality }
                            removePotentiality={ ( e, index ) => removePotentiality( e, index, setDataPotentiality, dataPotentiality ) }
                        />
                    </SectionForm>
                    <ButtonPrimary margin={ "50px 0 0 0" } onClick={ () => {
                        const isValid = Object.values(fieldsRequired).every( item => item.value.length > 0 )
                        if(isValid){ setShowModalConfirm(true); } } }>Créer le client</ButtonPrimary>
                    { showModalConfirm && !loadingPostClient && !successPostClient.id &&
                        <ModalConfirmClient
                            postRequest={handleSubmit}
                            field={inputState}
                            clientStatut={clientStatut}
                            ville={selectVilles}
                            villeDelivery={selectVillesDelivery}
                            deliveryAddress={hasDeliveryAddress}
                            billType={billType}
                            contacts={arrayContact}
                            contactCommentaire={selectContact}
                            typeContact={selectContactType}
                            potentialities={dataPotentiality}
                            closeModal={closeModal}
                            confirmFor={"client"}
                        />
                    }
                    { ( loadingPostClient || loadingHistorique ) && (
                        <Modal closeModal={closeModal} justify={"center"} align={"center"}>
                            <Spinner />
                        </Modal>
                    )}
                    { successPostClient.id &&
                        <ModalResponse
                            response={responseStatut}
                            type={'client'}
                            idType={successPostClient.id}
                            closeModal={closeModal}
                        />
                    }
                </form>
            </MainContainer>
        </>
    )
}
export default CreateClient;

