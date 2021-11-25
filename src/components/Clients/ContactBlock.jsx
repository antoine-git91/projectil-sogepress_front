import React, {useEffect, useState} from "react";
import Flexbox from "../../templates/Flexbox";
import styled from "styled-components";
import {InputStyle} from "../../utils/styles/InputStyle";
import {DeleteButton} from "../../utils/styles/button";


const ListStyle = styled.li`
      list-style: none;
      margin-left: 0;
      padding-left: 0;
`
const TitleContact = styled.span`
      font-weight: bold;
      margin-bottom: 5px;
      margin-top: 10px;
      display: block;
`

const ContactBlock = ({ firstname,lastname, job, phone, mail, onChange, numberContact, removeContact}) => {

    const [firstnameState, setFirstnameState] = useState(firstname);
    const [lastnameState, setLastnameState] = useState(lastname);
    const [jobState, setJobState] = useState(job);
    const [mailState, setMailState] = useState(mail);
    const [phoneState, setPhoneState] = useState(phone);

    useEffect(() => {
        onChange({
            nom: lastnameState,
            prenom: firstnameState,
            fonction: jobState,
            tel: phoneState,
            email: mailState
        });
    }, [firstnameState, lastnameState, jobState, phoneState, mailState, onChange]);


    return (
        <ListStyle id={numberContact}>
            <Flexbox align-items="baseline">
                <TitleContact>Contact n° {numberContact + 1}</TitleContact>
                <DeleteButton onClick={removeContact}>Supprimer X</DeleteButton>
            </Flexbox>
            <Flexbox>
                <label>Nom
                    <InputStyle
                        type="text"
                        onChange={(e) => {setLastnameState(e.target.value);}}
                        value={lastnameState}
                        name="client_contact_lastname"
                        required
                    />
                </label>
                <label>Prénom
                    <InputStyle
                        type="text"
                        onChange={(e) => {setFirstnameState(e.target.value)}}
                        value={firstnameState}
                        name="client_contact_firstname"
                        required
                    />
                </label>
                <label>Fonction
                    <InputStyle
                        type="text" onChange={(e) => {setJobState(e.target.value)}}
                        value={jobState}
                        name="client_contact_job"
                        required
                    />
                </label>
            </Flexbox>
            <Flexbox>
                <label>Téléphone
                    <InputStyle
                        type="tel"
                        onChange={(e) => {setPhoneState(e.target.value)}}
                        value={phoneState}
                        name="client_contact_phone"
                        pattern="[0-9]{10}"
                        required
                    />
                </label>
                <label>Mail
                    <InputStyle
                        type="email"
                        onChange={(e) => {setMailState(e.target.value)}}
                        value={mailState}
                        name="client_contact_mail"
                        required/>
                </label>
            </Flexbox>
        </ListStyle>
    )
}
export  default ContactBlock