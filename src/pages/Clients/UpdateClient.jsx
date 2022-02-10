import React, {useEffect, useReducer, useState, Fragment, useContext} from "react";
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
import TablePotentiality from "../../components/table/TablePotentiality";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal/Modal";
import {useHistory, useParams} from "react-router-dom";
import {useFetchPatch} from "../../utils/misc/fetch/useFetchPatch";
import DivButtonAction from "../../utils/styles/DivButton";
import {addPotentiality, removePotentiality} from "../../utils/misc/Potentialities/fonctions";
import {addContact, insertDataFromChild, removeContact} from "../../utils/misc/ContactBlock/functions";
import ModalConfirmClient from "./Modal/ModalConfirmClient";
import ModalResponse from "../../components/Modal/ModalResponse";
import InputText from "../../components/Form/InputText";
import {AddressServer} from "../App";


const GroupList = styled.ul`
  margin-left: 0;
  padding-left: 0;
`


const UpdateClient = () => {

    const {id} = useParams();
    const history = useHistory();
    const {items:client, load:loadClient, loading:loadingClient} = useFetchGet(useContext(AddressServer) + `api/clients/${id}`);

    useEffect(() => {
        loadClient();
    }, [loadClient])

    /* On initialise les input text simple */
    const [ inputState, setInputState ] = useReducer(
        ( state, newState ) => ({ ...state, ...newState }),
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
    /* a - villes principales client */
        /* Requête pour avoir les villes par rapport au code postal */
    const[ villes, setVilles ] = useState([] );
    /* On récupère la donnée voulue du select villes */
    const [ selectVilles, setSelectVilles ] = useState({"value": "", "valueDisplay": ""} );
    /* Select villes suivant le code postal */
    const [ disabledSelectVilles, setDisabledSelectVilles ] = useState(true );

    /* b - villes de livraison client */
        /* Requête pour avoir les villes par rapport au code postal */
    const[ villesDelivery, setVillesDelivery ] = useState([] );
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

    const [ billType, setBillType ] = useState({ "value": "mail", "id": 1 } );
    /* --- Statut Client --- */
    const [ clientStatut, setClientStatut ] = useState(  { "value":"prospect", "id": 1 } );
    const [ hasDeliveryAddress, setHasDeliveryAddress ] = useState(  { "value": "no", "id": 1 } );

    /* Modal */
    const [ showModal, setShowModal ] = useState(false );
    const [fieldsRequired, setFieldsRequired] = useState([]);

    /* --- Activites --- */
    /* Input Activite libelle */
    const[ activite, setActivite ] = useState("" );
    /* On remplace le point du code APE pour être conforme */
    const codeApe = inputState.client_ape && inputState.client_ape.replace(".", "" );

    /* Pour récupérer l'option sélectionnée */
    const [ selectPotentialityType, setSelectPotentiaityType ] = useState({"value": "", "valueDisplay": ""} );
    const [ selectMagazine, setSelectMagazine ] = useState({"value": "", "valueDisplay": ""} );
    const [ disabledSelectMagazine, setDisabledSelectMagazine ] = useState(true );

    /* Potentialités */
    /* Affichage des potentialité en Front */
    const [ dataPotentiality, setDataPotentiality ] = useState([] );
    /* Données des potentialités pour persister en BDD */
    const [ potentialitePost, setPotentialitePost ] = useState([] );

    /* Request */
    const {items: villesClient, load: loadVilles, loading:loadingVilles } = useFetchGet(useContext(AddressServer) + '/api/villesByCp/' + inputState.client_street_codePostal );
    const { items: villesClientDelivery, load: loadVillesDelivery, loading:loadingVillesDelivery } = useFetchGet(useContext(AddressServer) + '/api/villesByCp/' + inputState.client_street_codePostal_delivery );
    const { items: magazines, load: loadMagazines, loading: loadingMagazines }=  useFetchGet(useContext(AddressServer) + '/api/magazines' );
    const { items : activiteClient, load: loadActivite, loading: loadingActivite } = useFetchGet(useContext(AddressServer) + '/api/naf_sous_classes/' + codeApe );
    /* On lance une requête pour récupérer les types de potentialités */
    const{ items: potentialitiesTypes, loading: loadingPotentialities, load: loadPotentialities } = useFetchGet(useContext(AddressServer) + '/api/type_potentialites' );
    /* Etape 1: POST CLIENT */
    const { success: successPostClient, error: postClientError, post: postClient , loading: loadingPostClient, responseStatut } = useFetchPatch(
        useContext(AddressServer) + '/api/clients/' + client.id,
        {
            "raisonSociale": inputState.client_name,
            "statut": clientStatut === "client_validated" ? true : false,
            "telephone": inputState.client_phone,
            "email": inputState.client_mail,
            "siteInternet": inputState.client_website,
            "typeFacturation": billType === "mail" ? false : true,
            "nafSousClasse": "/api/naf_sous_classes/" + codeApe,
            "adresse": arrayAdressesClient,
            "contacts": arrayContact,
            "potentialites": potentialitePost
        }
    );


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
            }
        }
    }, [ inputState.client_ape ]);

    /* POTENTIALITÉS */
    useEffect(() => {
        loadPotentialities();
    }, [ loadPotentialities ] );

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
            client_phone: client.telephone && client.telephone,
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
            setHasDeliveryAddress({ "value": "yes", "id": 2 });
            setInputState({
                client_street_number_delivery: client.adresse && client.adresse[ 1 ].numero,
                client_street_wayType_delivery: client.adresse && client.adresse[ 1 ].typeVoie,
                client_street_name_delivery: client.adresse && client.adresse[ 1 ].nomVoie,
                client_street_codePostal_delivery: client.adresse && client.adresse[ 1 ].ville.codePostal,
            })
        }
    }, [ client.adresse ]);

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
        const selectAddress = document.querySelector('select[name="select_villes_client"]');
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
        client.typeFacturation === true && setBillType({ "value": "post", "id": 2 });
    }, [ client.typeFacturation ]);


    /* CONTACTBLOCK COMPONENT */
    // Mise à jour du tableau des contacts du client
    useEffect( () => {
        if(client.contacts && client.contacts.length > 0){
            setArrayContact(arrayContact.concat(client.contacts))
        }
    }, [ client.contacts ]);

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
    }, [ client.potentialites ]);

    /* On met à jour les éléments Required à chaque changement des dépendances */
    useEffect(() => {
        setFieldsRequired(document.querySelectorAll('[required]'));
    }, [ hasDeliveryAddress, arrayContact ]);


    const handleSubmit = ( e ) => {
        e.preventDefault();
        postClient();
    };

    const closeModal = () => {
        setShowModal(false)
    };

    if(loadingClient && loadingActivite && loadingPotentialities && loadingVilles && loadingVillesDelivery){
        return (
            <MainContainer>
                <Spinner />
            </MainContainer>
        )
    }

    return(
        <Fragment>
            <MainContainer>
                <DivButtonAction justify={"flex-start"}>
                    <ButtonReturn onClick={history.goBack} margin={"10px 0 0 0"}>Retour à la fiche client</ButtonReturn>
                </DivButtonAction>
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
                        <InputText
                            label={"Nom du client"}
                            type="text"
                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_name }
                            name="client_name"
                            required
                        />
                        <InputText
                                label={"Code APE"}
                                type="text"
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                value={ inputState.client_ape }
                                name="client_ape"
                                required
                            />

                            <InputText
                                label={"Activité"}
                                type="text"
                                value={ activite }
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                name="client_activite"
                                readOnly
                                disabled
                            />
                    </Flexbox>
                    <h2>Coordonnées</h2>
                    <Flexbox>
                            <InputText
                                label={"Téléphone"}
                                type="text"
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                value={ inputState.client_phone }
                                name="client_phone"
                            />
                            <InputText
                                label={"Email de l'entreprise"}
                                type="text"
                                onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                value={ inputState.client_mail }
                                name="client_mail"
                                required
                            />
                    </Flexbox>
                    <Flexbox>

                        <InputText
                            label={"Numéro"}
                            type="text"
                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_street_number }
                            name="client_street_number"
                            required
                        />

                        <InputText
                            label={"Type de voie"}
                            type="text"
                            onChange={( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_street_wayType }
                            name="client_street_wayType"
                            required
                        />
                        <InputText
                            label={"Nom de la voie"}
                            type="text"
                            onChange={( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_street_name }
                            name="client_street_name"
                            required
                        />
                    </Flexbox>
                    <Flexbox>
                        <InputText
                            label={"Code postal"}
                            type="number"
                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                            onWheel={ ( e ) => e.target.blur() }
                            value={ inputState.client_street_codePostal }
                            name="client_street_codePostal"
                            required
                        />
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


                        <InputText
                            label={"Site internet"}
                            type="text"
                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                            value={ inputState.client_website }
                            name="client_website"
                        />
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
                    {hasDeliveryAddress.value === "yes" &&
                        (<React.Fragment>
                            <Flexbox>
                                <InputText
                                    label={"Numéro"}
                                        type="number"
                                        onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                        value={ inputState.client_street_number_delivery }
                                        name="client_street_number_delivery"
                                        required
                                />
                                <InputText
                                    label={"Type de voie"}
                                    type="text"
                                    onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                    value={ inputState.client_street_wayType_delivery }
                                    name="client_street_wayType_delivery"
                                    required
                                />
                                <InputText
                                    label={"Rue"}
                                    type="text"
                                    onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                    value={ inputState.client_street_name_delivery }
                                    name="client_street_name_delivery"
                                    required
                                />
                            </Flexbox>
                            <Flexbox>
                                <InputText
                                    label={"CodePostal"}
                                    type="number"
                                    onChange={ ( e ) => handleChangeInput( e, setInputState) }
                                    onWheel={ ( e ) => e.target.blur() }
                                    value={ inputState.client_street_codePostal_delivery }
                                    name="client_street_codePostal_delivery"
                                    required
                                />
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
                        data={ [ {"id": 1, "label": "Mail", "value": "mail"}, {"id": 2, "label": "Courrier", "value": "post"} ] } />
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
                                    onChange={ ( newContact ) => insertDataFromChild( arrayContact, setArrayContact, newContact, index ) }
                                    removeContact={ () => removeContact( index, setArrayContact, arrayContact ) }
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
                            <BtnAjout
                                text={ "Ajouter la potentialité" }
                                margin={ "0 0 0 15px" }
                                add={ ( e ) => (
                                    addPotentiality(e, selectPotentialityType,
                                        setDataPotentiality,
                                        dataPotentiality,
                                        selectMagazine,
                                        setPotentialitePost,
                                        potentialitePost)
                                )
                                }/>
                        </Flexbox>
                        {dataPotentiality.length > 0 ? (
                            <TablePotentiality
                                headTable={ [ "Type", "Magazines" ] }
                                dataPotentiality={ dataPotentiality }
                                removePotentiality={ ( e, index ) => removePotentiality( e, index, setDataPotentiality, dataPotentiality ) }
                            />
                        ) : "Aucune potentialité"}
                    </div>
                    <ButtonPrimary margin={ "50px 0 0 0" } onClick={ () => {
                        const isValid = Object.values(fieldsRequired).every( item => (item && item.value !== "") || (item[0] && item[0].value !== "") )
                        if(isValid){ setShowModal(true) } } }>Modifier le client</ButtonPrimary>
                   </form>
            </MainContainer>
            { showModal && !loadingPostClient && !successPostClient.id &&
                <ModalConfirmClient
                    postRequest={handleSubmit}
                    field={inputState}
                    clientStatut={clientStatut}
                    ville={selectVilles}
                    villeDelivery={selectVillesDelivery}
                    deliveryAddress={hasDeliveryAddress}
                    billType={billType}
                    contacts={arrayContact}
                    potentialities={dataPotentiality}
                    closeModal={closeModal}
                    loading={loadingPostClient}
                />
            }
            { ( loadingPostClient ) && (
                <Modal closeModal={closeModal} justify={"center"} align={"center"}>
                    <Spinner />
                </Modal>
            )}
            {successPostClient.id &&
                <ModalResponse
                    type={"client"}
                    idType={successPostClient.id}
                    response={responseStatut}
                    closeModal={closeModal}
                />
            }
        </Fragment>
    )
}
export default UpdateClient;




