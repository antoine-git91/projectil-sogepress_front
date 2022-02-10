import React, {useContext, useEffect, useReducer, useState} from "react";
import MainContainer from "../../templates/Container";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import TitreForm from "../../templates/TitreForm";
import InputSelect from "../../components/Form/InputSelect";
import InputText from "../../components/Form/InputText";
import InputTextArea from "../../components/Form/InputTextArea";
import {ButtonPrimary, ButtonReturn} from "../../utils/styles/button";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import Flexbox from "../../templates/Flexbox";
import styled from "styled-components";
import {useFetchPost} from "../../utils/misc/fetch/useFetchPost";
import exclamation from "../../assets/images/exclamation.svg"
import {handleChangeInput} from "../../utils/misc/input/inputChange";
import Spinner from "../../components/Spinner";
import {AddressServer, UserContext} from "../App";
import {SectionForm} from "../Clients/CreateClient";
import Modal from "../../components/Modal/Modal";
import ModalConfirmCommande from "./modals/ModalConfirmCommande";
import {dateIsoFormated} from "../../utils/misc/Function";
import ModalResponse from "../../components/Modal/ModalResponse";
import DivButtonAction from "../../utils/styles/DivButton";
import {useHistory} from "react-router-dom";

export const Information = styled.p`
  color: #ce4040;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  
  &:before{
    content: url(${exclamation});
    margin-right: 5px;
    vertical-align: middle;
  }
`

export const InformationBox = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #e1e1e1;
  
  p span{
    font-weight: bold;
  }
`

const TotalPrice = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`

