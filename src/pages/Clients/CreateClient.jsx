import React, {useEffect, useState} from "react";
import InputText from "../../components/Form/InputText";
import Flexbox from "../../templates/Flexbox";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import MainContainer from "../../templates/Container";
import ContactBlock from "../../components/Clients/ContactBlock";
import InputSelect from "../../components/Form/InputSelect";
import BtnAjout from "../../components/btn_ajout";
import {ButtonPrimary} from "../../utils/styles/button-primary";
import styled from "styled-components";
import {usePaginationFetch} from "../../components/Hook";
import InputAutoComplete from "../../components/Form/InputAutocomplete";
import Header from "../../components/Header";

const GroupList = styled.ul`
      margin-left: 0;
      padding-left: 0;
    `

const CreateClient = () => {

    const {items: activites, loading: loadingActivites, load: loadActivites} = usePaginationFetch('http://127.0.0.1:8000/api/naf_sous_classes');
    const [arrayActivites, setArrayActivites] = useState([]);
    useEffect(() => {
        setArrayActivites(activites);
        console.log(activites)
    }, [activites]);

    const {items: villesEntity, loading: loadingVilles, load: loadVilles} = usePaginationFetch('http://127.0.0.1:8000/api/villes');
    const [arrayVillesGroup, setArrayVillesGroup] = useState([]);
    useEffect(() => {
        setArrayVillesGroup(villesEntity);
    }, [villesEntity]);

    /* Input type Radio */
    const [billType, setBillType] = useState('mail');
    const [hasDeliveryAddress, setHasDeliveryAddress] = useState("false");

    /* On lance la fetch */
    useEffect(() => {
        loadVilles()
    }, [ loadVilles]);
    /* On lance la fetch */
    useEffect(() => {
        loadActivites()
    }, [ loadActivites]);


    /* On initialise les input text simple */
    const [inputSate, setInputState] = useState(
        {
            client_name: "",
            client_ape: "",
            client_phone: "",
            client_mail: "",
            client_street: "",
            client_website: ""
        }
    );
    /* On récupère la value des inputs text simple grace à leur "name" */
    const handleChangeInput = (e) => {
        const value = e.target.event;

        setInputState({
            ...inputSate,
            [e.target.name]: value
        });
    };

    /* #### input de recherche par nom de client #### */
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    /* Select villes suivant le code postal */
    const [disabledSelectVilles, setDisabledSelectVilles] = useState(true);
    /* On récupère la donnée voulue du select villes */
    const [selectVilles, setSelectVilles] = useState([]);

    /* On récupère la donnée voulue du select activites */
    const [selectActivites, setSelectActivites] = useState([]);

    /* On stocke les données de la requêtes dans un premier tableau "arrayVilles" */
    const arrayVilles= [];
    villesEntity.map( villes => arrayVilles.push({"villes": villes.nom, "cp" : villes.codePostal}) );

    /* On garde la correspondance avec le code postal saisi en réinitialisant
    un tableau "data" qu'on agrémente en filtrant les données du premier tableau
    qu'on insérera dans les data des options du select villes */
    /* On s'assure que l'input du code postal est de bonne longueur pour autoriser le select ville */
    const [data, setData] = useState([]);
    useEffect(() => {
        if(input.length === 4){
            setDisabledSelectVilles(false);
            setData(arrayVilles.filter( cp => cp.cp === input));
        } else {
            setDisabledSelectVilles(true);
        }
    }, [input]);


    /* CONTACTBLOCK COMPONENT */
    /* tableau des contacts du clients*/
    const [arrayContact, setArrayContact] = useState([]);
    /* On Créé un contactBlock à chaque clique de buttonAjout */
    const addContact = (e) => {
        e.preventDefault();
        setArrayContact(
            arrayContact.concat({"firstname": "", "lastname": "", "job": "", "phone": "", "mail": ""})
        );
        console.log(arrayContact);
    };
    /* On supprime un contactBlock à chaque clique de buttonRemove */
    const removeContact = (e, index) => {
        e.preventDefault();
        setArrayContact([...arrayContact.slice(0, index), ...arrayContact.slice(index + 1)]);
    };
    /* On insert les données pour chaque contactBlock */
    const insertDataFromChild = (newContact, index) => {
        arrayContact[index].firstname = newContact.firstname;
        arrayContact[index].lastname = newContact.lastname;
        arrayContact[index].job = newContact.job;
        arrayContact[index].phone = newContact.phone;
        arrayContact[index].mail = newContact.mail;
        setArrayContact(arrayContact);
    };
    /* ################# */
    /* ################# */


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    };

    return(
        <>
            <Header />
            <MainContainer>
                <h1>Créer un client</h1>
                <form onSubmit={handleSubmit}>
                <Flexbox>
                    <InputText label="Nom du client" name="client_name" onChange={handleChangeInput} value={inputSate.client_name} />
                    <InputSelect label={"Activité"}
                                 data={arrayActivites.map( (el, key) => ({id : key, value : el.libelle}))}
                                 option={"Activites"}
                                 optionValue={""}
                                 selectValue={selectActivites}
                                 setSelectValue={setSelectActivites}
                    />
                    <InputText label="Code APE" name="client_ape" onChange={handleChangeInput} value={inputSate.client_ape} />
                </Flexbox>
                <h2>Coordonnées</h2>
                <Flexbox>
                    <InputText label="Téléphone"
                               name="client_phone"
                               onChange={handleChangeInput}
                               value={inputSate.client_phone}
                    />
                    <InputText label="Mail"
                               name="client_mail"
                               onChange={handleChangeInput}
                               value={inputSate.client_mail}
                    />
                </Flexbox>
                <InputText label="Numéro et rue"
                           name="client_street"
                           onChange={handleChangeInput}
                           value={inputSate.client_street}
                />
                <Flexbox>
                    <InputAutoComplete label="Code postal"
                                       name="client_cp"
                                       type={"number"}
                                       input={input}
                                       setInput={setInput}
                                       activeSuggestionIndex={activeSuggestionIndex}
                                       setActiveSuggestionIndex={setActiveSuggestionIndex}
                                       filteredSuggestions={filteredSuggestions}
                                       setFilteredSuggestions={setFilteredSuggestions}
                                       showSuggestions={showSuggestions}
                                       setShowSuggestions={setShowSuggestions}
                                       resultFetch={arrayVillesGroup}
                                       property={"codePostal"}
                    />
                    <InputSelect label={"Villes"}
                                 data={data.map( (el, key) => ({id : key, value : el.villes}))}
                                 option={"Villes"}
                                 optionValue={""}
                                 selectValue={selectVilles}
                                 setSelectValue={setSelectVilles}
                                 disabled={disabledSelectVilles}
                    />
                </Flexbox>
                <InputText label="Site internet" name="client_website" onChange={handleChangeInput} value={inputSate.client_website} />
                <h2>Adresse de livraison</h2>
                <Flexbox>
                    <InputGroupRadio label={"Status du client"}
                                     setTypeClientRadio={setHasDeliveryAddress}
                                     selected={hasDeliveryAddress}
                                     name="isHasAddressDelivery"
                                     data={[{"id": "id1", "label": "Non", "value": "false"}, {"id": "id2", "label": "Oui", "value": "true"}]}
                    />
                </Flexbox>
                    {hasDeliveryAddress === "true" && (<div>
                        <InputText  label="Numéro et rue" name="client_address_delivery" />
                        <Flexbox>
                            <InputText  label="Code postal" name="client_cp_delivery" />
                            <InputText  label="Ville" name="client_city_delivery" />
                        </Flexbox>
                    </div>)  }
                <h2>Choix de la facturation</h2>
                <InputGroupRadio setTypeClientRadio={setBillType}
                                 selected={billType}
                                 name="typeBill"
                                 data={[{"id": "id1", "label": "Mail", "value": "mail"}, {"id": "id2", "label": "Courrier", "value": "courrier"}]}/>
                <h2>Contact</h2>
                <GroupList>
                    {arrayContact.map(
                        (contact, index) => <ContactBlock
                                                        key={Object.values(contact).join('*=*') + index}
                                                        numberContact={index}
                                                        firstname={contact.firstname}
                                                        lastname={contact.lastname}
                                                        job={contact.job}
                                                        phone={contact.phone}
                                                        mail={contact.mail}
                                                        onChange={(newContact) => insertDataFromChild(newContact, index)}
                                                        removeContact={(e) => removeContact(e, index)}
                                                    />
                    )}
                </GroupList>
                <BtnAjout text="Ajouter un contact" add={addContact}/>
                <ButtonPrimary type="submit">Créer le client</ButtonPrimary>
                </form>
            </MainContainer>
        </>
    )
}
export default CreateClient;