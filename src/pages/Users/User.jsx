import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import MainContainer from "../../templates/Container";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import {BoxTitle, InfoContainer, InfoViewContainer} from "../../utils/styles/single";
import BoxInfos from "../../components/Single/BoxInfos";
import {BtnTabs} from "../../utils/styles/tab";
import Spinner from "../../components/Spinner";
import {AddressServer} from "../App";

const User = () => {

    const {id_user} = useParams();
    const tabs = [ "Informations générales", "Commandes", "Chiffres d'affaires" ];
    const [ tabActive, setTabActive ] = useState( tabs[ 0 ] );
    const headTable = [ "Entreprise", "Type de support" , "Echéance" , "Facturation", "Status", "Date de création" ]

    const { items: user, load: loadUser, loading: loadingUser } = useFetchGet(useContext(AddressServer) + "/api/users/" + id_user);
    const { items: commandesUser, load: loadCommandesUser, loading: loadingCommandesUser } = useFetchGet(useContext(AddressServer) + "/api/getCommandesByUser/" + id_user);

    useEffect( () => {
        loadUser()
    }, [ loadUser ] );

    useEffect( () => {
        loadCommandesUser()
    }, [ loadCommandesUser ] );

    // On check le type du support pour retourner une valeur
    const getTypeSupport = ( objectKey ) => {

        let type;

        if( objectKey.supportWeb !== null ){
            console.log("support web")
            type = "Site web";
        } else if( objectKey.supportPrint !== null ){
            console.log("support print")
            type = "Print";
        } else if(  objectKey.supportMagazine !== null ){
            console.log("support print")
            type = "Edition";
        } else if(  objectKey.contenu !== null ){
            console.log("support print")
            type = "Contenu";
        } else if(  objectKey.communityManagement !== null ){
            console.log("support print")
            type = "Community Management";
        } else if(  objectKey.encart !== null ){
            console.log("support print")
            type = "Régie";
        }

        return type
    }

    return(
        <MainContainer>
            <DivButtonAction>
                <ButtonPrimaryLink to={{ pathname:"/update_user/" + user.id }}>Modifier l'utilisateur</ButtonPrimaryLink>
                <ButtonPrimaryLink to="/create_user">Nouvel utilisateur</ButtonPrimaryLink>
            </DivButtonAction>
            { loadingUser ? <Spinner />
                : <>
                    <BoxTitle>
                    <h1>{user.nom + " " + user.prenom} / { user.roles && user.roles[0] }</h1>
                    </BoxTitle>
                    { tabs.map( tab => (
                        <BtnTabs
                        key={ tab }
                        active={ tabActive === tab }
                        onClick={(e) => {
                        e.preventDefault()
                        setTabActive( tab )
                    }}>{ tab }</BtnTabs>
                    ) ) }
                    <InfoViewContainer>
                        { tabActive === "Informations générales" &&
                            <>
                            <h2>Informations générales</h2>
                            <InfoContainer>
                            <BoxInfos titre={ "Nom" } information={ user.nom } />
                            <BoxInfos titre={ "Prénom" } information={ user.prenom } />
                            <BoxInfos titre={ "Téléphone" } information={ user.telephone } />
                            <BoxInfos titre={ "Email" } information={ user.email } />
                            </InfoContainer>
                            </>
                        }
                        { tabActive === "Commandes" &&
                            <>
                                <h2>Commandes</h2>
                                {/*{!loading && 'Chargement...'}*/}
                                { commandesUser && commandesUser.length > 0 ?
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    {headTable.map((item, key) => <th key={key}>{item}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {commandesUser.map((commande, key) => (
                                                    <tr key={key}>
                                                        <td><Link to={{pathname: `/commande/${commande.id}`}}>{ commande.client.raisonSociale }</Link></td>
                                                        <td><Link to={{pathname: `/commande/${commande.id}`}}>{ getTypeSupport(commande) }</Link></td>
                                                        <td><Link to={{pathname: `/commande/${commande.id}`}}>{ new Date( commande.fin ).toLocaleString('fr-FR', { day: "2-digit", month: "2-digit", year: "numeric"}) }</Link></td>
                                                        <td><Link to={{pathname: `/commande/${commande.id}`}}>{ commande.facturation - commande.reduction }</Link></td>
                                                        <td><Link to={{pathname: `/commande/${commande.id}`}}>{ commande.statut.libelle  }</Link></td>
                                                        <td><Link to={{pathname: `/commande/${commande.id}`}}>{ new Date( commande.createdAt ).toLocaleString('fr-FR', { day: "2-digit", month: "2-digit", year: "numeric"})  }</Link></td>
                                                    </tr>
                                                ) ) }
                                            </tbody>
                                        </table>
                                    </>
                                : "Aucune commandes" }
                            </>
                        }
                        { tabActive === "Chiffres d'affaires" &&
                            <>
                                <h2>Chiffres d'affaires</h2>
                                <InfoContainer>
                                    <BoxInfos titre={ "Nom" } information={ user.nom } />
                                    <BoxInfos titre={ "Prénom" } information={ user.prenom } />
                                    <BoxInfos titre={ "Email" } information={ user.email } />
                                </InfoContainer>
                            </>
                        }
                    </InfoViewContainer>
                </>
            }
        </MainContainer>
    )
}
export default User