import React from "react";
import MainContainer from "../../templates/Container";
import {ButtonReturn} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import ModalCreateAction from "./modals/ModalCreateAction";

const CreateAction = () => {

    return(
        <MainContainer>
            <DivButtonAction justify={"flex-start"}>
                <ButtonReturn to={{pathname: `/actions/`}}>Retour aux relances</ButtonReturn>
            </DivButtonAction>
            <ModalCreateAction/>
        </MainContainer>
    )
}
export default CreateAction;