import React, {useEffect, useState} from "react";
import MainContainer from "../../../templates/Container";
import {useParams} from "react-router-dom";
import { ButtonPrimaryLink } from "../../../utils/styles/button-primary";
import RelanceContainer from "../../../components/RelanceBox";
import BtnAjout from "../../../components/btn_ajout";
import InputText from "../../../components/Form/InputText";
import BoxInfos from "../../../components/Single/BoxInfos";
import BoxContact from "../../../components/Single/BoxContact";
import BoxAnneeCa from "../../../components/Single/BoxAnneeCa";
import BoxHistorique from "../../../components/Single/BoxHistorique";
import {SingleMainContainer,ContactViewContainer, BoxTitle, InfoViewContainer, InfoContainer,ContactContainer,HistoriqueViewContainer, HistoriqueDataContainer,HeaderHistoriqueView,ChiffreDateContainer,ChiffreResultContainer} from "../../../utils/styles/single";
import styled from "styled-components";
import TablePotentiality from "../../../components/table/TablePotentiality";
import TableCommandeSingle from "../../../components/table/TableCommandeSingle";
import DivButtonAction from "../../../utils/styles/DivButton";

const BtnTabs = styled.button`
  background-color: transparent;
  color: black;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 300;
  border: transparent;
  transition: .3s;
  cursor: pointer;
  border-bottom: 3px solid transparent;

  &:hover {
    color: #FF6700;
  }

  ${({active}) =>
          active &&
          `
          color:#FF6700;
    border-bottom: 3px solid #FF6700;
    opacity: 1;
  `}
`

const tabs = [
    "contact",
    "commandes",
    "historiques",
    "chiffres d'affaires"
]
const Profile = () => {

    const {id} = useParams()
    const [items, setItems] = useState([])

    const [tabActive, setTabActive] = useState(tabs[0]);

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

    //const {raison_sociale, email} = {...items};
    return (
        <MainContainer>
            
            <RelanceContainer />
            <DivButtonAction>
                <ButtonPrimaryLink to="/creation_client">Modifier le profil</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_commande">Nouvelle commande</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/creation_client">Nouvelle relance</ButtonPrimaryLink>
            </DivButtonAction>
            <BoxTitle>
                <h1>Entreprise 1 / <span>Titre 2</span></h1>
                <p>Activité</p>
            </BoxTitle>
            <div>
                {tabs.map(tab => (
                    <BtnTabs
                        key={tab}
                        active={tabActive === tab}
                        onClick={(e) => {
                            e.preventDefault()
                            setTabActive(tab)
                        }}
                    >{tab}</BtnTabs>
                ))}
            </div>
            { tabActive === "contact" && (
                <SingleMainContainer>
                    <InfoViewContainer>
                        <h2>Coordonnées</h2>
                        <InfoContainer>
                            <BoxInfos titre="Téléphone" information="02 47 09 67 34" />
                            <BoxInfos titre="Email" information="email@email.com" />
                            <BoxInfos titre="Adresse" information="5 avenue du littoral 37000 TOURS" />
                            <BoxInfos titre="Site internet" information="www.site.url" />
                        </InfoContainer>
                        <h2>Indice de potentialité</h2>
                        <TablePotentiality />
                    </InfoViewContainer>
                    <ContactViewContainer>
                        <h2>Contact</h2>
                        <ContactContainer>
                            <BoxContact />
                            <BoxContact />
                            <BoxContact />
                        </ContactContainer>
                    </ContactViewContainer>
                </SingleMainContainer>
            ) ||
            tabActive === "commandes" && (
                <SingleMainContainer>
                    <InfoViewContainer>
                        <h2>Commandes</h2>
                        <TableCommandeSingle />
                    </InfoViewContainer>
                </SingleMainContainer>
            ) ||
            tabActive === "historiques" && (
                <SingleMainContainer>
                    <HistoriqueViewContainer>
                        <HeaderHistoriqueView>
                        <h2>Historique de contact</h2>
                        <BtnAjout text="Créer un historique"/>
                        </HeaderHistoriqueView>
                        <HistoriqueDataContainer>
                            <BoxHistorique></BoxHistorique>
                            <BoxHistorique></BoxHistorique>
                            <BoxHistorique></BoxHistorique>
                        </HistoriqueDataContainer>
                    </HistoriqueViewContainer>
                </SingleMainContainer>
            ) ||
            tabActive === "chiffres d'affaires" && (
                <SingleMainContainer>
                    <InfoViewContainer>
                        <h2>Chiffres d'affaires</h2>
                        <ChiffreDateContainer>
                            <InputText label="DE :" type="date"/>
                            <InputText label="A :" type="date"/>
                        </ChiffreDateContainer>
                        <ChiffreResultContainer>
                            <BoxAnneeCa />
                            <BoxAnneeCa />
                        </ChiffreResultContainer>
                    </InfoViewContainer>
                </SingleMainContainer>
            )}


        </MainContainer>
    )

}
export default Profile