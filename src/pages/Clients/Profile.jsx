import React, {useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {useParams} from "react-router-dom";
import { ButtonPrimaryLink } from "../../utils/styles/button";
import RelanceContainer from "../../components/RelanceBox";
import BtnAjout from "../../components/btn_ajout";
import InputText from "../../components/Form/InputText";
import BoxInfos from "../../components/Single/BoxInfos";
import BoxContact from "../../components/Single/BoxContact";
import BoxAnneeCa from "../../components/Single/BoxAnneeCa";
import BoxHistorique from "../../components/Single/BoxHistorique";
import {ContactViewContainer, BoxTitle, InfoViewContainer, InfoContainer,ContactContainer,HistoriqueViewContainer, HistoriqueDataContainer,HeaderHistoriqueView,ChiffreDateContainer,ChiffreResultContainer} from "../../utils/styles/single";
import styled from "styled-components";
import TablePotentiality from "../../components/table/TablePotentiality";
import TableCommandeSingle from "../../components/table/TableCommandeSingle";
import DivButtonAction from "../../utils/styles/DivButton";
import Spinner from "../../components/Spinner";
import Flexbox from "../../templates/Flexbox";
import {useFetchGet} from "../../utils/misc/useFetchGet";

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
  margin-bottom: 30px;

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
    const [tabActive, setTabActive] = useState(tabs[0]);



    const {items, load, loading} = useFetchGet(`http://127.0.0.1:8000/api/clients/${id}`);
    useEffect(() => {
        load()
    }, [load])

    console.log(items)

    if(loading) {
        return <Spinner />
    }
    return (
        <>
            <MainContainer>
                <RelanceContainer />
                <DivButtonAction>
                    <ButtonPrimaryLink to="/creation_client">Modifier le profil</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_commande">Nouvelle commande</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_client">Nouvelle relance</ButtonPrimaryLink>
                </DivButtonAction>
                <BoxTitle>
                    <h1>{items.raisonSociale} / {items.nafSousClasse ? items.nafSousClasse.libelle : "loading"}</h1>
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
                    <Flexbox>
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
                            <TablePotentiality headTable={["", "", ""]} />
                        </InfoViewContainer>
                        <ContactViewContainer>
                            <h2>Contact</h2>
                            <ContactContainer>
                                {items.contacts && items.contacts.length > 0
                                    ? items.contacts.map((contact,key) => <BoxContact key={key} contact={contact} />)
                                    : "Loading..."}
                            </ContactContainer>
                        </ContactViewContainer>
                    </Flexbox>
                ) ||
                (tabActive === "commandes" &&
                    <>
                        <h2>Commandes</h2>
                        <TableCommandeSingle commandes={items.commandes} />
                    </>
                ) ||
                (tabActive === "historiques" &&
                    <Flexbox>
                        <HistoriqueViewContainer>
                            <HeaderHistoriqueView>
                                <h2>Historique de contact</h2>
                                <BtnAjout text="Créer un historique"/>
                            </HeaderHistoriqueView>
                            <HistoriqueDataContainer>
                                {items.historiqueClients && items.historiqueClients.length > 0
                                    ? items.historiqueClients.map((historique, key) => <BoxHistorique key={key} dataHistorique={historique} />)
                                    : "Loading..."}
                               {/* {items.historiqueClients.map( (historique, key) => <BoxHistorique key={key} dataHistorique={historique} /> )}*/}
                            </HistoriqueDataContainer>
                        </HistoriqueViewContainer>
                    </Flexbox>
                ) ||
                (tabActive === "chiffres d'affaires" &&
                    <Flexbox>
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
                    </Flexbox>
                )}
            </MainContainer>
        </>
    )
}
export default Profile