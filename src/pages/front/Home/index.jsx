import React from "react";
import MainContainer from "../../../templates/Container";
import InputText from "../../../components/Form/InputText";
import InputGroupRadio from "../../../components/Form/radio/InputGroupRadio";
import InputSelect from "../../../components/Form/InputSelect";
import BtnAjout from "../../../components/btn_ajout";
import InputTextArea from "../../../components/Form/InputTextArea";
import Header from "../../../components/Header";
import {ButtonPrimaryLink} from "../../../utils/styles/button-primary";
import DivButtonAction from "../../../utils/styles/DivButton";

const Home = () => {

    const data = [{"id": "id1", "label": "Mon label 1", "value": "value1"},{"id": "id2", "label": "Mon label 2", "value": "value2"},{"id": "id3", "label": "Mon label 3", "value": "value3"},{"id": "id4", "label": "Mon label 4", "value": "value4"}]

    return(
        <React.Fragment>
            <Header />
            <MainContainer>
                <DivButtonAction>
                    <ButtonPrimaryLink to="/creation_client">Créer i</ButtonPrimaryLink>
                </DivButtonAction>
                <h1>Dashboard</h1>
            </MainContainer>
        </React.Fragment>
    )
}
export default Home;