import React, {useContext, useState} from 'react';
import {BoxTitle} from "../../utils/styles/single";
import {ButtonPrimary, ButtonReturn} from "../../utils/styles/button";
import MainContainer from "../../templates/Container";
import Flexbox from "../../templates/Flexbox";
import {useReducer} from "react";
import {InputStyle} from "../../utils/styles/InputStyle";
import Spinner from "../../components/Spinner";
import {AddressServer, UserContext} from "../App";
import {handleChangeInput} from "../../utils/misc/input/inputChange";
import {useFetchPatch} from "../../utils/misc/fetch/useFetchPatch";
import DivButtonAction from "../../utils/styles/DivButton";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/parts/ModalHeader";
import ModalBody from "../../components/Modal/parts/ModalBody";
import {SuccessResponse} from "../Actions/modals/ModalRelanceAction";
import {useHistory} from "react-router-dom";

const UpdateAccount = () => {

    const meUser = useContext(UserContext);
    const history = useHistory();

    const [ showModal, setShowModal] = useState(false);

    /* On initialise les input text simple */
    const [inputState, setInputState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            lastname_user: meUser.nom,
            firstname_user: meUser.prenom,
            email_user: meUser.email
        }
    );

    const {success, loading, post} = useFetchPatch(
        useContext(AddressServer) + '/api/users/' + meUser.id,
        {
            nom: inputState.lastname_user,
            prenom: inputState.firstname_user,
            email: inputState.email_user
        }
    );

    const closeModal = () => {
        setShowModal(false);
        if(success.id){
           window.location.reload();
        }
    };

    const faireRedirection= () => {
        let url = "/my_account";
        history.push(url);
        window.location.reload();
    }


    const handleUpdateAccount = (e) => {
        e.preventDefault();
        post();
    };

    return (
        <>
            <MainContainer>
                <DivButtonAction justify={"flex-start"}>
                    <ButtonReturn onClick={history.goBack} margin={"10px 0 0 0"}>Retour à mon profil</ButtonReturn>
                </DivButtonAction>
                <BoxTitle>
                    <h1>Modifier mon profil</h1>
                </BoxTitle>
                <form onSubmit={handleUpdateAccount}>
                    <Flexbox>
                        <label>Nom
                            <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputState.lastname_user} name="lastname_user" />
                        </label>
                        <label>Prénom
                            <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputState.firstname_user} name="firstname_user" />
                        </label>
                    </Flexbox>
                    <label>Email
                        <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputState.email_user} name="email_user" />
                    </label>
                    <ButtonPrimary type={"submit"} onClick={() => setShowModal(true)}>Je modifie mon profil</ButtonPrimary>
                </form>
            </MainContainer>
            {loading && showModal && (
                <Modal closeModal={closeModal} justify={"center"} align={"center"}>
                    <Spinner />
                </Modal>
            )}
            { success.id && showModal && (
                <Modal closeModal={closeModal} justify={"center"} align={"center"}>
                    <ModalHeader>
                        <h1>Modification de mon profil.</h1>
                    </ModalHeader>
                    <ModalBody justify={"center"} align={"center"}>
                        <SuccessResponse>Votre profil a bien été modifié</SuccessResponse>
                        <p>Un rechargement de la page sera effectué pour finaliser la mise à jour de votre profil.</p>
                        <ButtonPrimary onClick={faireRedirection}>Retour à mon profil</ButtonPrimary>
                    </ModalBody>
                </Modal>
            )}
        </>
    )

}
export default UpdateAccount;