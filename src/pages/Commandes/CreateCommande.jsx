import React, {useEffect, useReducer, useState} from "react";
import MainContainer from "../../templates/Container";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import TitreForm from "../../templates/TitreForm";
import InputSelect from "../../components/Form/InputSelect";
import InputText from "../../components/Form/InputText";
import InputTextArea from "../../components/Form/InputTextArea";
import {ButtonPrimary} from "../../utils/styles/button";
import {useFetchGet} from "../../utils/misc/useFetchGet";
import Flexbox from "../../templates/Flexbox";
import styled from "styled-components";
import {InputStyle} from "../../utils/styles/InputStyle";
import {useFetchPost} from "../../utils/misc/useFetchPost";
import exclamation from "../../assets/images/exclamation.svg"
import {handleChangeInput} from "../../utils/misc/inputChange";

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

const CreateCommande = () => {

    /* On initialise les input text simple */
    const [ inputState, setInputState ] = useReducer(
        ( state, newState ) => ( {...state, ...newState} ),
        {
            // print
            number_prints: 0,

            // website maintenance
            website_adresse: "",

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
    )

    const[ typeCommande, setTypeCommande ] = useState({"value": "new_order", "id": "id1"} );
    const [ typeProduit, setTypeProduit ] = useState({"value": "communication", "id": 1} );
    const [ typeSupport, setTypeSupport ] = useState({"value": "print", "id": 1} );
    const [ typePrint, setTypePrint ] = useState({"value": "flyer", "id": 1} );
    const [ typeWeb, setTypeWeb ] = useState({"value": "create_site", "id": 1} );

    const [ selectClient, setSelectClient ] = useState( { value: "", valueDisplay: "" } );
    const [ contactClient, setContactClient ] = useState( { value: "", valueDisplay: "" } );
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


    const { items: clients, load: loadClients, loading: loadingClients } = useFetchGet("https://localhost:8000/api/clients");
    const { items: contactClients, load: loadContactsClients, loading: loadingContactsClients } = useFetchGet("https://localhost:8000/api/contactsByClient/" + selectClient.value);
    const { items: magazines, load: loadMagazines, loading: loadingMagazines } = useFetchGet("https://localhost:8000/api/magazines");
    const { items: magazinesByClient, load: loadMagazinesByClient, loading: loadingMagazinesByClient } = useFetchGet("https://localhost:8000/api/magazinesByClient/" + selectClient.value);
    const { items: editionsMagazine, load: loadEditionsMagazine, loading: loadingEditionsMagazine } = useFetchGet("https://localhost:8000/api/editionsByMagazine/" + selectMagazineTypeRegie.value);


    // On lance la requête pour récupérer les clients enregistrés en bdd
    useEffect( () =>{
        loadClients()
    }, [ loadClients ]);

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
    }, [ selectClient , contactClients.length ] );

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
            console.log("coucou")
        }
    }, [ typeSupport.value, selectClient.value ] );

    // on met à jour les editions lié au magazine choisi en rendant accessible ou non le select des editions
    useEffect( () => {
        if( selectMagazineTypeRegie.value !== "" ){
            loadEditionsMagazine();
            if( editionsMagazine.length > 0 ){
                setDisabledEditionsMagazine(false );
            } else {
                setDisabledEditionsMagazine(true );
            }
        } else {
            setDisabledEditionsMagazine(true );
        }
    }, [ selectMagazineTypeRegie , editionsMagazine.length ] );


    // On formate la date de fin de commercialisation pour l'afficher dans InformationBox pour savoir si le magazine est valide
    useEffect( () => {
        if( editionsMagazine && Object.keys(editionsMagazine).length > 0 && editionFound !== "" ){
            setEditionFound( editionsMagazine.find( el => el.id === parseInt(selectEditionMagazine.value) ) );
            const dateFormated = new Date( editionFound.finCommercialisation );
            const dateDeliveryFormated = dateFormated.toLocaleString('fr-FR', { "weekday": "long", "day": "2-digit", "month": "long", "year": "numeric" } );

            const newDateTime = dateFormated.getTime();
            const today = Date.now();
            const Difference_In_Time = newDateTime - today;
            const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            setNumberDayDateEditionToday( Math.floor( Difference_In_Days ) )
            setDateDelivery( dateDeliveryFormated );
        }
    }, [ selectEditionMagazine, editionFound  ] );


    // ##### Requête de création de formulaire ####
    // Print
    const { success: successPrint, post: postSupportPrint } = useFetchPost("https://localhost:8000/api/postCommandeSupportPrint",
        {
            "facturation": parseInt(inputState.bill) ,
            "reduction": parseInt(inputState.reduction_bill),
            "fin": new Date(inputState.delivery_date).toISOString(),
            "client": "api/clients/" + selectClient.value,
            "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id,
            "contact": [
                "api/contacts/" + contactClient.value,
            ],
            "supportPrint": {
                "quantite": parseInt(inputState.number_prints),
                "typePrint": "api/type_prints/" + typePrint.id
            },
            "historiqueClients": [
                {
                    "commentaire": inputState.commentaire_commande,
                    "client": "api/clients/" + selectClient.value,
                    "contact": "api/contacts/" + contactClient.value,
                    "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id
                }
            ],
            "statut": "api/commande_statuses/" + 1
        });

    console.log(inputState.delivery_date)
    // Website
    const { success: successWeb, post: postSupportWeb  } = useFetchPost("https://localhost:8000/api/postCommandeSupportWeb",
        {
            "facturation": parseInt(inputState.bill) ,
            "reduction": parseInt(inputState.reduction_bill),
            "fin":new Date(inputState.delivery_date).toISOString() ,
            "client": "api/clients/" + selectClient.value,
            "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id,
            "contact": [
                "api/contacts/" + contactClient.value,
            ],
            "supportWeb": {
                "url" : inputState.website_adresse,
                "typePrestation": "api/type_prestation_webs/" + typeWeb.id,
                "typeSite": "api/type_site_webs/" + 1
            },
            "historiqueClients": [
                {
                    "commentaire": inputState.commentaire_commande,
                    "client": "api/clients/" + selectClient.value,
                    "contact": "api/contacts/" + contactClient.value,
                    "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id
                }
            ],
            "statut": "api/commande_statuses/" + 1
        })

    // Contenu
    const { success: successContenu, post: postContenu } = useFetchPost("https://localhost:8000/api/postCommandeContenu",
        {
            "facturation": parseInt(inputState.bill) ,
            "reduction": parseInt(inputState.reduction_bill),
            "fin":new Date(inputState.delivery_date).toISOString() ,
            "client": "api/clients/" + selectClient.value,
            "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id,
            "contact": [
                "api/contacts/" + contactClient.value,
            ],
            "contenu": {
                "feuillets": parseInt(inputState.number_feuillets),
                "typeContenu": "api/type_contenus/" + typeContenu.id
            },
            "historiqueClients": [
                {
                    "commentaire": inputState.commentaire_commande,
                    "client": "api/clients/" + selectClient.value,
                    "contact": "api/contacts/" + contactClient.value,
                    "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id
                }
            ],
            "statut": "api/commande_statuses/" + 1
        });

    // Community management
    const {success: successCommunity, post: postCommunity } = useFetchPost("https://localhost:8000/api/postCommandeCommunity",
        {
            "facturation": parseInt(inputState.bill) ,
            "reduction": parseInt(inputState.reduction_bill),
            "fin":new Date(inputState.delivery_date).toISOString() ,
            "client": "api/clients/" + selectClient.value,
            "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id,
            "contact": [
                "api/contacts/" + contactClient.value,
            ],
            "communityManagement": {
                "postMensuel": parseInt(inputState.number_posts)
            },
            "historiqueClients": [
                {
                    "commentaire": inputState.commentaire_commande,
                    "client": "api/clients/" + selectClient.value,
                    "contact": "api/contacts/" + contactClient.value,
                    "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id
                }
            ],
            "statut": "api/commande_statuses/" + 1
        });

    // Support magazine
    const { success: successMagazine, post: postSupportMagazine } = useFetchPost("https://localhost:8000/api/postCommandeSupportMagazine",
        {
            "facturation": parseInt(inputState.bill) ,
            "reduction": parseInt(inputState.reduction_bill),
            "fin": new Date(inputState.delivery_date).toISOString() ,
            "client": "api/clients/" + selectClient.value,
            "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id,
            "contact": [
                "api/contacts/" + contactClient.value,
            ],
            "supportMagazine": {
                "pages": parseInt(inputState.magazine_number_pages),
                "quantite": parseInt(inputState.magazine_number_items),
                "nom": inputState.magazine_extension,
                "magazine": "api/magazines/" + selectMagazineTypeCommunication.value
            },
            "historiqueClients": [
                {
                    "commentaire": inputState.commentaire_commande,
                    "client": "api/clients/" + selectClient.value,
                    "contact": "api/contacts/" + contactClient.value,
                    "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id
                }
            ],
            "statut": "api/commande_statuses/" + 1
        });

    // Encart
    const { success: successEncart, post: postEncart } = useFetchPost("https://localhost:8000/api/postCommandeEncart",
        {
            "facturation": parseInt(inputState.bill) ,
            "reduction": parseInt(inputState.reduction_bill),
            "fin": new Date(inputState.delivery_date).toISOString() ,
            "client": "api/clients/" + selectClient.value,
            "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id,
            "contact": [
                "api/contacts/" + contactClient.value,
            ],
            "encart": {
                "emplacement": "api/emplacement_magazines/" + placeEncart.id,
                "format": "api/format_encarts/" + formatEncart.id,
                "editionMagazine": "api/edition_magazines/" + selectEditionMagazine.value
            },
            "historiqueClients": [
                {
                    "commentaire": inputState.commentaire_commande,
                    "client": "api/clients/" + selectClient.value,
                    "contact": "api/contacts/" + contactClient.value,
                    "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id
                }
            ],
            "statut": "api/commande_statuses/" + 1
        });

    // Si commentaire
    const {post: postHistoriqueCommande} = useFetchPost(
        "https://localhost:8000/api/historique_clients",
        {
            "commentaire": inputState.commentaire_commande,
            "client": "api/clients/" + selectClient.value,
            "contact": "api/contacts/" + contactClient.value,
            "user": "api/users/" + JSON.parse(localStorage.getItem("meUser")).id,
            "commande": "api/commandes/" + successWeb.id
        }
    )


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


    return(
        <>
            <MainContainer>
                <h1>Création d'une nouvelle commande</h1>
                <form onSubmit={ handleSubmit }>
                    <TitreForm titre="Type de commande" />
                    <InputGroupRadio
                        setRadioChecked={ setTypeCommande }
                        selected={ typeCommande }
                        name="type_commande"
                        data={ [
                            { "id": "id1", "label": "Nouvelle commande", "value": "new_order" },
                            { "id": "id2", "label": "Renouvellement", "value": "renewal" }
                        ] }
                    />
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
                        selectValue={ contactClient }
                        setSelectValue={ setContactClient }
                        option={ "Contact" }
                        optionValue={ "" }
                        disabled={ disabledContactClient }
                        required={ "required" }
                    />
                    { contactClients && loadingContactsClients === false && contactClients.length === 0 && selectClient.value !== "" && ( <Information>Aucun contact n'est disponible pour ce client</Information> ) }
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
                                    { typeWeb.value === "maintenance" && (
                                        <InputText
                                            label={ "Adresse du site" }
                                            placeholder={"Exemple: nomdusite.fr"}
                                            name={ "website_adresse" }
                                            onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                            required
                                        />
                                    ) }
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
                            <InputSelect
                                label={ "Choix de l'édition" }
                                name={ "edition_magazine" }
                                data={ editionsMagazine && editionsMagazine.map( ( edition, key ) => ( { id: key, value: edition.id, valueDisplay: edition.name } ) ) }
                                selectValue={ selectEditionMagazine }
                                setSelectValue={ setSelectEditionMagazine }
                                option={ "Edition du magazine" }
                                optionValue={ "" }
                                disabled={ disabledEditionsMagazine }
                                required
                            />
                            { ( selectMagazineTypeRegie.value !== "" && editionsMagazine.length === 0 && loadingEditionsMagazine === false ) &&
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
                                data={ [ {"id": 1, "label": "Couverture", "value": "cover" }, {"id": 2, "label": "2ème de couverture", "value": "cover_second" }, {"id": 3, "label": "3éme de couverture", "value": "cover_third" }, {"id": 4, "label": "4 ème de couverture", "value": "cover_last" }, { "id": 5, "label": "Intérieur", "value": "inside"} ] }
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
                    <InputTextArea
                        label={ "Commentaire" }
                        placeholder={ "Saisir des informations complémentaires" }
                        commentaireId={ "commentaire_commande" }
                        name={ "commentaire_commande" }
                        commentaireRows={ "10" }
                        commentaireCols={ "60" }
                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                    />
                    <InputText
                        label={ "Date d'échéance" }
                        type="date"
                        name="delivery_date"
                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                        required
                    />
                    <InputText
                        label="Montant de la facture"
                        placeholder={ "Exemple: 1500" }
                        name="bill"
                        onChange={ ( e ) => handleChangeInput(e, setInputState)}
                        required
                    />
                    <InputText
                        label="Montant de la réduction"
                        placeholder={ "Exemple: 100" }
                        name="reduction_bill"
                        onChange={ ( e ) => handleChangeInput(e, setInputState)}
                    />
                    <TotalPrice>Total: <span>{ inputState.bill - inputState.reduction_bill }</span> euros</TotalPrice>
                    <ButtonPrimary type="submit">Créer la commande</ButtonPrimary>
                </form>
            </MainContainer>
        </>
    )
}
export default CreateCommande;