import React, {useEffect, useState} from "react";
import MainContainer from "../../../templates/Container";
import {useParams} from "react-router-dom";
import { ButtonPrimaryLink } from "../../../utils/styles/button-primary";
import RelanceContainer from "../../../components/RelanceBox";
import BoxInfos from "../../../components/Single/BoxInfos";
import {BoxButton, BoxTitle, InfoViewContainer, InfoContainer, InfoListeContainer} from "../../../utils/styles/single";
import styled from "styled-components";
import TablePotentiality from "../../../components/table/TablePotentiality";
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

    const handleClickTab = () => {

    }

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
            {/*<BoxTitle>
                    <h1>{raison_sociale} / <span>Titre 2</span></h1>
                    <p>Activité</p>
                    <p>{email}</p>
            </BoxTitle>*/}
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
            ) ||
            tabActive === "commandes" && (
                <p>z</p>
                /* A faire vue de la commande*/
            ) ||
            tabActive === "historiques" && (
                <p>z</p>
                /* A faire vue de l'historique*/
            ) ||
            tabActive === "chiffres d'affaires" && (
                <p>z</p>
                /* A faire vue du chiffre d'affaire */
            )}


        </MainContainer>
    )

}
export default Profile