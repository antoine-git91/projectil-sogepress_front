import React, {useEffect, useState} from "react";
import InputText from "../../../components/Form/InputText";
import Flexbox from "../../../templates/Flexbox";
import InputGroupRadio from "../../../components/Form/radio/InputGroupRadio";
import MainContainer from "../../../templates/Container";
import ContactBlock from "./ContactBlock";
import InputSelect from "../../../components/Form/InputSelect";
import BtnAjout from "../../../components/btn_ajout";
import {ButtonPrimary} from "../../../utils/styles/button-primary";
import styled from "styled-components";
import {usePaginationFetch} from "../../../components/Hook";

const GroupList = styled.ul`
      margin-left: 0;
      padding-left: 0;
    `

const CreateClient = () => {

    const [arrayContact, setArrayContact] = useState([]);
    const [hasDeliveryAddress, setHasDeliveryAddress] = useState("false")

    const {items: activites, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/naf_sous_classes');
    const [arrayActivites, setArrayActivites] = useState([]);

    useEffect(() => {
        setArrayActivites(arrayActivites)
    }, [activites])

    console.log(arrayActivites)
    useEffect(() => load(), [load]);

    const [inputSate, setInputState] = useState(
        {
            client_name: "",
            client_ape: "",
            client_phone: "",
            client_mail: "",
            client_street: "",
            client_website: ""
        }
    )

    const handleChangeInput = (e) => {
        const value = e.target.event;

        setInputState({
            ...inputSate,
            [e.target.name]: value
        })
    }

    const addContact = (e) => {
        e.preventDefault();
        setArrayContact(
            arrayContact.concat({"firstname": "", "lastname": "", "job": "", "phone": "", "mail": ""})
        )
        console.log(arrayContact)
    };

    const removeContact = (e, index) => {
        e.preventDefault();
        setArrayContact([...arrayContact.slice(0, index), ...arrayContact.slice(index + 1)]);
    };

    const insertDataFromChild = (newContact, index) => {
        arrayContact[index].firstname = newContact.firstname;
        arrayContact[index].lastname = newContact.lastname;
        arrayContact[index].job = newContact.job;
        arrayContact[index].phone = newContact.phone;
        arrayContact[index].mail = newContact.mail;
        setArrayContact(arrayContact);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    };

    //TODO a refecto
    const [deliverySelect, setDeliverySelect] = useState('false');
    const getValueDelivery = (e) => {
        setDeliverySelect(e.target.value)
    };

    const [billTypeSelect, setBillTypeSelect] = useState('mail');
    const getValueBill = (e) => {
        setBillTypeSelect(e.target.value)
    };
    // ENDTODO

    return(
        <MainContainer>
            <h1>Créer un client</h1>
            <form onSubmit={handleSubmit}>
            <Flexbox>
                <InputText label="Nom du client" name="client_name" onChange={handleChangeInput} value={inputSate.client_name} />
                <InputSelect label={"Activité"} data={arrayActivites.map( (el, key) => ({id : key, value : el}))} />
                <InputText label="Code APE" name="client_ape" onChange={handleChangeInput} value={inputSate.client_ape} />
            </Flexbox>
            <h2>Coordonnées</h2>
            <Flexbox>
                <InputText label="Téléphone" name="client_phone" onChange={handleChangeInput} value={inputSate.client_phone} />
                <InputText label="Mail" name="client_mail" onChange={handleChangeInput} value={inputSate.client_mail} />
            </Flexbox>
            <InputText label="Numéro et rue" name="client_street" onChange={handleChangeInput} value={inputSate.client_street} />
            <Flexbox>
                <InputText label="Code postal" name="client_cp" />
                <InputText label="Ville" name="client_city" />
            </Flexbox>
            <InputText label="Site internet" name="client_website" onChange={handleChangeInput} value={inputSate.client_website} />
            <h2>Adresse de livraison</h2>
            <Flexbox>
                <InputGroupRadio label={"Status du client"} setTypeClientRadio={setHasDeliveryAddress}  selected={hasDeliveryAddress} name="isHasAddressDelivery" data={[{"id": "id1", "label": "Non", "value": "false"}, {"id": "id2", "label": "Oui", "value": "true"}]}/>
            </Flexbox>
                {deliverySelect === "true" && (<div>
                    <InputText  label="Numéro et rue" name="client_address_delivery" />
                    <Flexbox>
                        <InputText  label="Code postal" name="client_cp_delivery" />
                        <InputText  label="Ville" name="client_city_delivery" />
                    </Flexbox>
                </div>)  }
            <h2>Choix de la facturation</h2>
            <InputGroupRadio setTypeClientRadio={setBillTypeSelect}  selected={billTypeSelect} name="typeBill" data={[{"id": "id1", "label": "Mail", "value": "mail"}, {"id": "id2", "label": "Courrier", "value": "courrier"}]}/>
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
    )
}
export default CreateClient;