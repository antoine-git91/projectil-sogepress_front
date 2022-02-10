import React, {useContext, useEffect, useReducer, useState} from "react";
import MainContainer from "../../templates/Container";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import TitreForm from "../../templates/TitreForm";
import InputSelect from "../../components/Form/InputSelect";
import InputText from "../../components/Form/InputText";
import InputTextArea from "../../components/Form/InputTextArea";
import {ButtonPrimary, ButtonReturn} from "../../utils/styles/button";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import styled from "styled-components";
import exclamation from "../../assets/images/exclamation.svg"
import {handleChangeInput} from "../../utils/misc/input/inputChange";
import {useHistory, useParams} from "react-router-dom";
import {dateIsoFormated, setSelectDataRequest} from "../../utils/misc/Function";
import Spinner from "../../components/Spinner";
import {useFetchPatch} from "../../utils/misc/fetch/useFetchPatch";
import {AddressServer, UserContext} from "../App";
import DivButtonAction from "../../utils/styles/DivButton";
import Flexbox from "../../templates/Flexbox";
import {SectionForm} from "../Clients/CreateClient";
import Modal from "../../components/Modal/Modal";
import ModalConfirmCommande from "./modals/ModalConfirmCommande";
import ModalResponse from "../../components/Modal/ModalResponse";

const Information = styled.p`
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

const InformationBox = styled.div`
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


