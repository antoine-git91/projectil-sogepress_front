import React, {useEffect, useState} from "react";
import Flexbox from "../../templates/Flexbox";
import InputText from "../Form/InputText";
import styled from "styled-components";

const DeleteButton = styled.button`
      border: none;
      background-color: transparent;
      color: #b83c3c;
      cursor: pointer;
      margin-left: 10px;
      
      &:hover{
        text-decoration: underline;
      }
`
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

const ContactBlock = ({ firstname,lastname, job, phone, mail, onChange, numberContact, removeContact }) => {

    const [firstnameState, setFirstnameState] = useState(firstname);
    const [lastnameState, setLastnameState] = useState(lastname);
    const [jobState, setJobState] = useState(job);
    const [mailState, setMailState] = useState(mail);
    const [phoneState, setPhoneState] = useState(phone);

    useEffect(() => {
        onChange({
            firstname: firstnameState,
            lastname: lastnameState,
            job: jobState,
            phone: phoneState,
            mail: mailState
        })
    }, [firstnameState, lastnameState, jobState, phoneState, mailState, onChange]);

    return (
        <ListStyle id={numberContact}>
            <Flexbox align-items="baseline">
                <TitleContact>Contact n° {numberContact + 1}</TitleContact>
                <DeleteButton onClick={removeContact}>Supprimer X</DeleteButton>
            </Flexbox>
            <Flexbox>
                <InputText onChange={(e) => {
                    setLastnameState(e.target.value)
                }} label="Nom" name="client_contact_lastname" value={lastnameState}/>
                <InputText onChange={(e) => {
                    setFirstnameState(e.target.value)
                }} label="Prénom" name="client_contact_firstname" value={firstnameState}/>
                <InputText onChange={(e) => {
                    setJobState(e.target.value)
                }} label="Fonction" name="client_contact_job" value={jobState}/>
            </Flexbox>
            <Flexbox>
                <InputText onChange={(e) => {
                    setPhoneState(e.target.value)
                }} label="Téléphone" name="client_contact_phone" />
                <InputText onChange={(e) => {
                    setMailState(e.target.value)
                }} label="Mail" name="client_contact_mail" />
            </Flexbox>
        </ListStyle>
    )
}
export  default ContactBlock