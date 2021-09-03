import React from "react";
import InputText from "../../../components/Form/InputText";
import Flexbox from "../../../templates/Flexbox";
import {useState} from "react";
import InputGroupRadio from "../../../components/Form/radio/InputGroupRadio";
import MainContainer from "../../../templates/Container";
import ContactBlock from "./ContactBlock";

const CreateClient = () => {

    const [arrayContact, setArrayContact] = useState([]);

    const addContact = () => {
        setArrayContact(
            arrayContact.concat({"firstname": "", "lastname": "", "job": "", "phone": "", "mail": ""})
        )
    }

    const insertDataFromChild = (newContact, index) => {
        arrayContact[index].firstname = newContact.firstname;
        arrayContact[index].lastname = newContact.lastname;
        arrayContact[index].job = newContact.job;
        arrayContact[index].phone = newContact.phone;
        arrayContact[index].mail = newContact.mail;
        setArrayContact(arrayContact);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        console.log('coucou');
    }

    return(
        <MainContainer>
            <h1>Créer un client</h1>
            <form onSubmit={handleSubmit}>
            <Flexbox>
                <InputText label="Nom du client" name="client_name" />
                <InputText label="Code APE" name="client_ape" />
            </Flexbox>
            <h2>Coordonnées</h2>
            <Flexbox>
                <InputText label="Téléphone" name="client_phone" />
                <InputText label="Mail" name="client_mail" />
            </Flexbox>
            <InputText label="Numéro et rue" name="client_street" />
            <Flexbox>
                <InputText label="Code postal" name="client_cp" />
                <InputText label="Ville" name="client_city" />
            </Flexbox>
            <InputText label="Site internet" name="client_website" />
            <h2>Adresse de livraison</h2>
            <Flexbox>
                <span>Addresse de livraison différente: </span>
                <InputGroupRadio selected={"false"} name="isHasAddressDelivery" data={[{"id": "id1", "label": "Non", "value": "false"}, {"id": "id2", "label": "Oui", "value": "true"}]}/>

            </Flexbox>
            <InputText  label="Numéro et rue" name="client_address_delivery" />
            <Flexbox>
                <InputText  label="Code postal" name="client_cp_delivery" />
                <InputText  label="Ville" name="client_city_delivery" />
            </Flexbox>
            <h2>Choix de la facturation</h2>
            <InputGroupRadio selected={'mail'} name="billType" data={[{"id": "id1", "label": "Mail", "value": "mail"}, {"id": "id2", "label": "Courrier", "value": "courrier"}]}/>
            <Flexbox justify="space-between" align="center">
                <h2>Contact</h2>
                <button onClick={addContact}>Ajouter un contact</button>
            </Flexbox>
            <ul>
                {arrayContact.map(
                    (contact, index) => <ContactBlock
                                                    key={index}
                                                    firstname={contact.firstname}
                                                    lastname={contact.lastname}
                                                    job={contact.job}
                                                    phone={contact.phone}
                                                    mail={contact.mail}
                                                    onChange={(newContact) => insertDataFromChild(newContact, index)}
                                                />
                )}
            </ul>

            <input type="submit" value="Créer le client" />
            </form>
        </MainContainer>
    )
}
export default CreateClient;