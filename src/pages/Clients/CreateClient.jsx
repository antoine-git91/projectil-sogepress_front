import React, {useEffect, useReducer, useState, Fragment} from "react";
import Flexbox from "../../templates/Flexbox";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import MainContainer from "../../templates/Container";
import ContactBlock from "../../components/Clients/ContactBlock";
import InputSelect from "../../components/Form/InputSelect";
import BtnAjout from "../../components/btn_ajout";
import {ButtonPrimary, ButtonPrimaryLink, ButtonSecondaryLink} from "../../utils/styles/button";
import styled from "styled-components";
import {handleChangeInput} from "../../utils/misc/inputChange";
import {InputStyle} from "../../utils/styles/InputStyle";
import {useFetchGet} from "../../utils/misc/useFetchGet";
import InputTextArea from "../../components/Form/InputTextArea";
import TablePotentiality from "../../components/table/TablePotentiality";
import {useFetchPost} from "../../utils/misc/useFetchPost";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalBody from "../../components/Modal/ModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";

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

const CreateClient = () => {

    /* On initialise les input text simple */
    const [ inputState, setInputState ] = useReducer(
        ( state, newState ) => ( {...state, ...newState} ),
        {
            client_name: "",
            client_ape: "",
            client_activite: "",
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


    /* --- Activites --- */
    /* Input Activite libelle */
    const[ activite, setActivite ] = useState('' );
    /* On remplace le point du code APE pour être conforme */
    const codeApe = inputState.client_ape.replace(".", "" );
    const { items : activiteClient, loading: loadingActivite, load: loadActivite } = useFetchGet('https://localhost:8000/api/naf_sous_classes/' + codeApe );


    /* --- Villes --- */
    /* a - villes client */
        /* Requête pour avoir les villes par rapport au code postal */
    const[ villes, setVilles ] = useState([] );
    const {items: villesClient, load: loadVilles } = useFetchGet('https://localhost:8000/api/villesByCp/' + inputState.client_street_codePostal );
    /* On récupère la donnée voulue du select villes */
    const [ selectVilles, setSelectVilles ] = useState({"value": "", "valueDisplay": ""} );
    /* Select villes suivant le code postal */
    const [ disabledSelectVilles, setDisabledSelectVilles ] = useState(true );

    /* b - villes de livraison client */
        /* Requête pour avoir les villes par raport au code postal */
    const[ villesDelivery, setVillesDelivery ] = useState([] );
    const { items: villesClientDelivery, load: loadVillesDelivery } = useFetchGet('https://localhost:8000/api/villesByCp/' + inputState.client_street_codePostal_delivery );
    /* On récupère la donnée voulue du select villes */
    const [ selectVillesDelivery, setSelectVillesDelivery ] = useState({"value": "", "valueDisplay": ""});
    /* Si adresse de livraison : Select villes suivant le code postal */
    const [ disabledSelectVillesDelivery, setDisabledSelectVillesDelivery ] = useState(true);

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
    const [ selectContact, setSelectContact ] = useState({"value": "", "valueDisplay": ""} );
    /* Pour gérer l'acces au select de contact historique */
    const [ disabledSelectContact, setDisabledSelectContact ] = useState(true );


    /* Input type Radio */
    const [ billType, setBillType ] = useState("mail" );
    const [ hasDeliveryAddress, setHasDeliveryAddress ] = useState("no" );
    const [ clientStatut, setClientStatut ] = useState("prospect" );

    /* Modal */
    const [ showModalConfirm, setShowModalConfirm ] = useState(false);


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

    useEffect(() => {
        arrayAdressesClient[0] = {
            "numero" : inputState.client_street_number,
            "typeVoie" : inputState.client_street_wayType,
            "nomVoie" : inputState.client_street_name,
            "ville" : "/api/villes/" + selectVilles.value,
            "statutAdresse" : true
        }
    }, [ arrayAdressesClient, inputState.client_street_number, inputState.client_street_wayType, inputState.client_street_name, selectVilles.value ]);


    useEffect(() => {
        if( hasDeliveryAddress === "yes" ){
            setArrayAdressesClient( arrayAdressesClient.concat(
                {
                    "numero": "",
                    "typeVoie": "",
                    "nomVoie": "",
                    "ville": "",
                    "statutAdresse": null
                }
            ) )

        } else if( hasDeliveryAddress === "no" ){
            if( arrayAdressesClient[1] ) {
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
    }, [ hasDeliveryAddress, arrayAdressesClient ] );

    useEffect(() => {
        if(arrayAdressesClient[1]) {
            arrayAdressesClient[1] = {
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
        setActivite( activiteClient.libelle );
    }, [ activiteClient ] );


    /* Function onBlur sur input code postal */
    const getVilles = ( e, setState, setDisabledSelect, request ) => {
        e.preventDefault();

        const valueLength = e.target.value.length;

        if( valueLength < 6 ){
            setTimeout(() => {
                request();
                setDisabledSelect( false );

            }, 1000 );
        }
        if( valueLength === 0 ){
            setState( [] );
            setDisabledSelect( true );
        }
    };

    /* Mise à jour du state */
    useEffect(() => {
        setVilles( villesClient );
    }, [ villesClient ] );

    /* Mise à jour du state */
    useEffect(() => {
        setVillesDelivery( villesClientDelivery );
    }, [ villesClientDelivery ] );


    /* CONTACTBLOCK COMPONENT */

    /* On Créé un contactBlock à chaque clique de buttonAjout */
    const addContact = ( e ) => {
        e.preventDefault();
        setArrayContact(
            arrayContact.concat( {"nom": "","prenom": "", "fonction": "", "tel": "", "email": ""} )
        );
        setDisabledSelectContact(true );
    };

    /* On supprime un contactBlock à chaque clique de buttonRemove */
    const removeContact = ( e, index ) => {
        e.preventDefault();
        setArrayContact([...arrayContact.slice( 0, index ), ...arrayContact.slice( index + 1 ) ] );
    };

    /* On insert les données pour chaque contactBlock */
    const insertDataFromChild = ( newContact, index ) => {
        arrayContact[ index ].nom = newContact.nom;
        arrayContact[ index ].prenom = newContact.prenom;
        arrayContact[ index ].fonction = newContact.fonction;
        arrayContact[ index ].tel = newContact.tel;
        arrayContact[ index ].email = newContact.email;
        setArrayContact( arrayContact );
    };
    /* ################# */
    /* ################# */


    /* COMMENTAIRE */

    /* On lance la requête pour recupérer le type d'historique */
    const { items: typeHistorique, load: loadTypeHistorique, loading: loadingTypeHistorique } = useFetchGet('https://localhost:8000/api/type_historiques' );

    /* On récupère le type d'historique choisi dans le select */
    const [ selectContactType, setSelectContactType ] = useState({"value": "", "valueDisplay": ""} );

    useEffect(() => {
        loadTypeHistorique()
    }, [ loadTypeHistorique ] );

    /* On désactive le select du contact du commentaire si le nombre de contact est à 0 */
    useEffect(() => {
        if( arrayContact.length === 0 ){
            setDisabledSelectContact(true )
        }
    }, [ arrayContact ] );

    /* Quand on clique sur le bouton de validation de contact pour mettre à jour le select contact pour l'historique */
    const valideContact = ( e ) => {
        e.preventDefault();
        arrayContact.forEach( el => {
            let count = 0;
            for( let items in el ){
                if(el[ items ].length > 2){
                    count++
                    if( count === 5 ){
                        setDisabledSelectContact(false );
                    }
                } else {
                    setDisabledSelectContact(true )
                }
            }
        })
    }

    /* On check si l'un des champ et saisi
    * -> Si oui, on met les autres champs en Required */
    const inputHistoriqueName = document.getElementsByName("select_contact_historiques_name" );
    const inputHistoriqueType = document.getElementsByName("select_contact_historiques_type" );
    const inputHistoriqueCommentaire = document.getElementsByName("commentaire" );

    useEffect(() => {
        if( (inputHistoriqueName[0].value !== "" || inputHistoriqueName[0].getAttribute("disabled" ) === false ) || inputHistoriqueType[0].value !== "" || inputHistoriqueCommentaire[0].value !== "" ){
            inputHistoriqueName[0].removeAttribute("disabled" );
            inputHistoriqueName[0].setAttribute("required", true );
            inputHistoriqueType[0].setAttribute("required", true );
            inputHistoriqueCommentaire[0].setAttribute("required", true );
        } else{
            inputHistoriqueName[0].setAttribute("disabled", true );
            inputHistoriqueName[0].removeAttribute("required" );
            inputHistoriqueType[0].removeAttribute("required" );
            inputHistoriqueCommentaire[0].removeAttribute("required" );
        }
    }, [ selectContactType, selectContact, inputState.commentaire ] );

    /* ################# */
    /* ################# */


    /* POTENTIALITÉS */

    /* 1 - Potentialités types */

    /* On lance une requête pour récupérer les types de potentialités */
    const{ items: potentialitiesTypes, loading: loadingPotentialities, load: loadPotentialities } = useFetchGet('https://localhost:8000/api/type_potentialites' );

    useEffect(() => {
        loadPotentialities();
    }, [ loadPotentialities ] );

    /* Pour récupérer l'option sélectionnée */
    const [ selectPotentialityType, setSelectPotentiaityType ] = useState({"value": "", "valueDisplay": ""} );


    /* 2 - Magazines */

    /* On lance une requête pour récupérer les magazines si potentialitiesType === Régie */
    const { items: magazines, load: loadMagazines, loading: loadingMagazines }=  useFetchGet('https://localhost:8000/api/magazines' );
    const [ selectMagazine, setSelectMagazine ] = useState({"value": "", "valueDisplay": ""} );
    const [ disabledSelectMagazine, setDisabledSelectMagazine ] = useState(true );

    /* Si le type de potentialités est de type Régie */
    useEffect(() => {
        if ( selectPotentialityType.valueDisplay === "Régie" ){
            setDisabledSelectMagazine(false );
            loadMagazines();
        } else {
            setDisabledSelectMagazine(true );
            setSelectMagazine({ "value": "", "valueDisplay": "" } );
        }
    }, [ selectPotentialityType, loadMagazines ]);

    /* Affichage des potentialité en Front */
    const [ dataPotentiality, setDataPotentiality ] = useState([] );
    /* Données des potentialités pour persister en BDD */
    const [ potentialitePost, setPotentialityPost ] = useState([] );

    const addPotentiality = ( e ) => {
        e.preventDefault();
        if( selectPotentialityType.value !== "" ){
            setDataPotentiality(
                dataPotentiality.concat(
                    {
                        "type": {
                            "value": selectPotentialityType.value, "valueDisplay" : selectPotentialityType.valueDisplay
                        },
                        "magazine": {
                            "value": selectMagazine.value, "valueDisplay" : selectMagazine.valueDisplay
                        }
                    }
                )
            )

            setPotentialityPost( potentialitePost.concat(
                {
                    "magazine": selectMagazine.value !== "" ? "/api/magazines/" + selectMagazine.value : null ,
                    "typePotentialite": "/api/type_potentialites/" + selectPotentialityType.value
                }
            ) )
        }
    };

    const removePotentiality = (e, index) => {
        e.preventDefault();
        setDataPotentiality([...dataPotentiality.slice( 0, index ), ...dataPotentiality.slice( index + 1 )] );
    }
    /* ################# */
    /* ################# */


    /* --- POST CREATION CLIENT ---
    * 1 - POST CLIENT: on envoie les données pour créer le client en premier
    * 2 - POST HISTORIQUE: on récupère l'id du Client + l'id du contact séléctionné
    *  */

    /* Etape 1: POST CLIENT */
    const { success: postClientSuccess, error: postClientError, post: postClient , loading: loadingPostClient, responseStatut } = useFetchPost(
        'https://localhost:8000/api/clients',
        {
            "raisonSociale": inputState.client_name,
            "statut": clientStatut === "client_validated" ,
            "email": inputState.client_mail,
            "siteInternet": inputState.client_website,
            "typeFacturation": billType === "post",
            "nafSousClasse": "/api/naf_sous_classes/" + codeApe,
            "adresse": arrayAdressesClient,
            "contacts": arrayContact,
            "potentialites": potentialitePost
        }
    )

    const [ fullContactSelected, setFullContactSelected ] = useState({} );
    /* On cherche une correspondance entre l'option choisie et la réponse du tableau de contact du client */
    useEffect(() => {
        postClientSuccess &&
            setFullContactSelected( postClientSuccess.contacts.find( contact => contact.nom + " " + contact.prenom === selectContact.valueDisplay ) );
    }, [ postClientSuccess ] );


    /* Étape 2: POST HISTORIQUE */
    const [ loadingHistorique, setLoadingHistorique ] = useState(true );
    useEffect(() => {
        if( fullContactSelected && fullContactSelected.id && inputState.commentaire !== "" && selectContact.value !== "" && selectContactType.value !== "" ){
            fetch('https://localhost:8000/api/historique_clients', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    "commentaire": inputState.commentaire,
                    "user": "/api/users/" + JSON.parse(localStorage.getItem('meUser')).id,
                    "client": "/api/clients/" + postClientSuccess.id,
                    "typeHistorique": "/api/type_historiques/" + selectContactType.value,
                    "contact":  "/api/contacts/" + fullContactSelected.id
                } )
            } )
            .then( response => {
                if ( response.status === 201 ) {
                    setLoadingHistorique(false )
                } else {
                    console.error(response)
                }
            })
        }
    }, [ fullContactSelected ] )


    /* Modal */

    const [fieldsRequired, setFieldsRequired] = useState()
    /* On met à jour les éléments Required à chaque changement des dépendances */
    useEffect(() => {
        setFieldsRequired(document.querySelectorAll('[required]'));
    }, [selectContact, selectContactType, hasDeliveryAddress, arrayContact])


    const [loading, setLoading] = useState(false);
    const [postSuccess, setPostSuccess] = useState(false);
    const [postError, setPostError] = useState(false);

    const handleSubmit = ( e ) => {
        e.preventDefault();
        setLoading(true);
        postClient();
    };

    /* On check la réponse de la requete POST pour afficher différentes modales  */
    useEffect(() => {
        if( loadingPostClient === false && responseStatut === 201){
            setTimeout(() => {
                setLoading(false)
                setPostSuccess(true)
                console.log(responseStatut)
            },1000)
        } else if( loadingPostClient === false && responseStatut !== 201)  {
            setTimeout(() => {
                setLoading(false)
                setPostError(true)
                console.log('error')
            },1000)
        }
    }, [responseStatut, loadingPostClient])


    /* Si on clique sur le bouton "Créer un autre client
*  -> On efface les données de l'ancien formulaire
*  */
    const otherCreateNewClient = ( e ) => {
        e.preventDefault();
        window.location.reload();
        window.scrollTo(0,0)
    }

    /* Si la modal est fermée on réinitialise l'affichage des autres contenus de la modales */
    useEffect(() => {
        if(showModalConfirm === false){
            setLoading(false);
            setPostError(false);
            setPostSuccess(false);
        }
        console.log(loading, postSuccess, postError)
    }, [showModalConfirm])



    return(
        <Fragment>
            <MainContainer>
                <h1>Créer un client</h1>
                <form onSubmit={ (e) => { e.preventDefault(); }}>
                    <Flexbox>
                        <InputGroupRadio
                            label={"Statut du client"}
                            setRadioChecked={setClientStatut}
                            selected={clientStatut}
                            name="client_statut"
                            data={ [{"id": "id1", "label": "Prospect", "value": "prospect"}, {"id": "id2", "label": "Acquis", "value": "client_validated"}] }
                        />
                    </Flexbox>
                    <Flexbox>
                        <label htmlFor={"client_name"}>Nom du client
                            <InputStyle
                                type="text"
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                value={ inputState.client_name }
                                name="client_name"
                                required
                            />
                        </label>
                        <label htmlFor={"client_ape"}>Code APE
                            <InputStyle
                                type="text"
                                onChange={ ( e ) => handleChangeInput(e, setInputState) }
                                value={ inputState.client_ape }
                                name="client_ape"
                                required
                            />
                        </label>
                        <label htmlFor={"client_activite"}>Activité
                            <InputStyle
                                type="text"
                                value={ activite }
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                name="client_activite"
                                readOnly
                                disabled
                            />
                        </label>
                    </Flexbox>
                    <h2>Coordonnées</h2>
                    <Flexbox>
                        <label htmlFor={"client_telephone"}>Téléphone
                            <InputStyle
                                type="text"
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                value={ inputState.client_phone }
                                name="client_phone"
                            />
                        </label>
                        <label htmlFor={"client_mail"}>Email de l'entreprise
                            <InputStyle
                                type="text"
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                value={ inputState.client_mail }
                                name="client_mail"
                                required
                            />
                        </label>
                    </Flexbox>
                    <Flexbox>
                    <label htmlFor={"client_street_number"}>Numéro
                        <InputStyle
                            type="text"
                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_street_number }
                            name="client_street_number"
                            required
                        />
                    </label>
                    <label htmlFor={"client_street_wayType"}>Type de voie
                        <InputStyle
                            type="text"
                            onChange={( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_street_wayType }
                            name="client_street_wayType"
                            required
                        />
                    </label>
                    <label htmlFor={"client_street_name"}>Nom de la voie
                        <InputStyle
                            type="text"
                            onChange={( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_street_name }
                            name="client_street_name"
                            required
                        />
                    </label>
                    </Flexbox>
                    <Flexbox>
                        <label htmlFor={"client_street_codePostal"}>Code postal
                            <InputStyle
                                type="number"
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                onBlur={ ( e ) => getVilles( e, setVilles, setDisabledSelectVilles, loadVilles ) }
                                onWheel={ ( e ) => e.target.blur() }
                                value={ inputState.client_street_codePostal }
                                name="client_street_codePostal"
                                required
                            />
                        </label>
                        <InputSelect
                            name={ "select_villes_client" }
                            label={ "Villes" }
                            data={ villes && villes.map( ( ville, key) => ( { id : key, value : ville.id, valueDisplay: ville.nom } ) ) }
                            option={ "Villes" }
                            optionValue={ "" }
                            selectValue={ selectVilles }
                            setSelectValue={ setSelectVilles }
                            disabled={ disabledSelectVilles }
                            required={"required"}
                        />
                    </Flexbox>

                    <label htmlFor={"client_website"}>Site internet
                        <InputStyle
                            type="text"
                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_website }
                            name="client_website"
                        />
                    </label>
                    <h2>Adresse de livraison</h2>
                    <Flexbox>
                        <InputGroupRadio
                            label={ "Le client a une adresse différente :" }
                            setRadioChecked={ setHasDeliveryAddress }
                            selected={ hasDeliveryAddress }
                            name="isHasAddressDelivery"
                            data={ [ {"id": "id1", "label": "Non", "value": "no"}, {"id": "id2", "label": "Oui", "value": "yes"} ] }
                        />
                    </Flexbox>
                    {hasDeliveryAddress === "yes" &&
                        (<>
                            <Flexbox>
                                <label htmlFor={"client_street_number_delivery"}>Numéro
                                    <InputStyle
                                        type="number"
                                        onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                        value={ inputState.client_street_number_delivery }
                                        name="client_street_number_delivery"
                                        required />
                                </label>
                                <label htmlFor={"client_street_wayType_delivery"}>Type de voie
                                    <InputStyle
                                        type="text"
                                        onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                        value={ inputState.client_street_wayType_delivery }
                                        name="client_street_wayType_delivery"
                                        required
                                    />
                                </label>
                                <label htmlFor={"client_street_name_delivery"}>Rue
                                    <InputStyle
                                        type="text"
                                        onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                        value={ inputState.client_street_name_delivery }
                                        name="client_street_name_delivery"
                                        required
                                    />
                                </label>
                            </Flexbox>
                            <Flexbox>
                                <label htmlFor={"client_street_codePostal_delivery"}>Code postal
                                    <InputStyle
                                        type="number"
                                        onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                        onBlur={ ( e ) => getVilles( e, setVillesDelivery, setDisabledSelectVillesDelivery, loadVillesDelivery ) }
                                        onWheel={ ( e ) => e.target.blur() } value={ inputState.client_street_codePostal_delivery }
                                        name="client_street_codePostal_delivery"
                                        required
                                    />
                                </label>
                                <InputSelect
                                    name={ "select_villes_delivery" }
                                    label={ "Villes" }
                                    data={ villesDelivery && villesDelivery.map( ( el, key) => ( { id : key, value : el.id, valueDisplay: el.nom } ) ) }
                                    option={ "Villes" }
                                    optionValue={ "" }
                                    selectValue={ selectVillesDelivery }
                                    setSelectValue={ setSelectVillesDelivery }
                                    disabled={ disabledSelectVillesDelivery }
                                    required={ disabledSelectVilles === "true" && "required" }
                                />
                            </Flexbox>
                        </>)
                    }
                    <h2>Choix de la facturation</h2>
                    <InputGroupRadio
                        label={"Le moyen par lequel le client souhaite recevoir se facturation :"}
                        setRadioChecked={ setBillType }
                        selected={ billType }
                        name="typeBill"
                        data={ [ {"id": "id1", "label": "Mail", "value": "mail"}, {"id": "id2", "label": "Courrier", "value": "post"} ] } />
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
                                    onChange={ ( newContact ) => insertDataFromChild( newContact, index ) }
                                    removeContact={ ( e ) => removeContact( e, index ) }
                                />
                        )}
                    </GroupList>
                    <Flexbox align={ "baseline" }>
                        <BtnAjout text="Ajouter un contact" add={ addContact } />
                        { ( arrayContact.length > 0 ) && (
                            <>
                            <span>ou</span>
                            <ButtonSecondaryLink margin={ "0 0 0 15px" } onClick={ (e ) => valideContact( e ) }>Valider les contact</ButtonSecondaryLink>
                            </>
                            )
                        }
                    </Flexbox>
                    <div>
                        <h2>Commentaire</h2>
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
                                    disabled={ false }
                                />
                            </div>
                            <div>
                                <InputTextArea
                                    label={ "Saisir votre comentaire:" }
                                    commentaireRows={ 10 }
                                    onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                    value={ inputState.commentaire }
                                    name="commentaire"
                                />
                            </div>
                        </CommentaireBox>
                    </div>
                    <div>
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
                            <InputSelect
                                name={ "select_magazines" }
                                label={ "Nom du magazine si type encard" }
                                data={ magazines.map( ( el, key ) => ( { id : key, value : el.id, valueDisplay: el.nom } ) ) }
                                option={ "Saisir le type de contact" }
                                optionValue={ "" }
                                selectValue={ selectMagazine }
                                setSelectValue={ setSelectMagazine }
                                disabled={ disabledSelectMagazine }
                            />
                            <BtnAjout text={ "Ajouter la potentialité" } margin={ "0 0 0 15px" } add={ addPotentiality } />
                        </Flexbox>
                        <TablePotentiality
                            headTable={ [ "Type", "Magazine" ] }
                            dataPotentiality={ dataPotentiality }
                            removePotentiality={ ( e, index ) => removePotentiality( e, index ) }
                        />
                    </div>
                    <ButtonPrimary margin={ "50px 0 0 0" } onClick={ () => {
                        const isValid = Object.values(fieldsRequired).every( item => (item && item.value !== "") || (item[0] && item[0].value !== "") )
                        if(isValid){
                            setShowModalConfirm(true)
                        }
                    } }>Créer le client</ButtonPrimary>
                    {showModalConfirm &&
                        <Modal>
                            {
                                (!loading && !postError && !postSuccess && <ModalConfirm
                                    setShowModal={setShowModalConfirm}
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
                                />) ||
                                (loading && (<Spinner />)) ||
                                (postSuccess && (<ModalSuccess message={"Le client a bien été créé"} idClient={postClientSuccess.id} otherCreateNewClient={otherCreateNewClient} />)) ||
                                (postError && <ModalError message={"Une erreur s'est produite"} setShowModal={setShowModalConfirm}/>)

                            }
                        </Modal>
                    }
                </form>
            </MainContainer>
        </Fragment>
    )
}
export default CreateClient;



const ModalConfirm = ({ postRequest, setShowModal, field, clientStatut, ville, villeDelivery, deliveryAddress, billType, contacts, contactCommentaire, typeContact, potentialities }) => {
    return (
    <Fragment>
        <ModalHeader>
            <h1>Souhaitez-vous créer ce client ?</h1>
            <p>Vérifier les informations saisies avant de confirmer</p>
        </ModalHeader>
        <ModalBody>
            <p>Statut du client: <span>{ clientStatut === "false" ? "Prospect" : "Acquis" }</span></p>
            <p>Nom: <span>{ field.client_name ? field.client_name : "Non communiqué" }</span></p>
            <p>Activité: <span>{  field.client_ape ? field.client_ape + " - " + document.querySelector('input[name="client_activite"]').value : "Non communiqué" }</span></p>

            <h2>Coordonnées</h2>
            <p>Mail: <span>{ field.client_mail ? field.client_mail : "Non communiqué" }</span></p>
            <p>Téléphone: <span>{ field.client_phone ? field.client_phone : "Non communiqué" }</span></p>
            <p>Adresse: <span>{ field.client_street_number && field.client_street_wayType && field.client_street_name && field.client_street_codePostal && ville ? field.client_street_number + " " + field.client_street_wayType + " " + field.client_street_name + " " + field.client_street_codePostal + " " + ville.valueDisplay : "Non communiqué" }</span></p>
            <p>Site internet: <span>{ field.client_website ? field.client_website : "Non communiqué" }</span></p>
            <h2>Adresse de livraison</h2>
            <p>Adresse de Livraison: <span>{ deliveryAddress === "true" && field.client_street_number_delivery && field.client_street_wayType_delivery && field.client_street_name_delivery && field.client_street_codePostal_delivery && villeDelivery.valueDisplay ? field.client_street_number_delivery + " " + field.client_street_wayType_delivery + " " + field.client_street_name_delivery + " " + field.client_street_codePostal_delivery + " " + villeDelivery.valueDisplay : "Identique à l'adresse de facturation" }</span></p>

            <h2>Choix de la facturation</h2>

            <p>type de facturation: <span>{ billType === "true" ? "Mail" : "Courrier" }</span></p>
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

            <h2>Commentaire</h2>
            <p>Contact: <span>{ contactCommentaire.valueDisplay ? contactCommentaire.valueDisplay : "Non communiqué" }</span></p>
            <p>Type de contact: <span>{ typeContact.valueDisplay ? typeContact.valueDisplay : "Non communiqué" }</span></p>
            <p>Commentaire: <span>{ field.commentaire ? field.commentaire : "Non communiqué" }</span></p>

            <h2>Indice de Potentialité</h2>
            {
                potentialities.length > 0 ? potentialities.map(( potentiality, index ) => {
                    return (
                        <Fragment key={index}>
                            <p>{ index + 1 }: <span>{ potentiality.type.valueDisplay + " " + potentiality.magazine.valueDisplay }</span></p>
                        </Fragment>
                    )
                }) : "Aucune potentialité"
            }
        </ModalBody>
        <ModalFooter>
            <Flexbox justify={ "center" }>
                <ButtonSecondaryLink onClick={(e) => {
                    e.preventDefault();
                    setShowModal( false );
                }}>Annuler</ButtonSecondaryLink>
                <ButtonPrimary margin={"0 0 0 20px"} type="submit" onClick={postRequest}>Oui, je souhaite créer ce client</ButtonPrimary>
            </Flexbox>
        </ModalFooter>
    </Fragment>
    )
}

const ModalError = ({ message, setShowModal }) => {
    return (
        <Fragment>
            <ModalHeader>
                <h1>Oupss..</h1>
            </ModalHeader>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>
            <ModalFooter>
                <ButtonPrimary onClick={ ( e ) => { e.preventDefault(); setShowModal(false) } }>Fermer</ButtonPrimary>
            </ModalFooter>
        </Fragment>
    )
}

const ModalSuccess = ({ message, idClient, otherCreateNewClient }) => {
    return (
        <Fragment>
            <ModalHeader>
                <h1>Réussi !</h1>
            </ModalHeader>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>
            <ModalFooter>
                <Flexbox>
                    <ButtonSecondaryLink to={"/creation_client"} onClick={ ( e ) => otherCreateNewClient(e) }>Créer un nouveau Client</ButtonSecondaryLink>
                    <ButtonPrimaryLink to={ "/profile/" + idClient } margin={"0 10px"}>Voir la fiche client</ButtonPrimaryLink>
                    <ButtonPrimaryLink to={ "/" }>Retour à l'accueil</ButtonPrimaryLink>
                </Flexbox>
            </ModalFooter>
        </Fragment>
    )
}

