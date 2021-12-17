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
import TablePotentiality from "../../components/table/TablePotentiality";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalBody from "../../components/Modal/ModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";
import {useParams} from "react-router-dom";
import {useFetchPatch} from "../../utils/misc/useFetchPatch";

const GroupList = styled.ul`
  margin-left: 0;
  padding-left: 0;
`

const UpdateClient = () => {

    const {id} = useParams()
    const {items:client, load:loadClient, loading:loadingClient} = useFetchGet(`https://127.0.0.1:8000/api/clients/${id}`);

    useEffect(() => {
        loadClient();
    }, [loadClient])

    /* On initialise les input text simple */
    const [ inputState, setInputState ] = useReducer(
        ( state, newState ) => ({ ...state, ...newState }),
        loadingClient === false && client &&
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


    /* --- Villes --- */
    /* a - villes client */
        /* Requête pour avoir les villes par rapport au code postal */
    const[ villes, setVilles ] = useState([] );
    const {items: villesClient, load: loadVilles, loadingVilles } = useFetchGet('https://localhost:8000/api/villesByCp/' + inputState.client_street_codePostal );
    /* On récupère la donnée voulue du select villes */
    const [ selectVilles, setSelectVilles ] = useState({"value": "", "valueDisplay": ""} );
    /* Select villes suivant le code postal */
    const [ disabledSelectVilles, setDisabledSelectVilles ] = useState(true );

    /* b - villes de livraison client */
        /* Requête pour avoir les villes par rapport au code postal */
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


    /* Input type Radio */
    const [ billType, setBillType ] = useState("mail" );
    const [ clientStatut, setClientStatut ] = useState("prospect" );
    const [ hasDeliveryAddress, setHasDeliveryAddress ] = useState("no" );

    /* Modal */
    const [ showModalConfirm, setShowModalConfirm ] = useState(false );


    /* --- Activites --- */
    /* Input Activite libelle */
    const[ activite, setActivite ] = useState("" );

    /* On remplace le point du code APE pour être conforme */
    const codeApe = inputState.client_ape && inputState.client_ape.replace(".", "" );
    const { items : activiteClient, load: loadActivite, loading: loadingActivite } = useFetchGet('https://localhost:8000/api/naf_sous_classes/' + codeApe );


    /* Mise à jour du status du client */
    useEffect(() => {
        client.statut === true && setClientStatut("client_validated");
    }, [ client.statut ]);

    /* Récupère le libelle du code NAF */
    useEffect(() => {

        if(inputState.client_ape){
            const valueLength = inputState.client_ape.length;
            if( valueLength === 6 ){
                loadActivite();
            }
            else if( valueLength < 6 ){
                setActivite( "" );
                console.log("game over")
            }
        }
    }, [ inputState.client_ape ]);

    /* Mise à jour du libellé de l'activité */
    useEffect(() => {
        setActivite( activiteClient.libelle );
    }, [ activiteClient ] );


    /* Mise à jour des adresses du client dans les champs du formulaire */
    // Adresse principale
    useEffect(() => {

        const a = client.nafSousClasse && client.nafSousClasse.code.slice( 0, 2 );
        const b = client.nafSousClasse && client.nafSousClasse.code.slice( 2 );
        const code = client.nafSousClasse && a.concat( "." + b );

        setInputState({
            client_name: client.raisonSociale,
            client_ape: client.nafSousClasse && code,
            client_activite: activiteClient && activiteClient.libelle,
            client_phone: "",
            client_mail: client.email,
            client_street_number: client.adresse && client.adresse[ 0 ].numero,
            client_street_wayType: client.adresse && client.adresse[ 0 ].typeVoie,
            client_street_name: client.adresse && client.adresse[ 0 ].nomVoie,
            client_street_codePostal: client.adresse && client.adresse[ 0 ].ville.codePostal,
            client_website: client.siteInternet
        })
    }, [ client ]);

    // Adresse de livraison si différente
    useEffect(() => {
        if( client.adresse && client.adresse.length === 2 ){
            setHasDeliveryAddress("yes");
            setInputState({
                client_street_number_delivery: client.adresse && client.adresse[ 1 ].numero,
                client_street_wayType_delivery: client.adresse && client.adresse[ 1 ].typeVoie,
                client_street_name_delivery: client.adresse && client.adresse[ 1 ].nomVoie,
                client_street_codePostal_delivery: client.adresse && client.adresse[ 1 ].ville.codePostal,
            })
        }
    }, [ client.adresse ]);

    console.log(client)

    /* On mets à jour le tableau des adresses via les données du client */
    // Adresse principale
    useEffect(() => {
        arrayAdressesClient[0] = {
            "numero" : inputState.client_street_number,
            "typeVoie" : inputState.client_street_wayType,
            "nomVoie" : inputState.client_street_name,
            "ville" : "/api/villes/" + selectVilles.value,
            "statutAdresse" : true
        }
    }, [ arrayAdressesClient, inputState.client_street_number, inputState.client_street_wayType, inputState.client_street_name, selectVilles.value ]);

    // Adresse de livraison si différente
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
        } else if( hasDeliveryAddress === false ){
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


    /* Function onBlur sur input code postal : Adresse principale */
    useEffect(() => {
        const selectAddress = document.querySelector('select[name="select_villes_client"]')
        const valueLength = inputState.client_street_codePostal && inputState.client_street_codePostal.length;
        const villeClient = client.adresse && client.adresse[ 0 ].ville.id;

            if( valueLength === 5 ) {
                loadVilles();
                setDisabledSelectVilles(false);
                let i = villes.findIndex(el => el.id === villeClient);
                selectAddress.selectedIndex = i + 1;
                setSelectVilles( { "value": client.adresse[ 0 ].ville.id, "valueDisplay": client.adresse[ 0 ].ville.nom })
            }
            else if( valueLength === 0 ){
                setVilles( [] );
                setDisabledSelectVilles( true );
            }
    }, [ inputState.client_street_codePostal , client.adresse, villes.length ]);

    /* Function onBlur sur input code postal : Adresse de livraison si différente */
    useEffect(() => {
        const selectDeliveryAddress = document.querySelector('select[ name="select_villes_delivery" ]' );

        if(client.adresse && client.adresse.length > 1){
            const valueLength = inputState.client_street_codePostal_delivery && inputState.client_street_codePostal_delivery.length;
            const villesClientDelivery = client.adresse && client.adresse[ 1 ].ville.id;

            if( valueLength === 5 && selectDeliveryAddress ) {
                loadVillesDelivery();
                setDisabledSelectVillesDelivery(false);
                let i = villesDelivery.findIndex(el => el.id === villesClientDelivery);
                selectDeliveryAddress.selectedIndex = i + 1;
                setSelectVillesDelivery( { "value": client.adresse[ 1 ].ville.id, "valueDisplay": client.adresse[ 1 ].ville.nom })

            }
            else if( valueLength === 0 ){
                setVilles( [] );
                setDisabledSelectVillesDelivery( true );
            }
        }
    }, [ inputState.client_street_codePostal_delivery , client.adresse, villesDelivery.length ]);

    /* Mise à jour du state */
    useEffect(() => {
        setVilles( villesClient );
    }, [ villesClient ] );

    /* Mise à jour du state */
    useEffect(() => {
        setVillesDelivery( villesClientDelivery );
    }, [ villesClientDelivery ] );


    // Mise à jour choix de la facturation
    useEffect(() => {
        client.typeFacturation === true && setBillType("post");
    }, [ client.typeFacturation ]);


    /* CONTACTBLOCK COMPONENT */

    // Mise à jour du tableau des contacts du client
    useEffect( () => {
        if(client.contacts && client.contacts.length > 0){
            setArrayContact(arrayContact.concat(client.contacts))
        }
    }, [client.contacts])

    /* On Créé un contactBlock à chaque clique de buttonAjout */
    const addContact = ( e ) => {
        e.preventDefault();
        setArrayContact(
            arrayContact.concat( {"nom": "","prenom": "", "fonction": "", "tel": "", "email": ""} )
        );
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
    const [ potentialitePost, setPotentialitePost ] = useState([] );

    useEffect( () => {
        if( client.potentialites && client.potentialites.length > 0 ){
            client.potentialites.map( potentialite =>
                dataPotentiality.push(
                {
                    "type": {
                        "value": potentialite.typePotentialite.id, "valueDisplay" : potentialite.typePotentialite.libelle
                    },
                    "magazine": {
                        "value": potentialite.magazine && potentialite.magazine.id, "valueDisplay" : potentialite.magazine && potentialite.magazine.nom
                    }
                }
            )) ;
            client.potentialites.map( potentialite => potentialitePost.push(
                {
                    "magazine": potentialite.magazine && potentialite.magazine.id !== "" ? "/api/magazines/" + potentialite.magazine.id : null ,
                    "typePotentialite": "/api/type_potentialites/" + potentialite.typePotentialite.id
                }
            ))
        }


    }, [ client.potentialites ])

    console.log(dataPotentiality)
    console.log(potentialitePost)

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

            setPotentialitePost( potentialitePost.concat(
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
        setPotentialitePost([...potentialitePost.slice( 0, index ), ...potentialitePost.slice( index + 1 )] );
    }
    /* ################# */
    /* ################# */


    /* --- POST CREATION CLIENT ---
    * 1 - POST CLIENT: on envoie les données pour créer le client en premier
    *  */

    /* Etape 1: POST CLIENT */
    const { success: postClientSuccess, error: postClientError, post: postClient , loading: loadingPostClient, responseStatut } = useFetchPatch(
        'https://localhost:8000/api/clients/' + client.id,
        {
            "raisonSociale": inputState.client_name,
            "statut": clientStatut === "client_validated" ? true : false,
            "email": inputState.client_mail,
            "siteInternet": inputState.client_website,
            "typeFacturation": billType === "mail" ? false : true,
            "nafSousClasse": "/api/naf_sous_classes/" + codeApe,
            "adresse": arrayAdressesClient,
            "contacts": arrayContact,
            "potentialites": potentialitePost
        }
    )


    /* Modal */
    const [fieldsRequired, setFieldsRequired] = useState()
    /* On met à jour les éléments Required à chaque changement des dépendances */
    useEffect(() => {
        setFieldsRequired(document.querySelectorAll('[required]'));
    }, [ hasDeliveryAddress, arrayContact ])


    const [loading, setLoading] = useState(false);
    const [postSuccess, setPostSuccess] = useState(false);
    const [postError, setPostError] = useState(false);

    const handleSubmit = ( e ) => {
        e.preventDefault();
        setLoading(true);
        postClient();
    };

    /* On check la réponse de la requete PATCH pour afficher différentes modales  */
    useEffect(() => {

        if( loadingPostClient === false && responseStatut === 200){
            setTimeout(() => {
                setLoading(false)
                setPostSuccess(true)
            },1000)
            console.log(responseStatut)
        } else if( loadingPostClient === false && responseStatut !== 200)  {
            setTimeout(() => {
                setLoading(false)
                setPostError(true)
            },1000)
        }
    }, [responseStatut, loadingPostClient, postClientSuccess])


    /* Si la modal est fermée on réinitialise l'affichage des autres contenus de la modales */
    useEffect(() => {
        if( showModalConfirm === false ){
            setLoading(false );
            setPostError(false );
            setPostSuccess(false );
        }
    }, [ showModalConfirm ]);


    /* Lorsque l'on clique sur fermer ou la croix :
    * - Si c'est la modale récapitulative on ferme simplement la modal
    * - Si la modale est après la soumission des données on ferme la modale est recharge la page pour mettre à jour les informations
    *  */
    const closeModal = (e) => {
        e.preventDefault();
        setShowModalConfirm(false)
        if( postSuccess === true || postError === true){
            window.location.reload();
        }
    }


    return(
        <Fragment>
            <MainContainer>
                <h1>Modifier le client : {inputState.client_name}</h1>
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
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
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
                                //onBlur={ ( e ) => getVilles( e, setVilles, setDisabledSelectVilles, loadVilles ) }
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
                            data={[ { "id": "id1", "label": "Non", "value": "no" }, { "id": "id2", "label": "Oui", "value": "yes" } ]}
                        />
                    </Flexbox>
                    {hasDeliveryAddress === "yes" &&
                        (<React.Fragment>
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
                                        onWheel={ ( e ) => e.target.blur() }
                                        value={ inputState.client_street_codePostal_delivery }
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
                        </React.Fragment>)
                    }
                    <h2>Choix de la facturation</h2>
                    <InputGroupRadio
                        label={"Le moyen par lequel le client souhaite recevoir se facturation :"}
                        setRadioChecked={ setBillType }
                        selected={ billType }
                        name="typeBill"
                        data={ [ {"id": "id1", "label": "Mail", "value": "mail"}, {"id": "id2", "label": "Courrier", "value": "post"} ] } />
                    <h2>Contacts</h2>
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
                    </Flexbox>
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
                        {dataPotentiality.length > 0 ? (
                            <TablePotentiality
                                headTable={ [ "Type", "Magazine" ] }
                                dataPotentiality={ dataPotentiality }
                                removePotentiality={ ( e, index ) => removePotentiality( e, index ) }
                            />
                        ) : "Aucune potentialité"}
                    </div>
                    <ButtonPrimary margin={ "50px 0 0 0" } onClick={ () => {
                        const isValid = Object.values(fieldsRequired).every( item => (item && item.value !== "") || (item[0] && item[0].value !== "") )
                        if(isValid){
                            setShowModalConfirm(true)
                        }
                    } }>Modifier le client</ButtonPrimary>
                    {showModalConfirm &&
                        <Modal closeButton={closeModal}>
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
                                    potentialities={dataPotentiality}
                                />) ||
                                (loading && (<Spinner />)) ||
                                (postSuccess && (<ModalSuccess message={"Le client a bien été modifié. En cliquant sur fermer un rechargement de la page sera effectué pour mettre les informations à jour et renverra au formulaire."} idClient={postClientSuccess.id} />)) ||
                                (postError && <ModalError message={"Une erreur s'est produite. Veuillez réessayer. Si le problème persiste, contacter la personne en charge du développement"} setShowModal={setShowModalConfirm}/>)
                            }
                        </Modal>
                    }
                </form>
            </MainContainer>
        </Fragment>
    )
}
export default UpdateClient;



const ModalConfirm = (
    { postRequest,
      setShowModal,
      field,
      clientStatut,
      ville,
      villeDelivery,
      deliveryAddress,
      billType,
      contacts,
      potentialities }) => {

    return (
    <Fragment>
        <ModalHeader>
            <h1>Souhaitez-vous modifier ce client ?</h1>
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
                }}>Revenir au formulaire</ButtonSecondaryLink>
                <ButtonPrimary margin={"0 0 0 20px"} type="submit" onClick={postRequest}>Oui, je souhaite modifier ce client</ButtonPrimary>
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
                <ButtonPrimary onClick={ ( e ) => { e.preventDefault(); setShowModal(false) } }>Réessayer</ButtonPrimary>
            </ModalFooter>
        </Fragment>
    )
}

const ModalSuccess = ({ message, idClient }) => {
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
                    <ButtonPrimaryLink to={ "/profile/" + idClient } margin={"0 10px"}>Voir la fiche client</ButtonPrimaryLink>
                    <ButtonPrimaryLink to={ "/" }>Retour à l'accueil</ButtonPrimaryLink>
                </Flexbox>
            </ModalFooter>
        </Fragment>
    )
}

