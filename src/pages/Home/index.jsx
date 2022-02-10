import React, {useState} from "react";
import MainContainer from "../../templates/Container";
import {ButtonPrimary, ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import Spinner from "../../components/Spinner";
import ModalCreateAction from "../Actions/modals/ModalCreateAction";

const Home = ( { ca, clients, loadingCa, loadingNumberClients } ) => {

    const [ showModalCreateRelance, setShowModalCreateRelance ] = useState(false );

    const closeModal = () => {
        setShowModalCreateRelance(false );
    };

    return(
        <>
            <MainContainer>
                <DivButtonAction>
                    <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_commande">Créer une commande</ButtonPrimaryLink>
                    <ButtonPrimary onClick={(e) => (e.preventDefault(),
                        setShowModalCreateRelance(true)
                    )}>Créer une relance</ButtonPrimary>
                    <ButtonPrimaryLink to="/creation_magazine">Créer un magazine</ButtonPrimaryLink>
                </DivButtonAction>
                <h1>Dashboard</h1>
                    <>
                        <h2>Chiffre d'affaires du mois: {loadingCa ? <Spinner className={"little"} /> : ca} €</h2>
                        <h2>Nombre de nouveaux clients ce mois: {loadingNumberClients ? <Spinner className={"little"} /> : clients }</h2>
                    </>
            </MainContainer>
            { showModalCreateRelance && <ModalCreateAction closeModal={closeModal}/> }
        </>
    )
}
export default Home;