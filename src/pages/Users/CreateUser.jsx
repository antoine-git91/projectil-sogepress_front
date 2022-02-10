import React, {useContext, useReducer, useState} from "react";
import MainContainer from "../../templates/Container";
import {BoxTitle} from "../../utils/styles/single";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import InputText from "../../components/Form/InputText";
import Flexbox from "../../templates/Flexbox";
import {ButtonPrimary, ButtonPrimaryLink} from "../../utils/styles/button";
import {useFetchPost} from "../../utils/misc/fetch/useFetchPost";
import {handleChangeInput} from "../../utils/misc/input/inputChange";
import {AddressServer} from "../App";

const CreateUser = () => {

    /* On initialise les input text simple */
    const [ inputState, setInputState ] = useReducer(
        ( state, newState ) => ( { ...state, ...newState } ),
        {
            user_lastname: "",
            user_firstname: "",
            user_phone: "",
            user_email: "",
            user_password: "",
        }
    )

    const roleUser = [
        { "id": 1, "label": "Commercial", "value": "ROLE_COMMERCIAL" },
        { "id": 1, "label": "Administrateur", "value": "ROLE_ADMIN" },
    ];
    const [ role, setRole ] = useState( { "value":"ROLE_COMMERCIAL", "id": 1 } );

    const { success, error, loading, post, responseStatut } = useFetchPost(
        useContext(AddressServer) + "/api/users",
        {
            "email": inputState.user_email,
            "roles": [
                role.value
            ],
            "plainPassword": inputState.user_password,
            "nom": inputState.user_lastname,
            "prenom": inputState.user_lastname,
            "telephone": inputState.user_phone
        }
    )

    const handleSubmit = ( e ) => {
        e.preventDefault()
        post();
    };

    if(responseStatut === 201){
        return (
            <MainContainer>
                <h1>Succes</h1>
                <p>L'utilisateur a bien été créé.</p>
                <Flexbox>
                    <ButtonPrimaryLink to={"/create_user"}>Créer un nouvelle utilisateur</ButtonPrimaryLink>
                    <ButtonPrimaryLink to={"/user/" + success.id}>Voir la fiche utilisateur</ButtonPrimaryLink>
                </Flexbox>
            </MainContainer>
        )
    }

    return(
        <MainContainer>
            <BoxTitle>
                <h1>Création d'un nouvel utilisateur</h1>
                <form onSubmit={ ( e ) => handleSubmit( e ) }>
                    <InputGroupRadio
                        label={"Quel est le role de l'utilisateur"}
                        name={"role_user"}
                        data={ roleUser}
                        selected={ role }
                        setRadioChecked={ setRole }
                    />
                    <Flexbox>
                        <InputText
                            label={ "Nom de l'utilisateur" }
                            name={ "user_firstname" }
                            placeholder={ "Saisir le nom de l'utilisateur" }
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            required
                        />
                        <InputText
                            label={ "Prénom de l'utilisateur" }
                            name={ "user_lastname" }
                            placeholder={ "Saisir le prénom de l'utilisateur" }
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            required
                        />
                    </Flexbox>
                    <InputText
                        label={ "Numéro de téléphone de l'utilisateur" }
                        name={ "user_phone" }
                        placeholder={ "Saisir le téléphone de l'utilisateur" }
                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                        required
                    />
                    <InputText
                        label={ "Email de l'utilisateur" }
                        name={ "user_email" }
                        placeholder={ "Saisir le mail de l'utilisateur" }
                        type={"mail"}
                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                        required
                    />
                    <InputText
                        label={ "Mot de passe de l'utilisateur" }
                        name={ "user_password" }
                        placeholder={ "Saisir le mot de passe de l'utilisateur" }
                        type={"password"}
                        onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                        required
                    />
                    <ButtonPrimary type={"submit"}>Créer l'utilisateur</ButtonPrimary>
                </form>
            </BoxTitle>
        </MainContainer>
    )
}
export default CreateUser