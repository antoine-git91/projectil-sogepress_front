import React from "react";
import MainContainer from "../../../components/Container";
import InputGroupRadio from "../../../components/Form/InputGroupRadio";
import InputRadio from "../../../components/Form/InputRadio";
import InputText from "../../../components/Form/InputText";
import {useState} from "react";

const CreateClient = (props) => {

    const [valueField, setValueField] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submitting Name ${valueField}`)
    }

    const onChange= (e) => {setValueField(e.target.value)}

    return(
        <MainContainer>
            <h1>Créer un client</h1>
        </MainContainer>
    )
}
export default CreateClient;