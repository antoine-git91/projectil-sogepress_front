import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import MainContainer from "../../templates/Container";
import {useParams} from "react-router-dom";
import { ButtonPrimaryLink } from "../../utils/styles/button";
import RelanceContainer from "../../components/RelanceBox";
import BoxInfos from "../../components/Single/BoxInfos";
import {ContactViewContainer, BoxTitle, InfoViewContainer, InfoContainer} from "../../utils/styles/single";
import DivButtonAction from "../../utils/styles/DivButton";
import BoxContact from "../../components/Single/BoxContact";
import Flexbox from "../../templates/Flexbox";
import {useFetchGet} from "../../utils/misc/useFetchGet";

const Commande = () => {

    const {id} = useParams()

    const {items: commande, load, loading} = useFetchGet(`http://127.0.0.1:8000/api/commandes/${id}`);
    useEffect(() => {
        load()
    }, [load])
    console.log(commande)

    const adresseClient = commande.client ? commande.client.adresses[0] : "" ;
    const {items: adresse, load: loadAdresse, loading: loadingAdresse} = useFetchGet('http://127.0.0.1:8000'  + adresseClient  );
    useEffect(() => {
        loadAdresse()
    }, [loadAdresse])
    console.log(adresse)

    const adresseRue = adresse.numero + " " + adresse.typeVoie + " " + adresse.nomVoie;
    const adresseVille = adresse.ville ? adresse.ville.nom + " " + adresse.ville.codePostal : "";
    const adresseFull = adresseRue + " " + adresseVille;

    const getType = () => {
        if(commande.hasOwnProperty("supportMagazine"))
            return "Magasine"
        if(commande.hasOwnProperty("supportPrint"))
            return "Print"
        if(commande.hasOwnProperty("supportWeb"))
            return "Site Web"
        if(commande.hasOwnProperty("reseauSocial"))
            return "Community Manager"
    }

    const date = new Date(commande.fin);
    const dateEnd = date.getDate() + '-' + (date.getMonth()+1) + "-" + date.getFullYear();//prints expected format.

    if (loading){
        return <div>Chargement</div>
    } else {

        return (
            <>
                <MainContainer>
                    <RelanceContainer />
                    <DivButtonAction>
                        <ButtonPrimaryLink to="/creation_client">Nouvelle relance</ButtonPrimaryLink>
                    </DivButtonAction>
                    <BoxTitle>
                        <h1>{getType()} / <Link to={"/profile/" + commande.client.id}>{commande.client ? commande.client.raisonSociale : "loading"}</Link></h1>
                        <p>Date de livraison: <span>{dateEnd}</span></p>
                    </BoxTitle>
                        <Flexbox>
                            <InfoViewContainer>
                                <h2>Informations liées à la commande</h2>
                                <InfoContainer>
                                    <BoxInfos titre="Type de produit" information={'items.telephone'} />
                                    <BoxInfos titre="Format" information={"A faire"} />
                                    <BoxInfos titre="Nombre de pages" information={"a faire"} />
                                    <BoxInfos titre="Nombre d'exemplaires" information={"a faire"} />
                                    <BoxInfos titre="Imprimeur" information={"a faire"} />
                                </InfoContainer>
                                <h2>Clients</h2>
                                <InfoContainer>
                                    <BoxInfos titre="Nom" information={commande.client ? commande.client.raisonSociale : "loading"} />
                                    <BoxInfos titre="Activités" information={commande.client ? commande.client.email : "loading"} />
                                    <BoxInfos titre="Email" information={commande.client ? commande.client.email : "loading"} />
                                    <BoxInfos titre="Téléphone" information={commande.client ? commande.client.tel : "loading"} />
                                    <BoxInfos titre="Adresse" information={ adresseFull } />
                                </InfoContainer>
                                <h2>Prospects</h2>
                                <InfoContainer>
                                    <BoxInfos titre="Ville de propsection" tags={["37000", "37100", "37290"]} />
                                </InfoContainer>
                                <h2>Informations liés à la facturation</h2>
                                <InfoContainer>
                                    <BoxInfos titre="Montant de la facture" information={commande.facturation + " €"} />
                                </InfoContainer>
                            </InfoViewContainer>
                            <ContactViewContainer>
                                <h2>Contact du projet</h2>
                                <BoxContact contact={commande.contact && commande.contact.length > 0 ? commande.contact[0] : "loading"} />
                            </ContactViewContainer>
                        </Flexbox>
                </MainContainer>
            </>
        )
    }
}
export default Commande;