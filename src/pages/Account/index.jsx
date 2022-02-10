import React, {useContext} from "react";
import MainContainer from "../../templates/Container";
import {ButtonPrimaryLink, ButtonReturn} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import {BoxTitle, InfoContainer, InfoViewContainer} from "../../utils/styles/single";
import BoxInfos from "../../components/Single/BoxInfos";
import Flexbox from "../../templates/Flexbox";
import {UserContext} from "../App";
import Spinner from "../../components/Spinner";
import {useHistory} from "react-router-dom";

const Account = () => {

    const meUser = useContext(UserContext);
    const history = useHistory();

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
    };

    const ifExist = (item) => {
        return item ? item : "";
    };

    if(!meUser.nom){
        return <MainContainer>
            <Spinner />
        </MainContainer>
    }

    return (
        <MainContainer>
            <DivButtonAction>
                <ButtonPrimaryLink to={"/password_update"}>Modifier mon mot de passe</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/account_update">Modifier mon profil</ButtonPrimaryLink>
            </DivButtonAction>
            <DivButtonAction justify={"flex-start"}>
                <ButtonReturn onClick={history.goBack} margin={"10px 0 0 0"}>Retour</ButtonReturn>
            </DivButtonAction>
            <BoxTitle>
                <h1>Mon profil / {whichRole(meUser.roles && meUser.roles[0])}</h1>
            </BoxTitle>
            <Flexbox>
                <InfoViewContainer>
                    <h3>Mes informations</h3>
                    <InfoContainer>
                        <Flexbox>
                            <BoxInfos titre="Nom" information={ifExist(meUser.nom)} />
                            <BoxInfos titre="Prénom" information={ifExist(meUser.prenom)} />
                        </Flexbox>
                        <BoxInfos titre="Email" information={ifExist(meUser.email)}  />
                        <BoxInfos titre="Telephone" information={ifExist(meUser.telephone)}  />
                        <BoxInfos titre="Role" information={whichRole(meUser.roles && meUser.roles[0])}  />
                    </InfoContainer>
                </InfoViewContainer>
            </Flexbox>
        </MainContainer>
    )
}
export default Account;