const CreateCommande = ( { loadCa } ) => {

    const meUser = useContext(UserContext);
    const history = useHistory();

    /* On initialise les input text simple */
    const [ inputState, setInputState ] = useReducer(
        ( state, newState ) => ( {...state, ...newState} ),
        {

            commande_name: "",

            // print
            number_prints: 0,

            // website maintenance
            website_adresse: "",
            server_name: "",

            //Contenu
            number_feuillets: 0,

            // community management
            number_posts: 0,

            // magazine
            magazine_extension: "",
            magazine_number_pages: 0,
            magazine_number_items: 0,

            // commantaire
            commentaire_commande: "",

            // echance
            delivery_date: null,

            // facturation
            reduction_bill: null,
            bill: 0,
        }
    );

    const[ typeCommande, setTypeCommande ] = useState({ "value": "new_order", "id": "id1" } );
    const[ selectStatusesCommande, setSelectStatusesCommande ] = useState(  { "value": "", "valueDisplay": "" } );
    const [ typeProduit, setTypeProduit ] = useState({ "value": "communication", "id": 1 } );
    const [ typeSupport, setTypeSupport ] = useState({ "value": "print", "id": 1 } );
    const [ typePrint, setTypePrint ] = useState({ "value": "flyer", "id": 1 } );
    const [ typeWeb, setTypeWeb ] = useState({ "value": "create_site", "id": 1 } );

    const [ selectClient, setSelectClient ] = useState( { value: "", valueDisplay: "" } );
    const [ selectContactClient, setSelectContactClient ] = useState( { value: "", valueDisplay: "" } );
    const [ disabledContactClient, setDisabledContactClient ] = useState( true );

    const [ magazineNameEditionMagazine, setMagazineNameEditionMagazine ] = useState(true );
    const [ selectMagazineTypeCommunication, setSelectMagazineTypeCommunication ] = useState( { value: "", valueDisplay: "" } );
    const [ selectMagazineTypeRegie, setSelectMagazineTypeRegie ] = useState( { value: "", valueDisplay: "" } );
    const [ selectEditionMagazine, setSelectEditionMagazine ] = useState( { value: "", valueDisplay: "" } );
    const [ editionFound, setEditionFound ] = useState( {} );

    const [ dateDelivery, setDateDelivery ] = useState( "" );
    const [ numberDayDateEditionToday, setNumberDayDateEditionToday ] = useState( 0 );
    const [ disabledEditionsMagazine, setDisabledEditionsMagazine ] = useState( true );

    const [ placeEncart, setPlaceEncart ] = useState({"value": "cover", "id":1} );
    const [ formatEncart, setFormatEncart ] = useState({"value": "1/16", "id": 9} );

    const [ typeContenu, setTypeContenu ] = useState({"value": "web", "id": 1} );

    const [ showModal,setShowModal] = useState(false);
    const [objectConfirm, setObjectConfirm] = useState({});

    /* Requests Api */
    const { items: clients, load: loadClients, loading: loadingClients } = useFetchGet(useContext(AddressServer) + "/api/clients");
    const { items: contactClients, load: loadContactsClients, loading: loadingContactsClients } = useFetchGet(useContext(AddressServer) + "/api/contactsByClient/" + selectClient.value);
    const { items: magazines, load: loadMagazines, loading: loadingMagazines } = useFetchGet(useContext(AddressServer) + "/api/magazines");
    const { items: magazinesByClient, load: loadMagazinesByClient, loading: loadingMagazinesByClient } = useFetchGet(useContext(AddressServer) + "/api/magazinesByClient/" + selectClient.value);
    const { items: editionsByMagazine, load: loadEditionsByMagazine, loading: loadingEditionsByMagazine } = useFetchGet(useContext(AddressServer) + "/api/editionsByMagazine/" + selectMagazineTypeRegie.value);
    const { items: statusesCommande, load: loadStatusesCommande, loading: loadingStatusesCommande } = useFetchGet(useContext(AddressServer) + "/api/commande_statuses/" );


    // On lance la requête pour récupérer les clients enregistrés en bdd
    useEffect( () =>{
        loadClients()
    }, [ loadClients ]);

    // on lance la requete pour récuperer le nom des magazines existant en base suivant le type de support ou le type de produit
    useEffect( () => {
        if(typeProduit.value === "regie"){
            loadMagazines();
        }
    }, [ typeProduit.value ] );

    // on lance la requete pour récuperer les magazines existant en base suivant le client
    useEffect( () => {
        if( typeSupport.value === "magasine" && selectClient.value !== "" ){
            loadMagazinesByClient();
        }
    }, [ typeSupport.value, selectClient.value ] );

    // on lance la requete pour récuperer les magazines existant en base suivant le client
    useEffect( () => {
            loadStatusesCommande();
    }, [ loadStatusesCommande ] );


    // on met à jour les contacts lié au client choisi en rendant accessible ou non le select des contacts
    useEffect( () => {
        if( selectClient.value !== "" ){
            loadContactsClients();
            if( magazinesByClient.length > 0 ){
                setMagazineNameEditionMagazine(false );
            }
            if( contactClients.length > 0 ){
                setDisabledContactClient(false );
            } else {
                setDisabledContactClient(true );
            }
        } else {
            setDisabledContactClient(true );
            setMagazineNameEditionMagazine(true );
        }
    }, [ selectClient , contactClients.length, magazinesByClient.length ] );


    // Si MagazineSelect choisi on load les editions du magazine et on rend accessible le selectEdition
    useEffect( () => {
        if( selectMagazineTypeRegie.value !== "" ){
            loadEditionsByMagazine();
            if( editionsByMagazine && editionsByMagazine.length > 0 )
            {
                setDisabledEditionsMagazine(false );
            }
            else { setDisabledEditionsMagazine(true ); }
        }
        else { setDisabledEditionsMagazine(true ); }
    }, [ selectMagazineTypeRegie , editionsByMagazine.length ] );
    // #############


    // On formate la date de fin de commercialisation pour l'afficher dans InformationBox pour savoir si le magazine est valide
    useEffect( () => {
        if( editionsByMagazine && Object.keys(editionsByMagazine).length > 0 && selectEditionMagazine.value !== "" ){
            setEditionFound( editionsByMagazine.find( el => el.id === parseInt(selectEditionMagazine.value) ) );

            const dateDeliveryFormated = editionFound.commande && new Date(editionFound.commande.fin).toLocaleString('fr-FR', { "weekday": "long", "day": "2-digit", "month": "long", "year": "numeric" } );

            const newDateTime = editionFound.commande && new Date(editionFound.commande.fin);
            const today = Date.now();
            const Difference_In_Time = newDateTime - today;
            const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            setNumberDayDateEditionToday( Math.floor( Difference_In_Days ) )
            setDateDelivery( dateDeliveryFormated );
        }
    }, [ selectEditionMagazine.value, editionFound.id ] );


    // ##### Requête de création de formulaire ####
    const commonData = {
        "title": inputState.commande_name,
        "facturation": parseInt(inputState.bill) ,
        "reduction": parseInt(inputState.reduction_bill),
        "fin": new Date( inputState.delivery_date ).toISOString(),
        "client": "api/clients/" + selectClient.value,
        "user": "api/users/" + meUser.id,
        "contact": [
            "api/contacts/" + selectContactClient.value,
        ],
        "historiqueClients": [
            {
                "commentaire": inputState.commentaire_commande,
                "client": "api/clients/" + selectClient.value,
                "contact": "api/contacts/" + selectContactClient.value,
                "user": "api/users/" + meUser.id
            }
        ],
        "statut": "api/commande_statuses/" + selectStatusesCommande.value
    };

    // Print
    const printData = {
        "supportPrint": {
            "quantite": parseInt(inputState.number_prints),
            "typePrint": "api/type_prints/" + typePrint.id
        }
    };
    const { success: successPrint, post: postSupportPrint, loading: loadingPrint, responseStatut: responseStatutPrint, error: errorPrint } = useFetchPost(
        useContext(AddressServer) + "/api/postCommandeSupportPrint",
        Object.assign( commonData, printData )
    );

    // Website
    const webData = {
        "supportWeb": {
            "url" : inputState.website_adresse,
            "typePrestation": "api/type_prestation_webs/" + typeWeb.id,
            "typeSite": "api/type_site_webs/" + 1,
            "server": inputState.server_name
        }
    };
    const { success: successWeb, post: postSupportWeb, loading: loadingWeb, responseStatut: responseStatutWeb, error: errorWeb  } = useFetchPost(
        useContext(AddressServer) + "/api/postCommandeSupportWeb",
        Object.assign( commonData, webData )
    );

    // Contenu
    const contenuData = {
        "contenu": {
            "feuillets": parseInt(inputState.number_feuillets),
            "typeContenu": "api/type_contenus/" + typeContenu.id
        }
    };
    const { success: successContenu, post: postContenu, loading: loadingContenu, responseStatut: responseStatutContenu, error: errorContenu } = useFetchPost(
        useContext(AddressServer) + "/api/postCommandeContenu",
        Object.assign( commonData, contenuData )
    );

    // Community management
    const communityData = {
        "communityManagement": {
            "postMensuel": parseInt(inputState.number_posts)
        }
    };
    const {success: successCommunity, post: postCommunity, loading: loadingCommunity, responseStatut: responseStatutCommunity, error: errorCommunity } = useFetchPost(
        useContext(AddressServer) + "/api/postCommandeCommunity",
        Object.assign( commonData, communityData )
    );

    // Support magazine
    const magazineData = {
        "supportMagazine": {
            "pages": parseInt(inputState.magazine_number_pages),
            "quantite": parseInt(inputState.magazine_number_items),
            "nom": inputState.magazine_extension,
            "magazine": "api/magazines/" + selectMagazineTypeCommunication.value
        }
    };
    const { success: successMagazine, post: postSupportMagazine, loading: loadingMagazine, responseStatut: responseStatutMagazine, error: errorMagazine } = useFetchPost(
        useContext(AddressServer) + "/api/postCommandeSupportMagazine",
        Object.assign( commonData, magazineData )
    );

    // Encart
    const encartData = {
        "encart": {
            "emplacement": "api/emplacement_magazines/" + placeEncart.id,
            "format": "api/format_encarts/" + formatEncart.id,
            "supportMagazine": "api/support_magazines/" + selectEditionMagazine.value
        }
    };
    const { success: successEncart, post: postEncart, loading: loadingEncart, responseStatut: responseStatutEncart, error: errorEncart } = useFetchPost(
        useContext(AddressServer) + "/api/postCommandeEncart",
        Object.assign( commonData, encartData )
    );


    const handleSubmit = ( e ) => {
        e.preventDefault();
        if( typeProduit.value === "communication" ){
            if( typeSupport.value === "print" ){
                postSupportPrint();
            } else if( typeSupport.value === "web" ){
                postSupportWeb();
            } else if( typeSupport.value === "contenu" ){
                postContenu();
            } else if( typeSupport.value === "social" ){
                postCommunity();
            } else if( typeSupport.value === "magasine" ){
                postSupportMagazine();
            }
        }
         else if( typeProduit.value === "regie" ){
            postEncart();
        }
    }

    useEffect( () => {
        ( successPrint.id || successWeb.id || successMagazine.id || successCommunity.id || successContenu.id || successEncart.id ) && loadCa()
    }, [ successPrint.id, successWeb.id, successMagazine.id, successCommunity.id, successContenu.id, successEncart.id ])


    const closeModal = () => {
        setShowModal(false);
    };

    let objectSummary;
    useEffect( () => {
        objectSummary = {
            title : inputState.commande_name,
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
        }

        if(typeSupport.value === "print"){
            Object.assign( objectSummary, {
                type_print: typePrint.value,
                print_quantity: inputState.number_prints
            })
        }

        if(typeSupport.value === "web"){
            Object.assign( objectSummary, {
                type_web: typeWeb.value
            })

            if(typeWeb.value === "maintenance" || typeWeb.value === "hebergement"){
                Object.assign( objectSummary, {
                    address_website: inputState.website_adresse,
                    server: inputState.server_name
                })
            }
        }

        if( typeSupport.value === "contenu"){
            Object.assign( objectSummary, {
                type_contenu : typeContenu.value,
                number_feuillets : inputState.number_feuillets
            })
        }

        if( typeSupport.value === "social"){
            Object.assign( objectSummary, {
                number_posts : inputState.number_posts
            })
        }

        if( typeSupport.value === "magazine"){
            Object.assign( objectSummary, {
                magazine_name: selectMagazineTypeCommunication.valueDisplay,
                magazine_extension: inputState.magazine_extension,
                number_pages: inputState.magazine_number_pages,
                magazine_quantity: inputState.magazine_number_items
            })
        }

        if(typeProduit.value === "regie"){
            Object.assign( objectSummary, {
                magazine_choice: selectMagazineTypeRegie.valueDisplay,
                extension_choice: selectEditionMagazine.valueDisplay,
                place_choice: placeEncart.value,
                encart_choice: formatEncart.value
            })
        }
    });

    const modalAndObject = (e) => {
        e.preventDefault();
        setShowModal(true);
        setObjectConfirm(objectSummary)
    };

    if( loadingClients || loadingStatusesCommande ){
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
                <h1>Création d'une nouvelle commande</h1>
                <form onSubmit={ handleSubmit }>
                    <TitreForm titre={ "Titre de la commande" } />
                    <SectionForm>
                        <InputText
                            label={ "Nom de la commande" }
                            name={ "commande_name" }
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            placeholder={ "Saisir le nom de la commande" }
                            required
                        />
                    </SectionForm>
                    <SectionForm>
                        <TitreForm titre={ "Type de commande" } />
                        <InputGroupRadio
                            setRadioChecked={ setTypeCommande }
                            selected={ typeCommande }
                            name="type_commande"
                            data={ [
                                { "id": "id1", "label": "Nouvelle commande", "value": "new_order" },
                                { "id": "id2", "label": "Renouvellement", "value": "renewal" }
                            ] }
                        />
                    </SectionForm>
                    <SectionForm>
                        <TitreForm titre={ "Statut de la commande" } />
                        <InputSelect label="Statut"
                                     name={ "statut_commande" }
                                     data={ statusesCommande && statusesCommande.map( ( status, key ) => ( { id : key, value : status.id, valueDisplay: status.libelle } ) ) }
                                     option={ "Client" }
                                     optionValue={ "" }
                                     selectValue={ selectStatusesCommande }
                                     setSelectValue={ setSelectStatusesCommande }
                                     required={ "required" }
                        />
                    </SectionForm>
                    <SectionForm>
                        <TitreForm titre="Client" />
                        <Flexbox>
                            <InputSelect label="Choix du client"
                                         name={ "client_commande" }
                                         data={ clients && clients.map( ( client, key ) => ( { id : key, value : client.id, valueDisplay: client.raisonSociale } ) ) }
                                         option={ "Client" }
                                         optionValue={ "" }
                                         selectValue={ selectClient }
                                         setSelectValue={ setSelectClient }
                                         required={ "required" }
                            />
                            <Flexbox align={"center"}>
                                <InputSelect
                                    label="Choix du contact par défault"
                                    name={ "contacts_client" }
                                    data={ contactClients && contactClients.map( (contact, key) => ( { id: key, value: contact.id ,valueDisplay: contact.nom + " " + contact.prenom  } ) ) }
                                    selectValue={ selectContactClient }
                                    setSelectValue={ setSelectContactClient }
                                    option={ "Contact" }
                                    optionValue={ "" }
                                    disabled={ disabledContactClient }
                                    required={ "required" }
                                />
                                { loadingContactsClients && <Spinner className={"little"} /> }
                            </Flexbox>
                        </Flexbox>
                    </SectionForm>
                    { contactClients && loadingContactsClients === false && contactClients.length === 0 && selectClient.value !== "" && ( <Information>Aucun contact n'est disponible pour ce client</Information> ) }
                    <SectionForm>
                        <TitreForm titre={ "Type de produit" } />
                        <InputGroupRadio
                            setRadioChecked={ setTypeProduit }
                            selected={ typeProduit }
                            name={ "type_produit" }
                            data={ [
                                { "id": "1", "label": "Support de communication", "value": "communication" },
                                { "id": "2", "label": "Régie", "value": "regie" }
                            ] }
                        />
                        { typeProduit.value === "communication" &&
                        <>
                            <TitreForm titre="Support de communication" />
                            <InputGroupRadio
                                label="Type de support"
                                setRadioChecked={setTypeSupport}
                                name="type_support"
                                selected={ typeSupport }
                                data={ [
                                    { "id": "id1", "label": "Produit imprimé", "value": "print" },
                                    { "id": "id2", "label": "Site internet", "value": "web" },
                                    { "id": "id3", "label": "Contenu", "value": "contenu" },
                                    { "id": "id4", "label": "Community Management", "value": "social" },
                                    { "id": "id5", "label": "Edition de magasine", "value": "magasine" }
                                ] }
                                required
                            />
                            { typeSupport.value === 'print' && (
                                <>
                                    <TitreForm titre={"Produit imprimé"} />
                                    <InputGroupRadio
                                        label={"Type de produit imprimé"}
                                        setRadioChecked={setTypePrint}
                                        selected={typePrint}
                                        name="format"
                                        data={ [
                                            { "id": 1, "label": "Flyer", "value": "flyer" },
                                            { "id": 2, "label": "Autocollant", "value": "autocollant" }
                                        ] }
                                        required
                                    />
                                    <InputText
                                        label={ "Nombre d'exemplaires" }
                                        placeholder={ "Exemple: 350" }
                                        type={ "number" }
                                        name={ "number_prints" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        required
                                    />
                                </>
                            )}
                            { typeSupport.value === 'web' && (
                                <>
                                    <TitreForm titre={"Site internet"} />
                                    <InputGroupRadio
                                        setRadioChecked={setTypeWeb}
                                        selected={typeWeb}
                                        label={ "type de contrat Web" }
                                        name={ "format" }
                                        data={ [ { "id": 1, "label": "Création de site", "value": "create_site" }, { "id": 2, "label": "Maintenance", "value": "maintenance" }, { "id": 3, "label": "Hébergement", "value": "hebergement" } ] }
                                        required
                                    />
                                    { (typeWeb.value === "maintenance" || typeWeb.value === "hebergement") &&
                                    <>
                                        <InputText
                                            label={ "Adresse du site" }
                                            placeholder={"Exemple: nomdusite.fr"}
                                            name={ "website_adresse" }
                                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                            required
                                        />
                                        <TitreForm titre={ "Serveur" } />
                                        <InputText
                                            label={ "Nom du serveur" }
                                            placeholder={"Exemple: o2Switch"}
                                            name={ "server_name" }
                                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                            required
                                        />
                                    </>
                                    }
                                </>
                            )}
                            { typeSupport.value === 'contenu' && (
                                <>
                                    <TitreForm titre="Contenu" />
                                    <InputGroupRadio
                                        label={ "Type de contenu" }
                                        name={ "type_contenu" }
                                        data={ [ { "id": 1, "label": "Web", "value": "web" }, { "id": 2, "label": "Print", "value": "print" } ] }
                                        selected={ typeContenu }
                                        setRadioChecked={ setTypeContenu }
                                        required
                                    />
                                    <InputText
                                        label={ "Nombre de feuillets" }
                                        placeholder={"Exemple: 20"}
                                        name={ "number_feuillets" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        required
                                    />
                                </>
                            )}
                            { typeSupport.value === 'social' && (
                                <>
                                    <TitreForm titre={"Community Management"} />
                                    <InputText
                                        label={ "Nombre de poste par mois" }
                                        placeholder={ "Exemple: 5" }
                                        name={ "number_posts" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) }}
                                        required
                                    />
                                </>
                            )}
                            { typeSupport.value === 'magasine' && (
                                <>
                                    <TitreForm titre="Magasine" />
                                    <Flexbox align={"center"}>
                                        <InputSelect
                                            label={ "Nom du magasine" }
                                            name={ "magazine_communication" }
                                            data={ magazinesByClient && magazinesByClient.map( ( magazine, key ) => ( { id: key, value: magazine.id, valueDisplay: magazine.nom } ) ) }
                                            selectValue={ selectMagazineTypeCommunication }
                                            setSelectValue={ setSelectMagazineTypeCommunication }
                                            option={ "Magazines" }
                                            optionValue={ "" }
                                            required
                                            disabled={magazineNameEditionMagazine}
                                        />
                                        { loadingMagazinesByClient && <Spinner className={"little"} /> }
                                    </Flexbox>
                                    <InputText
                                        label={ "Extension du magasine" }
                                        placeholder={ "Exemple: Rentrée 2021" }
                                        name={ "magazine_extension" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        required
                                    />
                                    <InputText
                                        label={ "Nombre de pages" }
                                        placeholder={ "Exemple: 32" }
                                        name={ "magazine_number_pages" }
                                        type={ "number" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        required
                                    />
                                    <InputText
                                        label={ "Nombre d'unités" }
                                        placeholder={ "Exemple: 510" }
                                        name={ "magazine_number_items" }
                                        type={ "number" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        required
                                    />
                                </>
                            )}
                        </>
                        }
                        { typeProduit.value === "regie" &&
                        <>
                            <TitreForm titre={ "Régie" } />
                            <Flexbox align={"center"}>
                                <InputSelect
                                    label="Choix de magazine"
                                    name={ "magazine_regie" }
                                    data={ magazines && magazines.map( ( magazine, key ) => ( { id: key, value: magazine.id, valueDisplay: magazine.nom } ) ) }
                                    selectValue={ selectMagazineTypeRegie }
                                    setSelectValue={ setSelectMagazineTypeRegie }
                                    option={ "Magasine" }
                                    optionValue={ "" }
                                    required
                                />
                                { loadingMagazines && <Spinner className={"little"} /> }
                            </Flexbox>
                            <Flexbox align={"center"}>
                                <InputSelect
                                    label={ "Choix de l'édition" }
                                    name={ "edition_magazine" }
                                    data={ editionsByMagazine && editionsByMagazine.map( ( edition, key ) => ( { id: key, value: edition.id, valueDisplay: edition.nom } ) ) }
                                    selectValue={ selectEditionMagazine }
                                    setSelectValue={ setSelectEditionMagazine }
                                    option={ "Edition du magazine" }
                                    optionValue={ "" }
                                    disabled={ disabledEditionsMagazine }
                                    required
                                />
                                { loadingEditionsByMagazine && <Spinner className={"little"} /> }
                            </Flexbox>
                            { ( selectMagazineTypeRegie.value !== "" && editionsByMagazine.length === 0 && !loadingEditionsByMagazine ) &&
                            <Information>Aucune édition n'est disponible pour ce magasine</Information>
                            }
                            { ( selectEditionMagazine.value !== "" && numberDayDateEditionToday < 30 && numberDayDateEditionToday > 0 ) &&
                            <InformationBox>
                                <p>Information : La fin de commercialisation de ce magasine est prévu dans <span>{ numberDayDateEditionToday.toString() }</span> jours soit le <span>{ dateDelivery }</span>.</p>
                            </InformationBox>
                            }
                            { ( selectEditionMagazine.value !== "" && numberDayDateEditionToday < 0 ) &&
                            <InformationBox>
                                <p>Attention : La fin de commercialisation de ce magasine est dépassé de  <span>{ Math.abs(numberDayDateEditionToday).toString() }</span> jours en date du <span>{ dateDelivery }</span>.</p>
                            </InformationBox>
                            }
                            <InputGroupRadio
                                label={ "Choix de l'emplacement" }
                                name={ "place" }
                                data={ [ {"id": 1, "label": "1ére de couverture", "value": "cover" }, {"id": 2, "label": "2ème de couverture", "value": "cover_second" }, {"id": 3, "label": "3éme de couverture", "value": "cover_third" }, {"id": 4, "label": "4 ème de couverture", "value": "cover_last" }, { "id": 5, "label": "Intérieur", "value": "inside"} ] }
                                selected={ placeEncart }
                                setRadioChecked={ setPlaceEncart }
                                required
                            />
                            <InputGroupRadio
                                label={ "Choix de l'encart" }
                                name={ "format" }
                                data={ [ { "id": 9, "label": "1/16", "value": "1/16"}, {"id": 1, "label": "1/8", "value": "1/8" }, {"id": 2, "label": "1/4", "value": "1/4" }, {"id": 3, "label": "1/2", "value": "1/2" }, {"id": 4, "label": "Pleine page", "value": "full" } ] }
                                selected={ formatEncart }
                                setRadioChecked={ setFormatEncart }
                                required
                            />
                        </>
                        }
                    </SectionForm>
                    <SectionForm>
                        <InputTextArea
                            label={ "Commentaire" }
                            placeholder={ "Saisir des informations complémentaires" }
                            commentaireId={ "commentaire_commande" }
                            name={ "commentaire_commande" }
                            commentaireRows={ "10" }
                            commentaireCols={ "60" }
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                        />
                    </SectionForm>
                    <SectionForm>
                        <InputText
                            label={ "Date d'échéance" }
                            type="date"
                            name="delivery_date"
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            required
                        />
                    </SectionForm>
                    <SectionForm>
                        <InputText
                            type={"number"}
                            label="Montant de la facture"
                            placeholder={ "Exemple: 1500" }
                            name="bill"
                            onChange={ ( e ) => handleChangeInput(e, setInputState)}
                            required
                        />
                        <InputText
                            type={"number"}
                            label="Montant de la réduction"
                            placeholder={ "Exemple: 100" }
                            name="reduction_bill"
                            onChange={ ( e ) => handleChangeInput(e, setInputState)}
                        />
                        <TotalPrice>Total: <span>{ inputState.bill - inputState.reduction_bill }</span> euros</TotalPrice>
                    </SectionForm>
                    <ButtonPrimary onClick={(e) => (modalAndObject(e))}>Créer la commande</ButtonPrimary>
                </form>
            </MainContainer>
            { showModal && (
                <Modal closeButton={ closeModal } align={"center"} justify={"center"}>
                    { !successWeb.id && !successPrint.id && !successContenu.id && !successCommunity.id && !successMagazine.id && !successEncart.id && ( !loadingPrint && !loadingWeb && !loadingContenu && !loadingCommunity && !loadingMagazine && !loadingEncart ) && ( typeProduit.value === "communication" )
                        ? ( <>
                            { typeSupport.value === "print" && <ModalConfirmCommande closeModal={closeModal} postRequest={postSupportPrint} confirmFor={"commande_create"} summary={objectConfirm} /> }
                            { typeSupport.value === "web" && <ModalConfirmCommande closeModal={closeModal} postRequest={postSupportWeb} confirmFor={"commande_create"} summary={objectConfirm} /> }
                            { typeSupport.value === "magasine" && <ModalConfirmCommande closeModal={closeModal} postRequest={postSupportMagazine} confirmFor={"commande_create"} summary={objectConfirm} /> }
                            { typeSupport.value === "contenu" && <ModalConfirmCommande closeModal={closeModal} postRequest={postContenu} confirmFor={"commande_create"} summary={objectConfirm} /> }
                            { typeSupport.value === "social" && <ModalConfirmCommande closeModal={closeModal} postRequest={postCommunity} confirmFor={"commande_create"} summary={objectConfirm} /> }
                        </> )
                        : typeProduit.value === "regie" && <ModalConfirmCommande closeModal={closeModal} postRequest={postEncart} confirmFor={"commande_create"} summary={objectConfirm} /> }

                    { successWeb.id && <ModalResponse type={"commande"} response={responseStatutWeb} closeModal={closeModal} idType={successWeb.id} /> }
                    { successPrint.id && <ModalResponse type={"commande"} response={responseStatutPrint} closeModal={closeModal} idType={successPrint.id} /> }
                    { successContenu.id && <ModalResponse type={"commande"} response={responseStatutContenu} closeModal={closeModal} idType={successContenu.id} /> }
                    { successCommunity.id && <ModalResponse type={"commande"} response={responseStatutCommunity} closeModal={closeModal} idType={successCommunity.id} /> }
                    { successMagazine.id && <ModalResponse type={"commande"} response={responseStatutMagazine} closeModal={closeModal} idType={successMagazine.id} /> }
                    { successEncart.id && <ModalResponse type={"commande"} response={responseStatutEncart} closeModal={closeModal} idType={successEncart.id} /> }
                    { ( loadingPrint || loadingWeb || loadingContenu || loadingCommunity || loadingMagazine || loadingEncart ) && <Spinner /> }
                </Modal>
            )}
        </>
    )
}
export default CreateCommande;
