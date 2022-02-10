import React, {useContext, useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {Link, useHistory, useParams} from "react-router-dom";
import {ButtonPrimary, ButtonPrimaryLink, ButtonReturn} from "../../utils/styles/button";
import RelanceContainer from "../../components/RelanceBox";
import BoxInfos from "../../components/Single/BoxInfos";
import {
    ContactViewContainer,
    BoxTitle,
    InfoViewContainer,
    InfoContainer,
    HistoriqueViewContainer, HeaderHistoriqueView, HistoriqueDataContainer
} from "../../utils/styles/single";
import DivButtonAction from "../../utils/styles/DivButton";
import BoxContact from "../../components/Single/BoxContact";
import Flexbox from "../../templates/Flexbox";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import {dateIsoFormated} from "../../utils/misc/Function";
import {getType} from "../../utils/misc/commandes/functions";
import Spinner from "../../components/Spinner";
import ModalCreateAction from "../Actions/modals/ModalCreateAction";
import ModalCreateHistorique from "../Historique/Modal/ModalCreateHistorique";
import ModalDeleteHistorique from "../Historique/Modal/ModalDeleteHistorique";
import {BtnTabs} from "../../utils/styles/tab";
import BoxHistorique from "../../components/Single/BoxHistorique";
import InfoPage from "../../components/Pagination/InfoPage";
import Pagination from "../../components/Pagination";
import {AddressServer} from "../App";

const Commande = () => {

    const { id } = useParams();
    const history = useHistory();

    const [tabs, setTabs] = useState([]);
    let offset = 5;
    const [ numberPage, setNumberPage ] = useState({value:1, valueDisplay:1} );

    const [ tabActive, setTabActive ] = useState( null );

    // Modals
    const [ showModalHistorique, setShowModalHistorique ] = useState(false);
    const [ showModalDeleteHistorique, setShowModalDeleteHistorique ] = useState(false);
    const [ idHistorique, setIdHistorique ] = useState({});
    const [ showModalRelance, setShowModalRelance ] = useState(false );

    const { items: commande, load: loadCommande, loading: loadingCommande } = useFetchGet(useContext(AddressServer)`/api/commandes/${ id }` );
    const { items: client, load: loadClient, loading: loadingClient } = useFetchGet(useContext(AddressServer) + (commande.client && commande.client ) );
    const { items: edition, load: loadEdition, loading: loadingEdition } = useFetchGet( useContext(AddressServer)+ (commande.supportMagazine && commande.supportMagazine ) );
    const { items: web, load: loadWeb, loading: loadingWeb } = useFetchGet( useContext(AddressServer)+ (commande.supportWeb && commande.supportWeb ) );
    const { items: encart, load: loadEncart, loading: loadingEncart } = useFetchGet( useContext(AddressServer)+ (commande.encart && commande.encart ) );
    const { items: print, load: loadPrint, loading: loadingPrint } = useFetchGet(useContext(AddressServer) + (commande.supportPrint && commande.supportPrint ) );
    const { items: relancesByCommande, loading: loadingRelancesByCommande, load: loadRelancesByCommande } = useFetchGet(useContext(AddressServer) + "/api/getRelancesByCommande/" + id );
    const { items: potentialCustomers, loading: loadingPotentialCustomers, load: loadPotentialCustomers, totalItems :totalClientsPotential } = useFetchGet(useContext(AddressServer) + "/api/getPotentialCustomers/" + ( edition.magazine && edition.magazine.id ) );
    // Historiques client
    const { items: historiquesByCommande, load: loadHistoriquesByCommande, loading: loadingHistoriquesByCommande } = useFetchGet(useContext(AddressServer) + `/api/getHistoriquesByCommande/${ id }`);

    const adresseRue = client.adresse && client.adresse[0].numero + " " + client.adresse[0].typeVoie + " " + client.adresse[0].nomVoie;
    const adresseVille = client.adresse && client.adresse[0].ville ? client.adresse[0].ville.nom + " " + client.adresse[0].ville.codePostal : "";
    const adresseFull = adresseRue + " " + adresseVille;

    const numberOfPages = Math.ceil(totalClientsPotential/offset);

    useEffect(() => {
        loadCommande();
    },   [ loadCommande ] );

    useEffect(() => {
        edition.magazine && loadPotentialCustomers();
    },   [ loadPotentialCustomers, edition.magazine ] );

    useEffect(() => {
        !loadingCommande && commande.client && loadClient()
    }, [ loadClient, loadingCommande ] );

    useEffect(() => {
        !loadingCommande && commande.supportMagazine && loadEdition()
    }, [ loadEdition, loadingCommande ] );

    useEffect(() => {
        !loadingCommande && commande.encart && loadEncart()
    }, [ loadEncart, loadingCommande ] );

    useEffect(() => {
        !loadingCommande && commande.supportWeb && loadWeb()
    }, [ loadWeb, loadingCommande ] );

    useEffect(() => {
        !loadingCommande && commande.supportPrint && loadPrint()
    }, [ loadPrint, loadingCommande ] );

    useEffect(() => {
        loadHistoriquesByCommande()
    }, [ loadHistoriquesByCommande ] );

    useEffect(() => {
        loadRelancesByCommande()
    }, [ loadRelancesByCommande ] );

    // Si commande type Edition on ajoute l'onglet prospect pour affichet les clients potentiels
    useEffect(() => {
        commande.supportMagazine
            ? setTabs([
                "commande",
                "client",
                "historiques",
                "prospect"
            ])
            : setTabs([
                "commande",
                "client",
                "historiques"
            ])
    }, [ commande.supportMagazine ] );

    // Une fois les onglets initialisés on simule le click sur le premier onglet
    useEffect( () => {
        tabs.length > 0 && setTabActive(tabs[0])
    }, [ tabs.length ] );


    // On gère la structure des informations de la commande suivant le type de commande
    const structureByType = () => {

        if( commande.supportWeb && Object.keys(commande.supportWeb).length > 0 )
        {
            return (
                <>
                    <BoxInfos titre="Préstation" information={ web.typePrestation && web.typePrestation.libelle } />
                    <BoxInfos titre="Type de site" information={ web.typeSite && web.typeSite.libelle } />
                    <BoxInfos titre="Adresse du site" information={ web.url ? web.url : "non commniqué" } />
                    <BoxInfos titre="Serveur du site" information={ web.server ? web.server : "non commniqué" } />
                    <BoxInfos titre={"Date de livraison:"} information={ dateIsoFormated( commande.fin ) } />
                </>
            )
        }
        else if( commande.supportPrint && Object.keys(commande.supportPrint).length > 0 )
        {
            return (
                <>
                    <BoxInfos titre="Préstation" information={ print.typePrint && print.typePrint.libelle } />
                    <BoxInfos titre="Quantité" information={ print.quantite } />
                    <BoxInfos titre={"Date de livraison:"} information={ dateIsoFormated( commande.fin ) } />
                </>
            )
        }
        else if( commande.supportMagazine && Object.keys(commande.supportMagazine).length > 0 )
        {
            return (
                <>
                    <BoxInfos titre="Préstation" information={ "Edition" } />
                    <BoxInfos titre="Nom du magazine" information={ edition.magazine && edition.magazine.nom } />
                    <BoxInfos titre="Nom de l'édition" information={ edition.nom } />
                    <BoxInfos titre="Nombre de pages" information={ edition.pages } />
                    <BoxInfos titre="Quantité" information={ edition.quantite } />
                    <BoxInfos titre={"Date de livraison:"} information={ dateIsoFormated( commande.fin ) } />
                </>
            )
        }
        else if( commande.encart && Object.keys(commande.encart).length > 0 )
        {
            return (
                <>
                    <BoxInfos titre="Préstation" information={ "Régie" } />
                    <BoxInfos titre="Nom du magazine" information={ encart.supportMagazine && encart.supportMagazine.magazine.nom } />
                    <BoxInfos titre="Nom de l'édition" information={ encart.supportMagazine && encart.supportMagazine.nom } />
                    <BoxInfos titre="Emplacement" information={ encart.emplacement && encart.emplacement.libelle } />
                    <BoxInfos titre="Format" information={ encart.format && encart.format.libelle } />
                    <BoxInfos titre={"Date de livraison:"} information={ dateIsoFormated( commande.fin ) } />
                </>
            )
        }
        else if( commande.communityManagement && Object.keys(commande.communityManagement).length > 0 )
        {
            return (
                <>
                    <BoxInfos titre="Préstation" information={ "Community Management" } />
                    <BoxInfos titre="Posts mensuels" information={ commande.communityManagement && commande.communityManagement.postMensuel } />
                    <BoxInfos titre={"Date de livraison:"} information={ dateIsoFormated( commande.fin ) } />
                </>
            )
        } else if( commande.contenu && Object.keys(commande.contenu).length > 0 )
        {
            return (
                <>
                    <BoxInfos titre="Préstation" information={ "Contenu " + ( commande.contenu && commande.contenu.typeContenu.libelle ) } />
                    <BoxInfos titre="Nombre de feuillets" information={ commande.contenu && commande.contenu.feuillets } />
                    <BoxInfos titre={"Date de livraison:"} information={ dateIsoFormated( commande.fin ) } />
                </>
            )
        }
    }

    const closeModal = () => {
        setShowModalRelance(false);
        setShowModalHistorique(false);
        setShowModalDeleteHistorique(false)
    }

    if ( loadingCommande || loadingClient || loadingEdition || loadingPrint || loadingEncart || loadingWeb ){
        return (
            <MainContainer>
                <Spinner />
            </MainContainer>
        )
    }

    return (
        <>
            <MainContainer>
                <DivButtonAction>
                    <ButtonPrimaryLink to={ "/update_commande/" + commande.id }>Modifier la commande</ButtonPrimaryLink>
                    <ButtonPrimary onClick={() => setShowModalRelance(true)}>Nouvelle relance</ButtonPrimary>
                    <ButtonPrimary onClick={() => setShowModalHistorique(true)}>Nouvel historique</ButtonPrimary>
                </DivButtonAction>
                <DivButtonAction justify={"flex-start"}>
                    <ButtonReturn onClick={history.goBack} margin={"10px 0 0 0"}>Retour à mon profil</ButtonReturn>
                </DivButtonAction>
                { relancesByCommande.length > 0 && <RelanceContainer relances={ relancesByCommande } client request={ loadRelancesByCommande } /> }
                <BoxTitle>
                    <h1>{commande.title} / {getType( commande )}</h1>
                    <p>Statut: { commande.statut && commande.statut.libelle }</p>
                </BoxTitle>
                <>
                    { tabs.map( (tab, key) => (
                        <BtnTabs
                            key={ key }
                            active={ tabActive === tab }
                            onClick={(e) => {
                                e.preventDefault()
                                setTabActive( tab )
                            }}
                        >{ tab }</BtnTabs>
                    ) ) }
                </>
                { tabActive === "commande" && (
                        <Flexbox>
                            <InfoViewContainer>
                                <h2>Informations liées à la commande</h2>
                                <InfoContainer>
                                    { structureByType() }
                                </InfoContainer>
                            </InfoViewContainer>
                            <InfoViewContainer>
                                <h2>Informations liés à la facturation</h2>
                                <InfoContainer>
                                    <BoxInfos titre="Facturation : " information={ commande.facturation + " €" } />
                                    <BoxInfos titre="Réduction : " information={ (isNaN(commande.reduction) ? 0 : commande.reduction) + " €" } />
                                    <BoxInfos titre="Total : " information={ (commande.facturation - (isNaN(commande.reduction) ? 0 : commande.reduction) ) + " €" } />
                                </InfoContainer>
                            </InfoViewContainer>
                        </Flexbox>
                    )
                }
                { tabActive === "client" && (
                    <Flexbox>
                        <InfoViewContainer>
                            <h2>Clients</h2>
                            <InfoContainer>
                                { client && client.nafSousClasse ? (
                                    <>
                                        <BoxInfos titre="Nom" information={ client.raisonSociale } />
                                        <BoxInfos titre="Activités" information={ client.nafSousClasse.libelle } />
                                        <BoxInfos titre="Email" information={ client.email } />
                                        <BoxInfos titre="Téléphone" information={ client.telephone } />
                                        <BoxInfos titre="Adresse" information={ adresseFull } />
                                        <ButtonPrimaryLink to={ "profile/" + ( commande.client && commande.client.slice( -2 ) ) }>Voir la fiche client</ButtonPrimaryLink>
                                    </>
                                ) : <Spinner /> }
                            </InfoContainer>
                        </InfoViewContainer>
                        <ContactViewContainer>
                            <h2>Contact du projet</h2>
                            <BoxContact contact={ commande.contact && commande.contact.length > 0 ? commande.contact[ 0 ] : "loading" } />
                        </ContactViewContainer>
                    </Flexbox>
                )}
                { tabActive === "historiques" && (
                    <Flexbox>
                        <HistoriqueViewContainer>
                            <HeaderHistoriqueView>
                                <h2>Historique de contact</h2>
                            </HeaderHistoriqueView>
                            <HistoriqueDataContainer>
                                { historiquesByCommande && historiquesByCommande.length > 0 && !loadingHistoriquesByCommande
                                    ? historiquesByCommande.map( ( historique, key ) => <BoxHistorique key={ key } dataHistorique={ historique } setIdHistorique={setIdHistorique} setShowModalDeleteHistorique={setShowModalDeleteHistorique} /> )
                                    : historiquesByCommande.length === 0 && "Aucun historique" }
                            </HistoriqueDataContainer>
                        </HistoriqueViewContainer>
                    </Flexbox>
                )}
                { commande.supportMagazine && tabActive === "prospect" && (
                    <>
                        <h2>Prospects</h2>
                        <InfoPage numberPage={numberPage.value} numberOfPages={numberOfPages} offset={offset} totalItems={totalClientsPotential} />
                        <table>
                            <thead>
                                <tr>
                                    <th>Raison Sociale</th>
                                    <th>Téléphone</th>
                                    <th>Email</th>
                                    <th>Ville</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                potentialCustomers && potentialCustomers.map( (client, key) => (
                                    <tr key={key}>
                                        <td><Link to={{pathname: `/profile/${client.client.id}`}}>{client.client.raisonSociale}</Link></td>
                                        <td><Link to={{pathname: `/profile/${client.client.id}`}}>{client.client.telephone}</Link></td>
                                        <td><Link to={{pathname: `/profile/${client.client.id}`}}>{client.client.email}</Link></td>
                                        <td><Link to={{pathname: `/profile/${client.client.id}`}}>{client.client.adresse && client.client.adresse[0].ville.codePostal + " " + client.client.adresse[0].ville.nom}</Link></td>
                                    </tr>
                                ) )
                            }
                            </tbody>
                        </table>
                        <Pagination
                            numberOfPages={ numberOfPages }
                            setNumberPage={ setNumberPage }
                            numberPage={ numberPage.value }
                        />
                    </>

                )}
            </MainContainer>
            { showModalRelance && <ModalCreateAction commande={commande} client={client} closeModal={closeModal} request={loadRelancesByCommande} actionFor={"commande"}/> }
            { showModalHistorique && <ModalCreateHistorique closeModal={closeModal} idClient={client.id} idCommande={commande.id} request={loadHistoriquesByCommande} historiqueCommande />  }
            { showModalDeleteHistorique && <ModalDeleteHistorique request={loadHistoriquesByCommande} closeModal={closeModal} historique={idHistorique} /> }
      </>
    )
}
export default Commande;