const UpdateCommande = () => {

    const { id_commande } = useParams();
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
            delivery_date: "",

            // facturation
            reduction_bill: "",
            bill: 0,
        }
    );


    const[ typeCommande, setTypeCommande ] = useState({ "value": "new_order", "id": "id1" } );
    const[ selectStatusesCommande, setSelectStatusesCommande ] = useState(  { "value": "", "valueDisplay": "" } );
    const [ typeProduit, setTypeProduit ] = useState({} );

    // Supports Type communication
    const [ typeSupport, setTypeSupport ] = useState({} );
    const [ typePrint, setTypePrint ] = useState({ "value": "flyer", "id": 1 } );
    const [ typeWeb, setTypeWeb ] = useState({ "value": "create_site", "id": 1 } );
    const [ typeContenu, setTypeContenu ] = useState({"value": "web", "id": 1} );
    const [ placeEncart, setPlaceEncart ] = useState({} );
    const [ formatEncart, setFormatEncart ] = useState({} );

    // Client & Contact Client
    const [ selectClient, setSelectClient ] = useState( { value: "", valueDisplay: "" } );
    const [ selectContactClient, setSelectContactClient ] = useState( { value: "", valueDisplay: "" } );
    const [ disabledContactClient, setDisabledContactClient ] = useState( true );

    // Communication Magazine
    const [ disabledSelectMagazineCommunication, setDisabledSelectMagazineCommunication ] = useState(true );
    const [ selectMagazineTypeCommunication, setSelectMagazineTypeCommunication ] = useState( { value: "", valueDisplay: "" } );

    // Regie magazine
    const [ disabledSelectMagazineRegie, setDisabledSelectMagazineRegie ] = useState(true );

    const [ selectMagazineTypeRegie, setSelectMagazineTypeRegie ] = useState( { value: "", valueDisplay: "" } );
    const [ selectEditionMagazine, setSelectEditionMagazine ] = useState( { value: "", valueDisplay: "" } );
    const [ editionFound, setEditionFound ] = useState( {} );

    const [ numberDayDateEditionToday, setNumberDayDateEditionToday ] = useState( 0 );
    const [ disabledEditionsMagazine, setDisabledEditionsMagazine ] = useState( true );

    // Echeance
    const [ dateDelivery, setDateDelivery ] = useState( "" );


    /* Requests Api */
    const { items: emplacementsEncart, loading: loadingEmplacementsEncart, load: loadEmplacementsEncart} = useFetchGet( useContext(AddressServer) + "/api/emplacement_magazines" );
    const { items: formatsEncart, loading: loadingFormatEncart, load: loadFormatEncart} = useFetchGet( useContext(AddressServer) + "/api/format_encarts" );

    const { items: commande, loading: loadingCommande, load: loadCommande} = useFetchGet( useContext(AddressServer) + "/api/commandes/" + id_commande );
    const { items: clients, load: loadClients, loading: loadingClients } = useFetchGet(useContext(AddressServer) + "/api/clients");
    const { items: contactClients, load: loadContactsClient, loading: loadingContactsClient } = useFetchGet(useContext(AddressServer) + "/api/contactsByClient/" + (commande.client && commande.client.slice(13)));

    const { items: web, load: loadWeb, loading: loadingWebCommande } = useFetchGet(useContext(AddressServer) + commande.supportWeb);
    const { items: print, load: loadPrint, loading: loadingPrintCommande } = useFetchGet(useContext(AddressServer) + commande.supportPrint);
    const { items: encart, load: loadEncart, loading: loadingEncartCommande } = useFetchGet(useContext(AddressServer) + commande.encart);

    const { items: magazinesByClient, load: loadMagazinesByClient, loading: loadingMagazinesByClient } = useFetchGet(useContext(AddressServer) + "/api/magazinesByClient/" + selectClient.value);
    const { items: magazineCommande, load: loadMagazineCommande, loading: loadingMagazineCommande } = useFetchGet(useContext(AddressServer) + commande.supportMagazine);

    const { items: magazinesEncart, load: loadMagazinesEncart, loading: loadingMagazinesEncart } = useFetchGet(useContext(AddressServer) + "/api/magazines");
    const { items: editionsByMagazine, load: loadEditionsByMagazine, loading: loadingEditionsByMagazine } = useFetchGet(useContext(AddressServer) + "/api/editionsByMagazine/" + selectMagazineTypeRegie.value);

    const { items: statusesCommande, load: loadStatusesCommande, loading: loadingStatusesCommande } = useFetchGet(useContext(AddressServer) + "/api/commande_statuses/" );


    // Requete pour récuperer les emplacements dispo des encarts
    useEffect( () => {
        loadEmplacementsEncart();
    }, [ loadEmplacementsEncart ] );

    // Requete pour récuperer les formats dispo des encarts
    useEffect( () => {
        loadFormatEncart();
    }, [ loadFormatEncart ] );

    // on lance la requete pour récuperer les magazines existant en base suivant le client
    useEffect( () => {
        loadStatusesCommande();
    }, [ loadStatusesCommande ] );

    // On lance la requête pour récupérer les clients enregistrés en bdd
    useEffect( () =>{
        loadCommande();
    }, [ loadCommande ]);

    // On lance la requête pour récupérer les clients enregistrés en bdd
    useEffect( () =>{
        loadClients();
    }, [ loadClients ] );

    // On lance la requête pour récupérer les clients enregistrés en bdd
    useEffect( () =>{
        selectClient.value !== "" &&loadContactsClient();
    }, [ selectClient.value ] );


    /* --- INITIALISATION DU FORMULAIRE AVEC LES DONEES DE LA COMMANDE --- */
    // On change les valeurs des inputText suivant les données reçues
    useEffect( () => {
        setInputState(
            {
                commande_name: commande.title,

                // print
                number_prints: print.quantite,

                // website maintenance
                website_adresse: web.url,
                server_name: web.server,

                //Contenu
                number_feuillets: commande.contenu && commande.contenu.feuillets,

                // community management
                number_posts: commande.communityManagement && commande.communityManagement.postMensuel,

                // magazine
                magazine_extension: magazineCommande.nom && magazineCommande.nom,
                magazine_number_pages: magazineCommande.pages && magazineCommande.pages,
                magazine_number_items: magazineCommande.quantite && magazineCommande.quantite,

                // echance
                delivery_date: commande.fin && new Date(commande.fin).toISOString().substring(0,10),

                // facturation
                reduction_bill: commande.reduction,
                bill: commande.facturation,
            }
        )
    }, [ commande, web.url, print.quantite, magazineCommande.nom ] );

    // GESTION DES RADIOS
    useEffect( () => {
        if( commande.encart ) { setTypeProduit({ id: 2, value: "regie" } ) }
        else {
            setTypeProduit({ id: 1, value: "communication" } );
            if( commande.supportWeb )
            { setTypeSupport({ id: 2, value: "web" } ); }
            else if( commande.supportPrint )
            { setTypeSupport({ id: 1, value: "print" } ); }
            else if( commande.contenu )
            { setTypeSupport({ id: 3, value: "contenu" } ); }
            else if( commande.communityManagement )
            { setTypeSupport({ id: 4, value: "community_management" } ); }
            else if( commande.supportMagazine )
            { setTypeSupport({ id: 5, value: "edition" } ); }
        }
    }, [commande] );

    // STATUT COMMANDE : Mise à jour du select statut avec les données de la commande
    useEffect( () => {
        if( commande.statut && !loadingCommande )
        {
            setSelectDataRequest(
                {
                    tagWanted: "statut_commande",
                    data: statusesCommande,
                    itemWanted: commande.statut.id,
                    setSelectState: setSelectStatusesCommande,
                    valueChosen: "id",
                    valueDisplayChosen: "libelle"
                }
            )
        }
    }, [ statusesCommande, loadingCommande ] );

    // CLIENT : Mise à jour du select client avec les données de la commande
    useEffect( () => {
        if( commande.client && !loadingCommande )
        {
            setSelectDataRequest({
                tagWanted: "client_commande",
                data: clients,
                itemWanted: parseInt(commande.client.slice(13)),
                setSelectState: setSelectClient,
                valueChosen: "id" ,
                valueDisplayChosen: "raisonSociale"
            } )
        }
    }, [ clients.length, loadingCommande ] );

    // CONTACT CLIENT : Mise à jour suivant de la commande
    useEffect( () => {
        if( contactClients.length > 0 )
        {
            setDisabledContactClient(false );
            setSelectDataRequest({
                tagWanted: "contacts_client",
                data: contactClients,
                itemWanted: (commande.contact && commande.contact[0].id),
                setSelectState: setSelectContactClient,
                valueChosen: "id",
                valueDisplayChosen: "fullname"
            })
        }
    }, [ contactClients.length ] );
