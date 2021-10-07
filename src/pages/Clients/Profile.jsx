import React, {useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {useParams} from "react-router-dom";
import { ButtonPrimaryLink } from "../../utils/styles/button-primary";
import RelanceContainer from "../../components/RelanceBox";
import BtnAjout from "../../components/btn_ajout";
import InputText from "../../components/Form/InputText";
import BoxInfos from "../../components/Single/BoxInfos";
import BoxContact from "../../components/Single/BoxContact";
import BoxAnneeCa from "../../components/Single/BoxAnneeCa";
import BoxHistorique from "../../components/Single/BoxHistorique";
import {SingleMainContainer,ContactViewContainer, BoxTitle, InfoViewContainer, InfoContainer,ContactContainer,HistoriqueViewContainer, HistoriqueDataContainer,HeaderHistoriqueView,ChiffreDateContainer,ChiffreResultContainer} from "../../utils/styles/single";
import styled from "styled-components";
import TablePotentiality from "../../components/table/TablePotentiality";
import TableCommandeSingle from "../../components/table/TableCommandeSingle";
import DivButtonAction from "../../utils/styles/DivButton";
import Spinner from "../../components/Spinner";

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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const requestOptions = {
            method: 'Get',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('itemName')
            }
        };
        fetch(`http://127.0.0.1:8000/api/clients/${id}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setIsLoading(false)
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    console.log(error)
                }
            )
    }, [id])

    console.log(items)

    if(isLoading) {
        return <Spinner />
    } else {
        return (
            <MainContainer>
                <RelanceContainer />
                <DivButtonAction>
                    <ButtonPrimaryLink to="/creation_client">Modifier le profil</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_commande">Nouvelle commande</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_client">Nouvelle relance</ButtonPrimaryLink>
                </DivButtonAction>
                <BoxTitle>
                    <h1>{items.raisonSociale} / <span>{items.nafSousClasse.libelle}</span></h1>
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
                { (tabActive === "contact" &&
                    <SingleMainContainer>
                        <InfoViewContainer>
                            <h2>Coordonnées</h2>
                            <InfoContainer>
                                <BoxInfos titre="Téléphone" information="" />
                                <BoxInfos titre="Email" information={items.email} />
                                {/*items.adresses[0].numero + ' ' + items.adresses[0].type_voie + ' ' + items.adresses[0].nom_voie + ' ' + items.adresses[0].ville.nom + ' ' + items.adresses[0].ville.code_postal*/}
                                <BoxInfos titre="Adresse" information={'25 rue du cefim 370000 Tours'} />
                                <BoxInfos titre="Site internet" information={items.siteInternet} />
                            </InfoContainer>
                            <h2>Indice de potentialité</h2>
                            <TablePotentiality />
                        </InfoViewContainer>
                        <ContactViewContainer>
                            <h2>Contact</h2>
                            <ContactContainer>
                                {items.contacts.map(contact => <BoxContact contact={contact} />)}
                            </ContactContainer>
                        </ContactViewContainer>
                    </SingleMainContainer>
                ) ||
                (tabActive === "commandes" &&
                    <>
                        <h2>Commandes</h2>
                        <TableCommandeSingle commandes={items.commandes} />
                    </>
                ) ||
                (tabActive === "historiques" &&
                    <SingleMainContainer>
                        <HistoriqueViewContainer>
                            <HeaderHistoriqueView>
                                <h2>Historique de contact</h2>
                                <BtnAjout text="Créer un historique"/>
                            </HeaderHistoriqueView>
                            <HistoriqueDataContainer>
                                {items.historiqueClients.map((historique, key) => (
                                    <BoxHistorique key={key} dataHistorique={historique} />
                                ))}
                            </HistoriqueDataContainer>
                        </HistoriqueViewContainer>
                    </SingleMainContainer>
                ) ||
                (tabActive === "chiffres d'affaires" &&
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

}
export default Profile