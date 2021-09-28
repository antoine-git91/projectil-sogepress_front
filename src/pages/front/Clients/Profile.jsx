import React, {useEffect, useState} from "react";
import MainContainer from "../../../templates/Container";
import {useParams} from "react-router-dom";
import { ButtonPrimaryLink } from "../../../utils/styles/button-primary";
import RelanceContainer from "../../../components/RelanceBox";
import TabsSingle from "../../../components/Single/Tabs";
import BoxInfos from "../../../components/Single/BoxInfos";
import TitreSection from "../../../components/Single/TitreSection";
import BoxInfosListe from "../../../components/Single/BoxInfosListe";
import {BoxButton, BoxTitle, InfoViewContainer, InfoContainer, InfoListeContainer} from "../../../utils/styles/single";


const Profile = () => {

    const {id} = useParams()
    const [items, setItems] = useState([])

    //const {item: client, loading, load} = usePaginationFetch(`http://127.0.0.1:8000/api/clients/${id}`)


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/clients/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result)
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    console.log(error)
                }
            )
    }, [id])


    /*useEffect(() => load(), [load])
    console.log(JSON.stringify(client))*/

    const {raison_sociale, email} = {...items};
    return (
        <MainContainer>
            
            <RelanceContainer></RelanceContainer>
            <BoxButton>
            <ButtonPrimaryLink to="/creation_client">Modifier le profil du client</ButtonPrimaryLink>
            <ButtonPrimaryLink to="/creation_client">Ajouter une nouvelle commande</ButtonPrimaryLink>
            <ButtonPrimaryLink to="/creation_client">Ajouter une nouvelle relance</ButtonPrimaryLink>
            </BoxButton>
            <BoxTitle>
                    <h1>{raison_sociale} / <span>Titre 2</span></h1>
                    <p>Activité</p>
                    <p>{email}</p>
            </BoxTitle>
            <TabsSingle></TabsSingle>
            <InfoViewContainer>
                <TitreSection titre="Coordonnées"></TitreSection>
                <InfoContainer>
                    <BoxInfos titre="Téléphone" information="02 47 09 67 34"></BoxInfos>
                    <BoxInfos titre="Email" information="email@email.com"></BoxInfos>
                    <BoxInfos titre="Adresse" information="5 avenue du littoral
37000 TOURS"></BoxInfos>
                    <BoxInfos titre="Site internet" information="www.site.url"></BoxInfos>
                </InfoContainer>
                <TitreSection titre="Indice de potentialité"></TitreSection>
                <InfoListeContainer>
                    <BoxInfosListe numero="1" type="Site Internet"></BoxInfosListe>
                    <BoxInfosListe numero="2" type="Encard" produit="Hello"></BoxInfosListe>
                    <BoxInfosListe numero="3" type="Encard" produit="Chanceaux"></BoxInfosListe>
                </InfoListeContainer>
            </InfoViewContainer>

        </MainContainer>
    )

}
export default Profile