;
    // IF SUPPORTWEB
    useEffect( () =>{
        commande.supportWeb && loadWeb();

        if(web.typePrestation){
            if(web.typePrestation.libelle === "Maintenance"){
                setTypeWeb({id: 2, value: "maintenance"});
            } else {
                setTypeWeb({id: 3, value: "hebergement"});
            }
        } else {
            setTypeWeb({id: 1, value: "create_site"});
        }
    }, [ commande, web.url ] );

    // IF SUPPORT PRINT
    useEffect( () =>{
        commande.supportPrint && loadPrint();

        if(print.typePrint){
            if(print.typePrint.libelle === "flyer"){
                setTypeWeb({id: 1, value: "flyer"});
            } else {
                setTypeWeb({id: 2, value: "autocollant"});
            }
        }
    }, [ commande, print.quantite ] );

    // IF SUPPORT MAGAZINE
    useEffect( () =>{
        commande.supportMagazine && selectClient.value === "" && loadMagazinesByClient();

        magazinesByClient.length > 0 && (
            setSelectDataRequest({
                tagWanted: "magazine_communication",
                data: magazinesByClient,
                itemWanted: magazineCommande.magazine && magazineCommande.magazine.id,
                setSelectState: setSelectMagazineTypeCommunication,
                valueChosen: "id",
                valueDisplayChosen: "nom",
            })
        )
    }, [ selectClient.value, magazinesByClient.length ] );


    // on récupère les données du magazine initial de la commande
    useEffect( () => {
        selectClient.value !== "" && commande.supportMagazine &&  loadMagazineCommande();
    }, [ selectClient.value ] );

    // IF ENCART
    // Magazine encart
    useEffect( () => {
        if( commande.encart ) {
            loadEncart();
        }

        magazinesEncart.length > 0 &&
        setSelectDataRequest({
            tagWanted: "magazine_regie",
            data: magazinesEncart,
            itemWanted: (encart.supportMagazine && encart.supportMagazine.magazine.id),
            setSelectState: setSelectMagazineTypeRegie,
            valueChosen: "id",
            valueDisplayChosen: "nom",
        })
    }, [ commande.encart, magazinesEncart.length ] );

    // Edition magazine encart
    useEffect( () => {
        editionsByMagazine.length > 0 &&
            setSelectDataRequest({
                tagWanted: "edition_magazine",
                data: editionsByMagazine,
                itemWanted: (encart.supportMagazine && encart.supportMagazine.id),
                setSelectState: setSelectEditionMagazine,
                valueChosen: "id",
                valueDisplayChosen: "nom",
            });
    }, [ editionsByMagazine.length ] );


    // emplacement encart et format
    useEffect( () => {
        encart.emplacement && setPlaceEncart({ id: encart.emplacement.id, value: encart.emplacement.id + "cover" , label: encart.emplacement.libelle });
        encart.format && setFormatEncart({ id: encart.format.id, value:encart.format.libelle.replace(" ", "") , label: encart.format.libelle })

    }, [ encart.length ]);

    // IF SUPPORT CONTENU ET SUPPORT COMMUNITY MANAGEMENT SONT GERE DIRECTEMENT DANS L'OBJET COMMANDE
    // ET DANS L'INITIALISATION DES INPUTS ( voir plus haut :  SETINPUTSTATE )
    /* --- ################################################################ --- */


    /* --- SI MODIFICATION --- */
    // TypeSupport : EDITION
    // on lance la requete pour récuperer les magazines existant en base suivant le client
    useEffect( () => {
        if( typeSupport.value === "edition" && selectClient.value !== "" ) { loadMagazinesByClient(); }
    }, [ typeSupport.value, selectClient.value ] );

    // on met à jour les magazines liés au client choisi en rendant accessible ou non le select des contacts
    useEffect( () => {
        if( typeSupport.value === "edition" && magazinesByClient.length > 0 ) { setDisabledSelectMagazineCommunication(false ); }
        else { setDisabledSelectMagazineCommunication(true ); }
    }, [ magazinesByClient.length ] );


    // Partie REGIE
    // IF REGIE on load tous les magazines et on rend accessible le select des magazines
    useEffect( () => {
        if( typeProduit.value === "regie" ) {
            loadMagazinesEncart();
            if( magazinesEncart.length > 0 ){ setDisabledSelectMagazineRegie(false ); } }
        else { setDisabledSelectMagazineRegie(true ); }
    }, [ typeProduit.value, magazinesEncart.length ] );

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
    // données communes à chaque commande
    const commonData = {
        "title": inputState.commande_name,
        "facturation": parseInt(inputState.bill) ,
        "reduction": parseInt(inputState.reduction_bill),
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
    }
    const { success: successPrint, post: patchSupportPrint, responseStatut: responseStatutPrint, loading: loadingPrint } = useFetchPatch(
        useContext(AddressServer) + "/api/patchSupportPrint/" + commande.id,
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
    const { success: successWeb, post: patchSupportWeb, responseStatut: responseStatutWeb, loading: loadingWeb  } = useFetchPatch(
        useContext(AddressServer) + "/api/patchSupportWeb/" + commande.id,
        Object.assign( commonData, webData ) );

    // Contenu
    const contenuData = {"contenu": {
            "feuillets": parseInt(inputState.number_feuillets),
            "typeContenu": "api/type_contenus/" + typeContenu.id
        }};
    const { success: successContenu, post: patchContenu, responseStatut: responseStatutContenu, loading: loadingContenu } = useFetchPatch(
        useContext(AddressServer) + "/api/patchCommandeContenu/" + commande.id,
        Object.assign( commonData, contenuData ) );

    // Community management
    const communityData = {
        "communityManagement": {
            "postMensuel": parseInt(inputState.number_posts)
        } };
    const {success: successCommunity, post: patchCommunity, responseStatut: responseStatutCommunity, loading: loadingCommunity } = useFetchPatch(
        useContext(AddressServer) + "/api/patchCommandeCommunity/" + commande.id,
        Object.assign( commonData, communityData ) );

    // Support magazine
    const magazineData = {
        "supportMagazine": {
            "pages": parseInt(inputState.magazine_number_pages),
            "quantite": parseInt(inputState.magazine_number_items),
            "nom": inputState.magazine_extension,
            "magazine": "api/magazines/" + selectMagazineTypeCommunication.value
        }
    };
    const { success: successMagazine, post: patchSupportMagazine, responseStatut: responseStatutMagazine, loading: loadingMagazine } = useFetchPatch(
        useContext(AddressServer) + "/api/patchSupportMagazine/" + commande.id,
        Object.assign( commonData, magazineData ) );

    // Encart
    const encartData = {
        "encart": {
            "emplacement": "api/emplacement_magazines/" + placeEncart.id,
            "format": "api/format_encarts/" + formatEncart.id,
            "supportMagazine": "api/support_magazines/" + selectEditionMagazine.value
        }
    }
    const { success: successEncart, post: patchEncart, responseStatut: responseStatutEncart, loading: loadingEncart } = useFetchPatch(
        useContext(AddressServer) + "/api/patchEncart/" + commande.id,
        Object.assign( commonData, encartData ) );


    const handleSubmit = ( e ) => {
        e.preventDefault();
        if( typeProduit.value === "communication" ){
            if( typeSupport.value === "print" ){
                patchSupportPrint();
            } else if( typeSupport.value === "web" ){
                patchSupportWeb();
            } else if( typeSupport.value === "contenu" ){
                patchContenu();
            } else if( typeSupport.value === "social" ){
                patchCommunity();
            } else if( typeSupport.value === "edition" ){
                patchSupportMagazine();
            }
        }
        else if( typeProduit.value === "regie" ){
            patchEncart();
        }
    }
    const [ showModal,setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }
    const [objectConfirm, setObjectConfirm] = useState({});

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


    return(
        <>
            <MainContainer>
                <DivButtonAction justify={"flex-start"}>
                    <ButtonReturn onClick={history.goBack} margin={"10px 0 0 0"}>Annuler et retour à la commande</ButtonReturn>
                </DivButtonAction>
                <h1>Modification de la commande: { commande.title }</h1>
                <form onSubmit={ handleSubmit }>
                    <SectionForm>
                        <TitreForm titre={ "Titre de la commande" } />
                        <InputText
                            label={ "Nom de la commande" }
                            name={ "commande_name" }
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            value={inputState.commande_name}
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
                        <InputSelect
                            label={ "Statut" }
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
                        <InputSelect label="Choix du client"
                                     name={ "client_commande" }
                                     data={ clients && clients.map( ( client, key ) => ( { id : key, value : client.id, valueDisplay: client.raisonSociale } ) ) }
                                     option={ "Client" }
                                     optionValue={ "" }
                                     selectValue={ selectClient }
                                     setSelectValue={ setSelectClient }
                                     required={ "required" }
                        />
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
                        { contactClients && loadingContactsClient === false && contactClients.length === 0 && selectClient.value !== "" && ( <Information>Aucun contact n'est disponible pour ce client</Information> ) }
                    </SectionForm>
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
                    </SectionForm>
                        { typeProduit.value === "communication" &&
                        <>
                            <SectionForm>
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
                                        { "id": "id4", "label": "Community Management", "value": "community_management" },
                                        { "id": "id5", "label": "Edition de magasine", "value": "edition" }
                                    ] }
                                    required
                                />
                            </SectionForm>

                            { typeSupport.value === 'print' && (
                                <SectionForm>
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
                                        value={ inputState.number_prints }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        required
                                    />
                                </SectionForm>
                            )}
                            { typeSupport.value === 'web' && (
                                <SectionForm>
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
                                            value={ inputState.website_adresse }
                                            required
                                        />
                                        <TitreForm titre={ "Serveur" } />
                                        <InputText
                                            label={ "Nom du serveur" }
                                            placeholder={"Exemple: o2Switch"}
                                            name={ "server_name" }
                                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                            value={ inputState.server_name }
                                            required
                                        />
                                    </>
                                    }
                                </SectionForm>
                            )}
                            { typeSupport.value === 'contenu' && (
                                <SectionForm>
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
                                        value={inputState.number_feuillets}
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        required
                                    />
                                </SectionForm>
                            )}
                            { typeSupport.value === 'community_management' && (
                                <SectionForm>
                                    <TitreForm titre={"Community Management"} />
                                    <InputText
                                        label={ "Nombre de poste par mois" }
                                        placeholder={ "Exemple: 5" }
                                        name={ "number_posts" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) }}
                                        value={ inputState.number_posts }
                                        required
                                    />
                                </SectionForm>
                            )}
                            { typeSupport.value === 'edition' && (
                                <SectionForm>
                                    <TitreForm titre="Magasine" />
                                    <InputSelect
                                        label={ "Nom du magasine" }
                                        name={ "magazine_communication" }
                                        data={ magazinesByClient && magazinesByClient.map( ( magazine, key ) => ( { id: key, value: magazine.id, valueDisplay: magazine.nom } ) ) }
                                        selectValue={ selectMagazineTypeCommunication }
                                        setSelectValue={ setSelectMagazineTypeCommunication }
                                        option={ "Magazines" }
                                        optionValue={ "" }
                                        required
                                        disabled={disabledSelectMagazineCommunication}
                                    />
                                    <InputText
                                        label={ "Extension du magasine" }
                                        placeholder={ "Exemple: Rentrée 2021" }
                                        name={ "magazine_extension" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        value={ inputState.magazine_extension }
                                        required
                                    />
                                    <InputText
                                        label={ "Nombre de pages" }
                                        placeholder={ "Exemple: 32" }
                                        name={ "magazine_number_pages" }
                                        type={ "number" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        value={ inputState.magazine_number_pages }
                                        required
                                    />
                                    <InputText
                                        label={ "Nombre d'unités" }
                                        placeholder={ "Exemple: 510" }
                                        name={ "magazine_number_items" }
                                        type={ "number" }
                                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                        value={ inputState.magazine_number_items }
                                        required
                                    />
                                </SectionForm>
                            )}
                        </>
                        }
                    { typeProduit.value === "regie" &&
                    <>
                        <SectionForm>
                            <TitreForm titre={ "Régie" } />
                            <InputSelect
                                label="Choix de magazine"
                                name={ "magazine_regie" }
                                data={ magazinesEncart && magazinesEncart.map( ( magazine, key ) => ( { id: key, value: magazine.id, valueDisplay: magazine.nom } ) ) }
                                selectValue={ selectMagazineTypeRegie }
                                setSelectValue={ setSelectMagazineTypeRegie }
                                option={ "Magasine" }
                                optionValue={ "" }
                                disabled={ disabledSelectMagazineRegie }
                                required
                            />
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
                        </SectionForm>
                        <SectionForm>
                            <InputGroupRadio
                                label={ "Choix de l'emplacement" }
                                name={ "place" }
                                data={ emplacementsEncart.map( emplacement => ( { "id": emplacement.id, "label":emplacement.libelle , "value": emplacement.id + "cover" } ) ) }
                                selected={ placeEncart }
                                setRadioChecked={ setPlaceEncart }
                                required
                            />
                            <InputGroupRadio
                                label={ "Choix de l'encart" }
                                name={ "format" }
                                data={ formatsEncart.map( format => ( { "id": format.id, "label":format.libelle , "value": format.libelle } ) ) }
                                selected={ formatEncart }
                                setRadioChecked={ setFormatEncart }
                                required
                            />
                        </SectionForm>
                    </>
                    }
                    <SectionForm>
                        <InputTextArea
                            label={ "Commentaire" }
                            placeholder={ "Saisir des informations complémentaires" }
                            commentaireId={ "commentaire_commande" }
                            name={ "commentaire_commande" }
                            commentaireRows={ "10" }
                            commentaireCols={ "60" }
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            value={ inputState.commentaire }
                        />
                    </SectionForm>
                    <SectionForm>
                        <InputText
                            label={ "Date d'échéance" }
                            type="date"
                            name="delivery_date"
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            value={ inputState.delivery_date }
                            required
                        />
                    </SectionForm>
                    <SectionForm>
                        <InputText
                            label="Montant de la facture"
                            placeholder={ "Exemple: 1500" }
                            name="bill"
                            onChange={ ( e ) => handleChangeInput(e, setInputState)}
                            value={ inputState.bill }
                            required
                        />
                        <InputText
                            label="Montant de la réduction"
                            placeholder={ "Exemple: 100" }
                            name="reduction_bill"
                            onChange={ ( e ) => handleChangeInput(e, setInputState)}
                            value={ inputState.reduction_bill }
                        />
                        <TotalPrice>Total: <span>{ inputState.bill - (isNaN(inputState.reduction_bill) ? 0 : inputState.reduction_bill) }</span> euros</TotalPrice>

                    </SectionForm>
                    <ButtonPrimary onClick={(e) => modalAndObject(e)}>Créer la commande</ButtonPrimary>
                </form>
            </MainContainer>
            { showModal && (
                <Modal closeButton={ closeModal } align={"center"} justify={"center"}>
                    { (!successWeb.id && !successPrint.id && !successContenu.id && !successCommunity.id && !successMagazine.id && !successEncart.id) && ( !loadingPrint && !loadingWeb && !loadingContenu && !loadingCommunity && !loadingMagazine && !loadingEncart ) && typeProduit.value === "communication"
                        ? ( <>
                            { typeSupport.value === "print" && <ModalConfirmCommande closeModal={closeModal} postRequest={patchSupportPrint} confirmFor={"commande_update"} summary={objectConfirm} /> }
                            { typeSupport.value === "web" && <ModalConfirmCommande closeModal={closeModal} postRequest={patchSupportWeb} confirmFor={"commande_update"} summary={objectConfirm} /> }
                            { typeSupport.value === "magasine" && <ModalConfirmCommande closeModal={closeModal} postRequest={patchSupportMagazine} confirmFor={"commande_update"} summary={objectConfirm} /> }
                            { typeSupport.value === "contenu" && <ModalConfirmCommande closeModal={closeModal} postRequest={patchContenu} confirmFor={"commande_update"} summary={objectConfirm} /> }
                            { typeSupport.value === "social" && <ModalConfirmCommande closeModal={closeModal} postRequest={patchCommunity} confirmFor={"commande_update"} summary={objectConfirm} /> }
                        </> )
                        : typeProduit.value === "regie" && <ModalConfirmCommande closeModal={closeModal} postRequest={patchEncart} confirmFor={"commande_create"} summary={objectConfirm} /> }

                    { successWeb.id && <ModalResponse type={"commande"} response={responseStatutWeb} setShowModal={setShowModal} idType={successWeb.id} /> }
                    { successPrint.id && <ModalResponse type={"commande"} response={responseStatutPrint} setShowModal={setShowModal} idType={successPrint.id} /> }
                    { successContenu.id && <ModalResponse type={"commande"} response={responseStatutContenu} setShowModal={setShowModal} idType={successContenu.id} /> }
                    { successCommunity.id && <ModalResponse type={"commande"} response={responseStatutCommunity} setShowModal={setShowModal} idType={successCommunity.id} /> }
                    { successMagazine.id && <ModalResponse type={"commande"} response={responseStatutMagazine} setShowModal={setShowModal} idType={successMagazine.id} /> }
                    { successEncart.id && <ModalResponse type={"commande"} response={responseStatutEncart} setShowModal={setShowModal} idType={successEncart.id} /> }
                    { ( loadingPrint || loadingWeb || loadingContenu || loadingCommunity || loadingMagazine || loadingEncart ) && <Spinner /> }
                </Modal>
            )}
        </>
    )
}
export default UpdateCommande;