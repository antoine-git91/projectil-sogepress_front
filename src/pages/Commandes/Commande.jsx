import React, {useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {useParams} from "react-router-dom";
import { ButtonPrimaryLink } from "../../utils/styles/button-primary";
import RelanceContainer from "../../components/RelanceBox";
import BoxInfos from "../../components/Single/BoxInfos";
import {SingleMainContainer,ContactViewContainer, BoxTitle, InfoViewContainer, InfoContainer} from "../../utils/styles/single";
import DivButtonAction from "../../utils/styles/DivButton";
import BoxContact from "../../components/Single/BoxContact";

const Commande = () => {

    const {id} = useParams()
    const [items, setItems] = useState({})
    const [adresse, setAdresse] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const requestOptions = {
            method: 'Get',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('itemName')
            }
        };
        fetch(`http://127.0.0.1:8000/api/commandes/${id}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result)
                    fetch(`http://127.0.0.1:8000` + result.client.adresses[0])
                        .then(res => res.json())
                        .then(
                            (result) => {
                                setAdresse(result);

                            },
                            // Remarque : il faut gérer les erreurs ici plutôt que dans
                            // un bloc catch() afin que nous n’avalions pas les exceptions
                            // dues à de véritables bugs dans les composants.
                            (error) => {
                                console.log(error)
                            }
                        )
                    setIsLoading(false);
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    console.log(error)
                }
            ).then(

        )
    }, [id])

    const getType = () => {
        if(items.hasOwnProperty("supportMagazine"))
            return "Magasine"
        if(items.hasOwnProperty("supportPrint"))
            return "Print"
        if(items.hasOwnProperty("supportWeb"))
            return "Site Web"
        if(items.hasOwnProperty("reseauSocial"))
            return "Community Manager"
    }

    const date = new Date(items.fin);
    const datend = date.getDate() + '-' + (date.getMonth()+1) + "-" + date.getFullYear();//prints expected format.

    if (isLoading){
        return <div>Chargement</div>
    } else {

        return (
            <MainContainer>

                <RelanceContainer />
                <DivButtonAction>
                    <ButtonPrimaryLink to="/creation_client">Nouvelle relance</ButtonPrimaryLink>
                </DivButtonAction>
                <BoxTitle>
                    <h1>{getType()} / <span>{items.client.raisonSociale}</span></h1>
                    <p>Date de livraison: <span>{datend}</span></p>
                </BoxTitle>
                    <SingleMainContainer>
                        <InfoViewContainer>
                            <h2>Informations liées à la commande</h2>
                            <InfoContainer>
                                <BoxInfos titre="Type de produit" information={'items.telephone'} />
                                <BoxInfos titre="Format" information={items.email} />
                                <BoxInfos titre="Nombre de pages" information={'25 rue du cefim 370000 Tours'} />
                                <BoxInfos titre="Nombre d'exemplaires" information={items.site_internet} />
                                <BoxInfos titre="Imprimeur" information={items.site_internet} />
                            </InfoContainer>
                            <h2>Clients</h2>
                            <InfoContainer>
                                <BoxInfos titre="Nom" information={items.client.raisonSociale} />
                                <BoxInfos titre="Activités" information={items.client.email} />
                                <BoxInfos titre="Email" information={items.client.email} />
                                <BoxInfos titre="Téléphone" information={items.site_internet} />
                                <BoxInfos titre="Adresse" information={items.site_internet} />
                            </InfoContainer>
                            <h2>Prospects</h2>
                            <InfoContainer>
                                <BoxInfos titre="Ville de propsection" tags={["37000", "37100", "37290"]} />
                            </InfoContainer>
                            <h2>Informations liés à la facturation</h2>
                            <InfoContainer>
                                <BoxInfos titre="Montant de la facture" information={items.facturation + " €"} />
                            </InfoContainer>
                        </InfoViewContainer>
                        <ContactViewContainer>
                            <h2>Contact du projet</h2>
                            <BoxContact contact={items.contact[0]} />
                        </ContactViewContainer>
                    </SingleMainContainer>
            </MainContainer>
        )
    }
}
export default Commande;