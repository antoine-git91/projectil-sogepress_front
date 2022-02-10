import React, {useContext, useEffect, useState} from 'react';
import InputText from "../../components/Form/InputText";
import {BoxTitle} from "../../utils/styles/single";
import {ButtonPrimary, ButtonPrimaryLink, ButtonReturn, ButtonSecondary} from "../../utils/styles/button";
import MainContainer from "../../templates/Container";
import {useReducer} from "react";
import Spinner from "../../components/Spinner";
import {AddressServer, UserContext} from "../App";
import {handleChangeInput} from "../../utils/misc/input/inputChange";
import {useFetchPatch} from "../../utils/misc/fetch/useFetchPatch";
import DivButtonAction from "../../utils/styles/DivButton";
import Modal from "../../components/Modal/Modal";
import styled from "styled-components";
import ModalBody from "../../components/Modal/parts/ModalBody";
import ModalHeader from "../../components/Modal/parts/ModalHeader";
import Flexbox from "../../templates/Flexbox";
import {ClearPassBtn, ContentInputClear} from "../Login";
import {toggleTypeInput} from "../../utils/misc/input/Password";
import {Information} from "../Commandes/CreateCommande";
import {SuccessResponse} from "../Actions/modals/ModalRelanceAction";
import {useHistory} from "react-router-dom";


const TipsBox = styled.div`
  font-weight: bold;
  padding: 20px;
  border: 2px solid #ff672f;
  border-radius: 10px;
  margin-bottom: 30px;
`


const UpdatePassword = () => {

    const meUser = useContext(UserContext);
    const history = useHistory();

    /* On initialise les input text simple */
    const [inputState, setInputState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            new_password: "",
            confirm_new_password: "",
        }
    );


    const [ newPassword, setNewPassword ] = useState(true);
    const [ confirmPassword, setConfirmPassword ] = useState(true);
    const [ showModal, setShowModal] = useState(false);
    const [ samePassword, setSamePassword] = useState(false);
    const [ passwordLength, setPasswordLength] = useState(0 );
    const [ confirmLength, setConfirmLength] = useState(0 );
    const [ lengthValid, setLengthValid] = useState(false );


    const { success, error, loading, post} = useFetchPatch(
        useContext(AddressServer) + '/api/users/' + meUser.id,
        {
            plainPassword: inputState.new_password
        }
    )

    const handleUpdateAccount = (e) => {
        e.preventDefault();
        post();
    }

    const closeModal = () => {
        setShowModal(false)
    };


    // On checke si les mots de passe ont une longueur mini de 8 et si ils sont identiques
    const isValid = (e) => {
        e.preventDefault();

        setPasswordLength(inputState.new_password.length);
        setConfirmLength(inputState.confirm_new_password.length);

        if( inputState.new_password.length < 8 || inputState.confirm_new_password.length < 8 ){
            setLengthValid(true);
        } else  if(inputState.new_password !== inputState.confirm_new_password){
            setSamePassword(true);
        } else {
            setShowModal(true)
        }
    };

    // On retire les messages d'erreur des MDP au changement de la valeur des inputs
    useEffect( () => {
        if((inputState.new_password.length !== passwordLength) || ( inputState.confirm_new_password.length !== confirmLength )){
            setSamePassword(false);
            setLengthValid(false);
        }
    }, [ inputState.new_password, inputState.confirm_new_password ])


    return (
        <>
            <MainContainer>
                <DivButtonAction justify={"flex-start"}>
                    <ButtonReturn onClick={history.goBack}>Retour à mon profil</ButtonReturn>
                </DivButtonAction>
                <BoxTitle>
                    <h1>Modifier mon mot de passe</h1>
                </BoxTitle>
                <TipsBox>
                    <p>Rappel : Un mot de passe doit contenir au moins une majuscule, un chiffre et un symbole pour être efficace.</p>
                </TipsBox>
                <form>
                    <ContentInputClear>
                            <InputText
                                type={newPassword ? "password" : "text"}
                                label={"Nouveau mot de passe (longueur min. 8)"}
                                name="new_password"
                                value={inputState.new_password} onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                                required
                            />
                            <ClearPassBtn eye_orange onClick={ ( e ) => toggleTypeInput( e, setNewPassword, newPassword) }><span className="screen-reader-text">Mettre en claire le mot de passe</span></ClearPassBtn>
                    </ContentInputClear>
                    <ContentInputClear>
                        <InputText
                            type={confirmPassword ? "password" : "text"}
                            label={"Confirmer votre nouveau mot de passe"}
                            name="confirm_new_password"
                            value={inputState.confirm_new_password} onChange={ ( e ) => handleChangeInput( e, setInputState ) }
                            required
                        />
                        <ClearPassBtn eye_orange onClick={ ( e ) => toggleTypeInput( e, setConfirmPassword, confirmPassword ) }><span className="screen-reader-text">Mettre en claire le mot de passe</span></ClearPassBtn>
                    </ContentInputClear>
                    { samePassword && <Information>Les mots de passe ne sont pas identiques</Information> }
                    { lengthValid && <Information>Les mots de passe doivent au minimum avoir 8 caractères</Information> }
                    <ButtonPrimary onClick={ ( e ) => isValid(e)}>Je modifie mon mot de passe</ButtonPrimary>
                </form>
            </MainContainer>
            { !success.id && showModal && !loading && (
                <Modal closeModal={closeModal} justify={"center"} align={"center"}>
                    <ModalHeader>
                        <h1>Modification de mot de passe.</h1>
                    </ModalHeader>
                    <ModalBody justify={"center"} align={"center"}>
                        <p>Attention ! Cette action est irreversible. Pensez à bien vous souvenir de votre mot de passe.</p>
                        <Flexbox>
                            <ButtonSecondary onClick={ () => { setShowModal(false ) } }>Non, je reviens à la page</ButtonSecondary>
                            <ButtonPrimary type={"submit"} onClick={handleUpdateAccount}>Oui, Je modifie mon mot de passe</ButtonPrimary>
                        </Flexbox>
                    </ModalBody>
                </Modal>
            )}
            {loading && showModal && (
                <Modal closeModal={closeModal} justify={"center"} align={"center"}>
                    <Spinner />
                </Modal>
            )}
            { success.id && showModal && (
                <Modal closeModal={closeModal} justify={"center"} align={"center"}>
                    <ModalHeader>
                        <h1>Modification de mot de passe.</h1>
                    </ModalHeader>
                    <ModalBody justify={"center"} align={"center"}>
                        <SuccessResponse>Votre mot de passe à bien été modifié</SuccessResponse>
                        <ButtonPrimaryLink to={"/my_account"}>Retour à mon profil</ButtonPrimaryLink>
                    </ModalBody>
                </Modal>
            )}
        </>
    )

}
export default UpdatePassword;