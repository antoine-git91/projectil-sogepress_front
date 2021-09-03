import React, {useEffect, useState} from "react";
import Flexbox from "../../../templates/Flexbox";
import InputText from "../../../components/Form/InputText";

const ContactBlock = ({ firstname,lastname, job, phone, mail, onChange }) => {

    const [firstnameState, setFirstnameState] = useState(firstname);
    const [lastnameState, setLastnameState] = useState(lastname);
    const [jobState, setJobState] = useState(job);
    const [mailState, setMailState] = useState(phone);
    const [phoneState, setPhoneState] = useState(mail);

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
        <li>
            <span>Contact</span>
            <Flexbox>
                <InputText event={(e) => {
                    setLastnameState(e.target.value)
                }} label="Nom" name="client_contact_lastname" value={lastnameState}/>
                <InputText event={(e) => {
                    setFirstnameState(e.target.value)
                }} label="Prénom" name="client_contact_firstname" value={firstnameState}/>
                <InputText event={(e) => {
                    setJobState(e.target.value)
                }} label="Fonction" name="client_contact_job"/>
            </Flexbox>
            <Flexbox>
                <InputText event={(e) => {
                    setPhoneState(e.target.value)
                }} label="Téléphone" name="client_contact_phone" />
                <InputText event={(e) => {
                    setMailState(e.target.value)
                }} label="Mail" name="client_contact_mail" />
            </Flexbox>
        </li>
    )
}
export  default ContactBlock