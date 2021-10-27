import React from "react";
import MainContainer from "../../templates/Container";
import {ButtonPrimaryLink, ButtonSecondary} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import {BoxTitle, InfoContainer, InfoViewContainer} from "../../utils/styles/single";
import BoxInfos from "../../components/Single/BoxInfos";
import Flexbox from "../../templates/Flexbox";
import styled from "styled-components";

const BoxSecondaryAction = styled.div`
  margin-top: 50px;
`

const Account = () => {


    const whichRole = (role) => {
        switch (role) {
            case "ROLE_ADMIN":
                return "Administrateur";
                break;
            case "ROLE_COMMERCIAL":
                return "Commercial";
                break;
            default: return  "NC";
        }
    }


    const meUser = JSON.parse(localStorage.getItem('meUser'));

    const ifExist = (item) => {
        return item ? item : "";
    }

/*    if(!a){
        return <Spinner />
    }*/

    return (
        <MainContainer>
            <DivButtonAction>
                <ButtonPrimaryLink to="/creation_client">Nouveau client</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_commande">Nouvelle commande</ButtonPrimaryLink>
                <ButtonPrimaryLink to="#">Nouvelle relance</ButtonPrimaryLink>
            </DivButtonAction>
            <BoxTitle>
                <h1>Mon profil / {whichRole(meUser.role)}</h1>
            </BoxTitle>
            <Flexbox>
                <InfoViewContainer>
                    <h3>Mes informations</h3>
                    <InfoContainer>
                        <BoxInfos titre="Nom" information={ifExist(meUser.nom)} />
                        <BoxInfos titre="Prenom" information={ifExist(meUser.prenom)} />
                        <BoxInfos titre="Email" information={ifExist(meUser.email)}  />
                    </InfoContainer>
                </InfoViewContainer>
            </Flexbox>
            <BoxSecondaryAction>
                <h3>Mes actions</h3>
                <ButtonSecondary to={"/password_update"} >Modifier mon mot de passe</ButtonSecondary>
                <ButtonSecondary to="/account_update">Modifier mon profil</ButtonSecondary>
            </BoxSecondaryAction>
        </MainContainer>
    )
}
export default Account;