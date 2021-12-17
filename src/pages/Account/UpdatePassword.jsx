import React, {useState} from 'react';
import InputText from "../../components/Form/InputText";
import {BoxTitle} from "../../utils/styles/single";
import {ButtonPrimary} from "../../utils/styles/button";
import MainContainer from "../../templates/Container";
import {useReducer} from "react";
import Success from "../../components/MessageStateAction/Success";
import Spinner from "../../components/Spinner";



const UpdatePassword = () => {

    const meUser = JSON.parse(localStorage.getItem('meUser'));
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    /* On initialise les input text simple */
    const [inputState, setInputState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            new_password: "",
            confirm_new_password: "",
        }
    )
    /* On récupère la value des inputs text simple grace à leur "name" */
    const handleChangeInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputState({[name]: value});
    };

    const handleUpdateAccount = (e) => {
        e.preventDefault();

        if(inputState.new_password !== inputState.confirm_new_password){
            alert("Il y a une erreur dans a confirmation de votre mot de passe")
            return
        }
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                plainPassword: inputState.new_password
            })
        };
        fetch('https://127.0.0.1:8000/api/users/' + meUser.id, requestOptions)
            .then(response => {
                if(response.ok){
                    setTimeout(() => {
                        setUpdateSuccess(true)
                        setLoading(false)
                    }, 2000)
                }
            })
    }

    if(loading){
        return (
            <MainContainer>
                <Spinner />
            </MainContainer>
        )
    }

    return (
        <>
            <MainContainer>
                <BoxTitle>
                    <h1>Modifier mon mot de passe</h1>
                </BoxTitle>
                <form onSubmit={handleUpdateAccount}>
                    <InputText type="password" label={"Nouveau mot de passe"} name="new_password" value={inputState.new_password} onChange={handleChangeInput} autocomplete="new-password" />
                    <InputText type="password" label={"Confirmer votre nouveau mot de passe"} name="confirm_new_password" value={inputState.confirm_new_password} onChange={handleChangeInput} autocomplete="new-password" />
                    <ButtonPrimary>Je modifie mon mot de passe</ButtonPrimary>
                </form>
                {updateSuccess && <Success messageTitle={"Demande Validée"} messageText={"Votre mot de passe à bien été mis à jour"} />}
            </MainContainer>
        </>
    )

}
export default UpdatePassword;