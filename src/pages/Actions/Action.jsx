import React, {useContext, useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {BoxTitle, InfoContainer, InfoViewContainer} from "../../utils/styles/single";
import {useHistory, useParams} from "react-router-dom";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import BoxInfos from "../../components/Single/BoxInfos";
import Spinner from "../../components/Spinner";
import Flexbox from "../../templates/Flexbox";
import {ButtonPrimary, ButtonPrimaryLink, ButtonReturn} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import ModalRelanceAction from "./modals/ModalRelanceAction";
import {getStatusRelance, whichPriority} from "../../utils/misc/relance/functions";
import {Priority, RelanceItem} from "./index";
import {AddressServer} from "../App";

const Action = () => {

    const { id_relance } = useParams();
    const history = useHistory();

    const [ showModalValidated, setShowModalValidated ] = useState( false );
    const [ showModalDeleted, setShowModalDeleted ] = useState( false );
    const [ showModalRestored, setShowModalRestored ] = useState( false );

    const { items: relance, load: loadRelance, loading: loadingrelance } = useFetchGet(useContext(AddressServer) + "/api/relances/" + id_relance);

    useEffect( () => {
        loadRelance()
    }, [ loadRelance ] );

    const closeModal = () => {
        showModalValidated && setShowModalValidated(false );
        showModalDeleted && setShowModalDeleted(false );
        showModalRestored && setShowModalRestored(false );
    }

    const isRelanceValidated = () => {
        if(relance.status && relance.status.nom === "validé" ){
            return "validated"
        }
    }

    const getTypeCommande = ( commande ) => {

        let typeCommande;

        Object.keys(commande).forEach( el => {
            if(el === "supportPrint" ){
                typeCommande = "Print";
            } else if(el === "supportWeb" ){
                typeCommande = "Web";
            } else if(el === "supportMagazine" ){
                typeCommande = "Edition";
            } else if(el === "contenu" ){
                typeCommande = "Contenu";
            } else if(el === "communityManagement" ){
                typeCommande = "Community Management";
            } else if(el === "encart" ){
                typeCommande = "Régie";
            } else{
                typeCommande = "Aucune commande"
            }
        })

        return typeCommande;
    };

    if(loadingrelance){
        return  (
            <MainContainer>
                <Spinner />
            </MainContainer>
        )
    }

    return(
        <MainContainer className={ isRelanceValidated() }>
            <DivButtonAction margin={"0 0 50px 0"}>
                { relance.status && relance.status.nom === "active" && (
                    <>
                        <ButtonPrimaryLink to="/update_client">Modifier la relance</ButtonPrimaryLink>
                        <ButtonPrimary onClick={() => setShowModalValidated(true)}>Valider la relance</ButtonPrimary>
                    </>
                ) }
                { relance.status && relance.status.nom === "validé" && <ButtonPrimary onClick={() => setShowModalRestored(true)}>Restorer la relance</ButtonPrimary> }
                <ButtonPrimary onClick={() => setShowModalDeleted(true)}>Supprimer la relance</ButtonPrimary>
            </DivButtonAction>
            <DivButtonAction justify={"flex-start"}>
                <ButtonReturn onClick={history.goBack}>Retour</ButtonReturn>
            </DivButtonAction>
            <BoxTitle>
                <h1>Relance : {relance.objet}</h1>
            </BoxTitle>
            <InfoViewContainer className={ isRelanceValidated() }>
                <h2>Date Limite</h2>
                <Flexbox>
                    <Priority className={ whichPriority( relance.dateEcheance ) }>{ whichPriority( relance.dateEcheance ) }</Priority>
                    <p>{new Date(relance.dateEcheance).toLocaleString( "fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
                </Flexbox>
            </InfoViewContainer>
            <InfoViewContainer className={ isRelanceValidated() }>
                <h2>Statut</h2>
                <p>{ relance.status && relance.status.nom }</p>
            </InfoViewContainer>
            <InfoViewContainer className={ isRelanceValidated() }>
                <h2>Tâche</h2>
                <p>{relance.contenu ? relance.contenu : "Auncune information supplémentaire"}</p>
            </InfoViewContainer>
            <Flexbox>
                <InfoViewContainer className={ isRelanceValidated() }>
                    <h2>Client</h2>
                    <InfoContainer>
                        <BoxInfos titre={ "Raison Sociale" } information={ relance.client && relance.client.raisonSociale } />
                        <BoxInfos titre={ "Téléphone" } information={ relance.client && relance.client.telephone } />
                        <BoxInfos titre={ "Email" } information={ relance.client && relance.client.email } />
                    </InfoContainer>
                    <ButtonPrimaryLink to={"/profile/" + ( relance.client && relance.client.id ) }>Voir la fiche client</ButtonPrimaryLink>
                </InfoViewContainer>
                { relance.commande && (
                    <InfoViewContainer className={ isRelanceValidated() }>
                        <h2>Commande</h2>
                        <InfoContainer>
                            <BoxInfos titre={ "Echéance" } information={new Date(relance.commande.fin).toLocaleString( "fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} />
                            <BoxInfos titre={ "Type" } information={ getTypeCommande(relance.commande) } />
                            {
                                relance.commande.supportWeb &&
                                <>
                                    <BoxInfos titre={ "Magazine" }  />
                                    <BoxInfos titre={ "Edition" }  />
                                </>
                            }
                        </InfoContainer>
                        <ButtonPrimaryLink to={"/commande/" + (relance.commande && relance.commande.id)}>Voir la commande</ButtonPrimaryLink>
                    </InfoViewContainer>
                ) }
            </Flexbox>
            {showModalValidated &&
                <ModalRelanceAction
                    relanceClicked={relance}
                    closeModal={closeModal}
                    action={"validated"}
                    request={loadRelance}
                />
            }
            { showModalRestored &&
                <ModalRelanceAction
                    relanceClicked={relance}
                    closeModal={closeModal}
                    action={"restored"}
                    request={loadRelance}
                />
            }
            { showModalDeleted &&
                <ModalRelanceAction
                    relanceClicked={relance}
                    closeModal={closeModal}
                    action={"deleted"}
                />
            }
        </MainContainer>
    )
}
export default Action;