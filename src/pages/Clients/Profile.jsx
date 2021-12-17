import React, {useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {useParams} from "react-router-dom";
import {ButtonPrimaryLink, DeleteButton} from "../../utils/styles/button";
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
    font-weight: bold;
  `}
`


const Profile = () => {

    const {idClient} = useParams();
    const tabs = [
        "contacts",
        "commandes",
        "historiques",
        "chiffres d'affaires"
    ]
    const [tabActive, setTabActive] = useState(tabs[0]);
    const {items, load, loading} = useFetchGet(`https://127.0.0.1:8000/api/clients/${idClient}`);

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
                <DivButtonAction>
                    <ButtonPrimaryLink to={{pathname: `/update_client/${idClient}`}}>Modifier le client</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_commande">Nouvelle commande</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_client">Nouvelle relance</ButtonPrimaryLink>
                </DivButtonAction>
                <RelanceContainer />
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
                { (tabActive === "contacts" &&
                    <Flexbox>
                        <InfoViewContainer>
                            <h2>Coordonnées</h2>
                            <InfoContainer>
                                <BoxInfos titre="Téléphone" information="" />
                                <BoxInfos titre="Email" information={items.email} />
                                <BoxInfos titre="Adresse" information={ items.adresse[0].numero + ' ' + items.adresse[0].typeVoie + ' ' + items.adresse[0].nomVoie + ' ' + items.adresse[0].ville.nom + ' ' + items.adresse[0].ville.codePostal} />
                                { items.adresse && items.adresse.length > 1 &&
                                (<BoxInfos titre="Adresse de livraison" information={ items.adresse[1].numero + ' ' + items.adresse[1].typeVoie + ' ' + items.adresse[1].nomVoie + ' ' + items.adresse[1].ville.nom + ' ' + items.adresse[1].ville.codePostal} />)}
                                <BoxInfos titre="Site internet" information={items.siteInternet ? items.siteInternet : "Aucun site internet"} />
                            </InfoContainer>
                            <h2>Potentialité</h2>
                            { items.potentialites && items.potentialites.length > 0 ?
                                (<table>
                                    <thead>
                                    <tr>
                                        <th>Type de potentialité</th>
                                        <th>Magazine</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { items.potentialites.map(( potentiality, key ) => (
                                        <tr key={key + potentiality.id} id={ key }>
                                            <td>{ potentiality.typePotentialite.libelle }</td>
                                            <td>{ potentiality ? potentiality.magazine.nom : "" }</td>
                                        </tr>
                                    )) }
                                    </tbody>
                                </table>)
                            : "Aucune potentialité"}
                        </InfoViewContainer>
                        <ContactViewContainer>
                            <h2>Contacts</h2>
                            <ContactContainer>
                                {items.contacts && items.contacts.length > 0
                                    ? items.contacts.map((contact,key) => <BoxContact key={key} contact={contact} />)
                                    : "Aucun contact"}
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