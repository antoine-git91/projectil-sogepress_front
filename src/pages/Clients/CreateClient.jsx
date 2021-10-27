import React, {useEffect, useReducer, useState} from "react";
import Flexbox from "../../templates/Flexbox";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import MainContainer from "../../templates/Container";
import ContactBlock from "../../components/Clients/ContactBlock";
import InputSelect from "../../components/Form/InputSelect";
import BtnAjout from "../../components/btn_ajout";
import {ButtonPrimary, ButtonSecondary} from "../../utils/styles/button";
import styled from "styled-components";
import {handleChangeInput} from "../../utils/misc/inputChange";
import {InputStyle} from "../../utils/styles/InputStyle";
import {useFetchGet} from "../../utils/misc/useFetchGet";
import InputTextArea from "../../components/Form/InputTextArea";
import TablePotentiality from "../../components/table/TablePotentiality";
import Success from "../../components/MessageStateAction/Success";
import {useFetchPost} from "../../utils/misc/useFetchPost";
import Spinner from "../../components/Spinner";

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
    const [inputSate, setInputState] = useReducer(
        (state, newState) => ({...state, ...newState}),
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
            client_street_codePostal_delivery: "",
        }
    )


    /* Block de message lors de la réponse de la requête */
    const [createClientSuccess, setCreateClientSuccess] = useState(false);


    /* --- Activites --- */
    /* Input Activite libelle */
    const[activite, setActivite] = useState('');
    /* On remplace le point du code APE pour être conforme */
    const codeApe = inputSate.client_ape.replace(".", "");
    const {items : activiteClient, loading: loadingActivite, load: loadActivite} = useFetchGet('http://localhost:8000/api/naf_sous_classes/' + codeApe);


    /* --- Villes --- */
    /* a - villes client */
    /* Requête pour avoir les villes par raport au code postal */
    const[villes, setVilles] = useState([]);
    const {items: villesClient, load: loadVilles} = useFetchGet('http://localhost:8000/api/villesByCp/' + inputSate.client_street_codePostal);
    /* On récupère la donnée voulue du select villes */
    const [selectVilles, setSelectVilles] = useState({"value": "", "valueDisplay": ""});
    /* Select villes suivant le code postal */
    const [disabledSelectVilles, setDisabledSelectVilles] = useState(true);

    /* b - villes de livraison client */
    /* Requête pour avoir les villes par raport au code postal */
    const[villesDelivery, setVillesDelivery] = useState([]);
    const {items: villesClientDelivery, load: loadVillesDelivery} = useFetchGet('http://localhost:8000/api/villesByCp/' + inputSate.client_street_codePostal_delivery);
    /* On récupère la donnée voulue du select villes */
    const [selectVillesDelivery, setSelectVillesDelivery] = useState({"value": "", "valueDisplay": ""});
    /* Si adresse de livraison : Select villes suivant le code postal */
    const [disabledSelectVillesDelivery, setDisabledSelectVillesDelivery] = useState(true);

    /* --- Contact historique --- */
    /* On récupère la donnée voulue du select contact historique */
    const [selectContact, setSelectContact] = useState({"value": "", "valueDisplay": ""});
    /* Pour gérer l'acces au select de contact historique */
    const [disabledSelectContact, setDisabledSelectContact] = useState(true);

    /* Input type Radio */
    const [billType, setBillType] = useState(true);
    const [hasDeliveryAddress, setHasDeliveryAddress] = useState(false);
    const [clientStatut, setClientStatut] = useState(false);


    /* Partie contact commentaire */
    const [respSelectContact, setRespSelectContact] = useState({});
    const [respContactData, setRespContactData] = useState([]);
    useEffect(() => {
        respContactData && setRespSelectContact( respContactData.find(el => el.nom + " " + el.prenom === selectContact.valueDisplay))


    }, [respContactData])
    /* Function onBlur sur input APE */
    const getActivite = (e, setActivite) => {
        e.preventDefault();

        const valueLength = e.target.value.length;
        if(valueLength === 6 ){
            setTimeout(() => {
                loadActivite();
            }, 1000);
        }
        if(valueLength === 0){
            setActivite("");
        }
    };
    /* Mise à jour du state */
    useEffect(() => {
        setActivite(activiteClient.libelle);
    }, [activiteClient]);


    /* Function onBlur sur input code postal */
    const getVilles = (e, setVilles) => {
        e.preventDefault();

        const valueLength = e.target.value.length;

        if(valueLength === 5 ){
            setTimeout(() => {
                loadVilles();
                setDisabledSelectVilles(false);

            }, 1000);
        }
        if(valueLength === 0){
            setVilles("");
            setDisabledSelectVilles(true);
        }
    };
    /* Mise à jour du state */
    useEffect(() => {
        setVilles(villesClient);
    }, [villesClient]);

    /* Si adresse de livraison: Function onBlur sur input code postal */
    const getVillesDelivery = (e, setVillesDelivery) => {
        e.preventDefault();

        const valueLength = e.target.value.length;

        if(valueLength === 5 ){
            setTimeout(() => {
                loadVillesDelivery();
                setDisabledSelectVillesDelivery(false);

            }, 1000);
        }
        if(valueLength === 0){
            setVillesDelivery("");
            setDisabledSelectVillesDelivery(true);
        }
    };
    /* Mise à jour du state */
    useEffect(() => {
        setVillesDelivery(villesClientDelivery);
    }, [villesClientDelivery]);


    /* CONTACTBLOCK COMPONENT */
    /* tableau des contacts du clients*/
    const [arrayContact, setArrayContact] = useState([]);
    /* On Créé un contactBlock à chaque clique de buttonAjout */
    const addContact = (e) => {
        e.preventDefault();
        setArrayContact(
            arrayContact.concat({"nom": "","prenom": "", "fonction": "", "tel": "", "email": ""})
        );
        setDisabledSelectContact(true);
    };
    /* On supprime un contactBlock à chaque clique de buttonRemove */
    const removeContact = (e, index) => {
        e.preventDefault();
        setArrayContact([...arrayContact.slice(0, index), ...arrayContact.slice(index + 1)]);
    };
    /* On insert les données pour chaque contactBlock */
    const insertDataFromChild = (newContact, index) => {
        arrayContact[index].nom = newContact.nom;
        arrayContact[index].prenom = newContact.prenom;
        arrayContact[index].fonction = newContact.fonction;
        arrayContact[index].tel = newContact.tel;
        arrayContact[index].email = newContact.email;
        setArrayContact(arrayContact);
    };
    /* ################# */
    /* ################# */


    /* COMMENTAIRE */
    /* On lance la requête pour recupérer le type d'historique */
    const {items: typeHistorique, load: loadTypeHistorique, loading: loadingTypeHistorique } = useFetchGet('http://localhost:8000/api/type_historiques');
    /* On récupère le type d'historique choisi dans le select */
    const [selectContactType, setSelectContactType] = useState({"value": "", "valueDisplay": ""});
    useEffect(() => {
        loadTypeHistorique()
    }, [loadTypeHistorique]);
    /* On désactive le select du contact du commentaire si le nombre de contact est à 0 */
    useEffect(() => {
        if(arrayContact.length === 0 ){
            setDisabledSelectContact(true)
        }
    }, [arrayContact])
    /* Quand on clique sur le bouton de validation de contact pour mettre à jour le select contact pour l'historique */
    const valideContact = (e) => {
        e.preventDefault();

        arrayContact.forEach(el => {
            let count= 0
            for(let items in el){
                if(el[items].length > 2){
                    count++
                    if(count === 5){
                        setDisabledSelectContact(false);
                    }
                } else {
                    setDisabledSelectContact(true)
                }
            }
        })
    }
    /* ################# */
    /* ################# */

    /* POTENTIALITÉS */
    /* 1 - Potentialités types */
    /* On lance une requête pour récupérer les types de potentialités */
    const{items: potentialitiesTypes, loading: loadingPotentialities, load: loadPotentialities} = useFetchGet('http://localhost:8000/api/type_potentialites');
    useEffect(() => {
        loadPotentialities();
    }, [loadPotentialities]);
    /* Pour récupérer l'option sélectionnée */
    const [selectPotentialityType, setSelectPotentiaityType] = useState({"value": "", "valueDisplay": ""});
    /* 2 - Magazines */
    /* On lance une requête pour récupérer les magazines si potentialitiesType === Régie */
    const {items: magazines, load: loadMagazines, loading: loadingMagazines}=  useFetchGet('http://localhost:8000/api/magazines');
    const [selectMagazine, setSelectMagazine] = useState({"value": "", "valueDisplay": ""});
    const [disabledSelectMagazine, setDisabledSelectMagazine] = useState(true);
    /* Si le type de potentialités est de type Régie */
    useEffect(() => {
        if (selectPotentialityType.valueDisplay === "Régie"){
            setDisabledSelectMagazine(false)
            loadMagazines();
        } else {
            setDisabledSelectMagazine(true)
            setSelectMagazine({"value": "", "valueDisplay": ""})
        }
    }, [selectPotentialityType, loadMagazines]);

    const [dataPotentiality, setDataPotentiality] = useState([]);
    const addPotentiality = (e) => {
        e.preventDefault();
        if(selectPotentialityType.value !== ""){
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
        }
    };

    const removePotentiality = (e, index) => {
        e.preventDefault();
        console.log(index)
        setDataPotentiality([...dataPotentiality.slice(0, index), ...dataPotentiality.slice(index + 1)]);
    }


    /* --- POST CREATION CLIENT ---
    * 1 - POST CLIENT: on envoie les données pour créer le client en premier (nom, ape, tel, email)
    * 2 - POST ADRESSE CLIENT: une fois la reponse reçu, on récupère l'Id du nouveau client pour faire un second fetch sur l'adresse et ajouter ainsi l'adresse avec l'id Client.
    * 3 - POST ADRESSE DE LIVRAISON: Faire de même pour l'adresse de livraison.
    *  */

    /* Etape 1: POST CLIENT */
    const {success: postClientSuccess, error: b, post: postClient , loading: loadingClient} = useFetchPost(
        'http://localhost:8000/api/clients',
        {
            "raisonSociale": inputSate.client_name,
            "statut": clientStatut === "true" ? true : false,
            "email": inputSate.client_mail,
            "siteInternet": inputSate.client_website,
            "typeFacturation": billType === "true" ? true : false,
            "nafSousClasse": "/api/naf_sous_classes/" + codeApe,
            "contacts": arrayContact
        }
    )

    useEffect(() => {
        setRespContactData(postClientSuccess.contacts)
    }, [postClientSuccess])

    /* Étape 2: POST ADRESSE */
    const [loadingAdresse, setLoadingAdresse] = useState(true)
    useEffect(() => {
        if(postClientSuccess.id)
            fetch('http://localhost:8000/api/adresses', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    "numero": inputSate.client_street_number,
                    "typeVoie": inputSate.client_street_wayType,
                    "nomVoie": inputSate.client_street_name,
                    "ville": "/api/villes/" + selectVilles.value,
                    "client": "/api/clients/" + postClientSuccess.id,
                    "statutAdresse": true
                })
            })
            .then(response => {
                if (response.status === 201) {
                    console.log('adresse ok')
                    setLoadingAdresse(false)
                } else {
                    console.error(response)
                }
            })
    }, [postClientSuccess])


    /* Étapes 3: POST ADRESSE DE LIVRAISON */
    const [loadingAdresseDelivery, setLoadingAdresseDelivery] = useState(true)
    useEffect(() => {
        if(hasDeliveryAddress === true && postClientSuccess.id) {
            fetch('http://localhost:8000/api/adresses', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    "numero": inputSate.client_street_number_delivery,
                    "typeVoie": inputSate.client_street_wayType_delivery,
                    "nomVoie": inputSate.client_street_name_delivery,
                    "ville": "/api/villes/" + selectVillesDelivery.value,
                    "client": "/api/clients/" + postClientSuccess.id,
                    "statutAdresse": false
                })
            })
            .then(response => {
                if (response.status === 201) {
                    console.log('adresse ok')
                    setLoadingAdresseDelivery(false)
                } else {
                    console.error(response)
                }
            })
        }
    }, [postClientSuccess])

    /* Étape 4: POST HISTORIQUE */
    const [loadingHistorique, setLoadingHistorique] = useState(true)
    useEffect(() => {
        if(typeof respSelectContact != "undefined" && inputSate.commentaire !== undefined){
            fetch('http://localhost:8000/api/historique_clients', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    "commentaire": inputSate.commentaire,
                    "user": "/api/users/" + JSON.parse(localStorage.getItem('meUser')).id,
                    "client": "/api/clients/" + postClientSuccess.id,
                    "typeHistorique": "/api/type_historiques/" + selectContactType.value,
                    "contact":  "/api/contacts/" + respSelectContact.id
                })
            })
            .then(response => {
                if (response.status === 201) {
                    console.log('adresse ok')
                    setLoadingHistorique(false)
                } else {
                    console.error(response)
                }
            })
        }
    })


    /* Étape 5: POST POTENTIALITÉS */
    const [loadingPotentiality, setLoadingPotentiality] = useState(true)
    useEffect(() => {
        if(postClientSuccess.id && dataPotentiality.length > 0)
            dataPotentiality && dataPotentiality.map(el => {
                if (el.magazine.value !== "") {
                    fetch('http://localhost:8000/api/potentialites', {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization' : 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            "typePotentialite": "/api/type_potentialites/" + el.type.value,
                            "magazine": "/api/magazines/" + el.magazine.value,
                            "client": "/api/clients/" + postClientSuccess.id
                        })
                    })
                    .then(response => {
                        if (response.status === 201) {
                            console.log('potentialités ok')
                        } else {
                            console.error(response)
                        }
                    })
                } else {
                    fetch('http://localhost:8000/api/potentialites', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        "typePotentialite": "/api/type_potentialites/" + el.type.value,
                        "client": "/api/clients/" + postClientSuccess.id
                    })
                })
                    .then(response => {
                        if (response.status === 201) {
                            console.log('potentialités ok')
                            setLoadingPotentiality(false)
                        } else {
                            console.error(response)
                        }
                    })
                }
           })
    }, [postClientSuccess])
    /* ###################### */
    /* ###################### */


    const handleSubmit = (e) => {
        e.preventDefault();
        postClient();

    };

    const inputSelect = document.querySelectorAll('.inputSelect');
    useEffect(() => {
        if(loadingClient === false && loadingAdresse === false){
            setCreateClientSuccess(true);
        }
        for(let i = 0; i < inputSelect.length; i++) {
            inputSelect[i].selectedIndex = 0
        }
    },[postClientSuccess])

    return(
        <>
            <MainContainer>
                <h1>Créer un client</h1>
                <form onSubmit={handleSubmit}>
                    <Flexbox>
                        <InputGroupRadio label={"Statut du client"}
                                         setTypeClientRadio={setClientStatut}
                                         selected={clientStatut}
                                         name="client_statut"
                                         data={[{"id": "id1", "label": "Prospect", "value": false}, {"id": "id2", "label": "Acquis", "value": true}]}
                        />
                    </Flexbox>
                    <Flexbox>
                        <label>Nom du client
                            <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_name} name="client_name" required/>
                        </label>
                        <label>Code APE
                            <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} onBlur={(e) => getActivite(e, setActivite)} value={inputSate.client_ape} name="client_ape" required />
                        </label>
                        <label>Activité
                            <InputStyle type="text" value={activite} onChange={(e) => handleChangeInput(e, setInputState)} name="client_activite" readOnly disabled />
                        </label>
                    </Flexbox>
                    <h2>Coordonnées</h2>
                    <Flexbox>
                        <label>Téléphone
                            <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_phone} name="client_phone" />
                        </label>
                        <label>Email de l'entreprise
                            <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_mail} name="client_mail" />
                        </label>
                    </Flexbox>
                    <Flexbox>
                    <label>Numéro
                        <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_street_number} name="client_street_number" />
                    </label>
                    <label>Type de voie
                        <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_street_wayType} name="client_street_wayType" />
                    </label>
                    <label>Rue
                        <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_street_name} name="client_street_name" />
                    </label>
                    </Flexbox>
                    <Flexbox>
                        <label>Code postal
                            <InputStyle type="number" onChange={(e) => handleChangeInput(e, setInputState)}  onBlur={(e) => getVilles(e, setVilles)} onWheel={(e) => e.target.blur()} value={inputSate.client_street_codePostal} name="client_street_codePostal" />
                        </label>
                        <InputSelect name={"select_villes_client"}
                                     label={"Villes"}
                                     data={villes && villes.map( (el, key) => ({id : key, value : el.id, valueDisplay: el.nom}))}
                                     option={"Villes"}
                                     optionValue={""}
                                     selectValue={selectVilles}
                                     setSelectValue={setSelectVilles}
                                     disabled={disabledSelectVilles}
                        />
                    </Flexbox>
                    <label>Site internet
                        <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_website} name="client_website" />
                    </label>
                    <h2>Adresse de livraison</h2>
                    <Flexbox>
                        <InputGroupRadio label={"Différente de l'adresse de facturation"}
                                         setTypeClientRadio={setHasDeliveryAddress}
                                         selected={hasDeliveryAddress}
                                         name="isHasAddressDelivery"
                                         data={[{"id": "id1", "label": "Non", "value": false}, {"id": "id2", "label": "Oui", "value": true}]}
                        />
                    </Flexbox>
                    {hasDeliveryAddress === "true" &&
                        (<>
                            <Flexbox>
                                <label>Numéro
                                    <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_street_number_delivery} name="client_street_number_delivery" required />
                                </label>
                                <label>Type de voie
                                    <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_street_wayType_delivery} name="client_street_wayType_delivery"  required/>
                                </label>
                                <label>Rue
                                    <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.client_street_name_delivery} name="client_street_name_delivery"  required/>
                                </label>
                            </Flexbox>
                            <Flexbox>
                                <label>Code postal
                                    <InputStyle type="number" onChange={(e) => handleChangeInput(e, setInputState)}  onBlur={(e) => getVillesDelivery(e, setVillesDelivery)} onWheel={(e) => e.target.blur()} value={inputSate.client_street_codePostal_delivery} name="client_street_codePostal_delivery" required />
                                </label>
                                <InputSelect name={"select_villes_delivery"}
                                             label={"Villes"}
                                             data={villesDelivery && villesDelivery.map( (el, key) => ({id : key, value : el.id, valueDisplay: el.nom}))}
                                             option={"Villes"}
                                             optionValue={""}
                                             selectValue={selectVillesDelivery}
                                             setSelectValue={setSelectVillesDelivery}
                                             disabled={disabledSelectVillesDelivery}
                                />
                            </Flexbox>
                        </>)
                    }
                    <h2>Choix de la facturation</h2>
                    <InputGroupRadio setTypeClientRadio={setBillType}
                                     selected={billType}
                                     name="typeBill"
                                     data={[{"id": "id1", "label": "Mail", "value": true}, {"id": "id2", "label": "Courrier", "value": false}]}/>
                    <h2>Contact</h2>
                    <GroupList>
                        {arrayContact.map(
                            (contact, index) => <ContactBlock
                                key={Object.values(contact).join('*=*') + index}
                                numberContact={index}
                                firstname={contact.prenom}
                                lastname={contact.nom}
                                job={contact.fonction}
                                phone={contact.tel}
                                mail={contact.email}
                                onChange={(newContact) => insertDataFromChild(newContact, index)}
                                removeContact={(e) => removeContact(e, index)}
                            />
                        )}
                    </GroupList>
                    <Flexbox align={"baseline"}>
                        <BtnAjout text="Ajouter un contact" add={addContact}/>
                        {(arrayContact.length > 0) && (
                            <>
                            <span>ou</span>
                            <ButtonSecondary margin={"0 0 0 15px"} onClick={(e) => valideContact(e)}>Valider les contact</ButtonSecondary>
                            </>
                            )
                        }
                    </Flexbox>
                    <div>
                        <h2>Commentaire</h2>
                        <CommentaireBox>
                            <div>
                                <InputSelect name={"select_contact_historiques"}
                                             label={"Contact"}
                                             data={arrayContact && arrayContact.map( (el, key) => ({id : key, value : key, valueDisplay: el.nom + " " + el.prenom}))}
                                             option={"Saisir le contact"}
                                             optionValue={""}
                                             selectValue={selectContact}
                                             setSelectValue={setSelectContact}
                                             disabled={disabledSelectContact}
                                />
                                <InputSelect label={"Type de contact"}
                                             data={typeHistorique ? typeHistorique.map( (el, key) => ({id : key, value : el.id, valueDisplay: el.libelle})): ""}
                                             option={"Saisir le type de contact"}
                                             optionValue={""}
                                             selectValue={selectContactType}
                                             setSelectValue={setSelectContactType}
                                             disabled={false}
                                />
                            </div>
                            <div>
                                <InputTextArea label={"Saisir votre comentaire:"} commentaireRows={10} onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.commentaire} name="commentaire" required/>
                            </div>
                        </CommentaireBox>
                    </div>
                    <div>
                        <h2>Indice de potentialité</h2>
                        <Flexbox align={"center"}>
                            <InputSelect name={"select_potentialities_types"}
                                         label={"Type de potentialité"}
                                         data={potentialitiesTypes && potentialitiesTypes.map( (el, key) => ({id : key, value : el.id, valueDisplay: el.libelle}))}
                                         option={"Saisir le type de contact"}
                                         optionValue={""}
                                         selectValue={selectPotentialityType}
                                         setSelectValue={setSelectPotentiaityType}
                                         disabled={false}
                            />
                            <InputSelect name={"select_magazines"}
                                         label={"Nom du magazine si type encard"}
                                         data={magazines.map( (el, key) => ({id : key, value : el.id, valueDisplay: el.nom}))}
                                         option={"Saisir le type de contact"}
                                         optionValue={""}
                                         selectValue={selectMagazine}
                                         setSelectValue={setSelectMagazine}
                                         disabled={disabledSelectMagazine}
                            />
                            <BtnAjout text={"Ajouter la potentialité"} margin={"0 0 0 15px"} add={addPotentiality} />
                        </Flexbox>
                        <TablePotentiality headTable={["Type", "Magazine", ""]} dataPotentiality={dataPotentiality} removePotentiality={(e, index) => removePotentiality(e, index)} />
                    </div>
                    <ButtonPrimary type="submit">Créer le client</ButtonPrimary>
                </form>
            </MainContainer>
            {createClientSuccess && <Success messageTitle={"Demande Validée"} messageText={"Votre profil a bien été mis à jour"} statut={'success'} />}
        </>
    )
}
export default CreateClient;