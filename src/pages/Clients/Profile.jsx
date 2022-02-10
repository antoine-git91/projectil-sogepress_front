import React, {useContext, useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {Link, useHistory, useParams} from "react-router-dom";
import {ButtonPrimary, ButtonPrimaryLink, ButtonReturn} from "../../utils/styles/button";
import RelanceContainer from "../../components/RelanceBox";
import BoxInfos from "../../components/Single/BoxInfos";
import BoxContact from "../../components/Single/BoxContact";
import BoxHistorique from "../../components/Single/BoxHistorique";
import {ContactViewContainer, BoxTitle, InfoViewContainer, InfoContainer,ContactContainer,HistoriqueViewContainer, HistoriqueDataContainer,HeaderHistoriqueView} from "../../utils/styles/single";
import styled from "styled-components";
import DivButtonAction from "../../utils/styles/DivButton";
import Spinner from "../../components/Spinner";
import Flexbox from "../../templates/Flexbox";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import {BtnTabs} from "../../utils/styles/tab";
import {dateIsoFormated} from "../../utils/misc/Function";
import ModalCreateAction from "../Actions/modals/ModalCreateAction";
import Pagination from "../../components/Pagination";
import InfoPage from "../../components/Pagination/InfoPage";
import ModalCreateHistorique from "../Historique/Modal/ModalCreateHistorique";
import ModalDeleteHistorique from "../Historique/Modal/ModalDeleteHistorique";
import {AddressServer} from "../App";


const BoxAnneeCaStyle = styled.div`
    display: flex;
    margin-top: 50px;
    margin-bottom: 50px;
  align-items: center;
  
  & div:last-child div:after{
    content: none;
  }
`

const ChiffreDateContainer = styled.div`
  display: flex;
  align-items: center;
  
  input{
    padding: 8px 20px;
    margin: 0 15px;
  }
`

const ItemCaMounth = styled.div`
display : flex;
flex-direction: column;
align-items: center;
margin: 0 15px;
`

const Cercle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3b3b3b;
  position: relative;
  margin: 15px 0;

  &:after {
    content: "";
    width: 80px;
    height: 3px;
    background-color: #eeeeee;
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
`

const ResultCa = styled.p`

`

const TotalCa = styled.div`
display : flex;
justify-content: flex-end;
font-weight: 900;
  margin-top: 30px;
`

const TableCommandeStyle = styled.table`
      width: 100%;
    `

const Profile = () => {

    const { idClient } = useParams();
    const history = useHistory();

    const tabs = [
        "contacts",
        "commandes",
        "historiques",
        "chiffres d'affaires"
    ]

    const [ tabActive, setTabActive ] = useState( tabs[ 0 ] );

    const [ startDate, setStartDate ] = useState("" );
    const [ endDate, setEndDate ] = useState("" );

    let startDaySelected = isNaN( parseInt( startDate.slice( 8,10 ) ) ) ? 1 : parseInt( startDate.slice( 8,10 ) );
    let endDaySelected = isNaN( parseInt( endDate.slice( 8,10 ) ) ) ? 31 : parseInt( endDate.slice( 8,10 ) );

    let startMouthSelected = isNaN( parseInt( startDate.slice( 5,7 ) ) ) ? 1 : parseInt( startDate.slice( 5,7 ) );
    let endMouthSelected = isNaN( parseInt( endDate.slice( 5,7 ) ) ) ? 12 : parseInt( endDate.slice( 5,7 ) );

    let startYearSelected = ( isNaN( parseInt( startDate.slice( 0,4 ) ) ) ? new Date().getFullYear() : parseInt( startDate.slice(0,4 ) ) );
    let endYearSelected =   ( isNaN( parseInt( endDate.slice( 0,4 ) ) ) ? new Date().getFullYear() : parseInt( endDate.slice( 0,4 ) ) );

    const [ commandeCurrentSorted, setCommandeCurrentSorted ] = useState([] );
    const [ commandeLeastOneSorted, setCommandeLeastOneSorted ] = useState([] );
    const [ numberOfMounths,setNumberOfMounths ] = useState(0 );
    const [ caCurrentObject, setCaCurrentObject ] = useState({} );
    const [ caLeastOneObject, setCaLeastOneObject ] = useState({} );

    const headTable = [ "Type", "Magasine", "Montant", "Status", "" ];
    const [totalCommandesPrice, setTotalCommandesPrice] = useState(0);

    // Pagination Commande
    let offsetCommandes = 5;
    const [ numberPageCommande, setNumberPageCommande ] = useState({value:1, valueDisplay:1} );

    // Modals
    const [ showModalHistorique, setShowModalHistorique ] = useState(false);
    const [ showModalDeleteHistorique, setShowModalDeleteHistorique ] = useState(false);
    const [ idHistorique, setIdHistorique ] = useState({});
    const [ showModalRelance, setShowModalRelance ] = useState(false );

    // Requests
    const { items: client, load: loadClient, loading: loadingClient } = useFetchGet(useContext(AddressServer) + `/api/clients/${ idClient }`);
    const { items: commandesByClient, load: loadCommandesByClient, loading: loadingCommandeByClient, totalItems } = useFetchGet(useContext(AddressServer) + `/api/getCommandesByClient/${ idClient }?page=${ numberPageCommande.value }`);
    const { items: relancesByClient, load: loadRelancesByClient, loading: loadingRelancesByClient } = useFetchGet(useContext(AddressServer) + `/api/getRelancesByClient/${ idClient }`);
    // Requête des commandes par date : onglet Chiffre d'affaire
    const { items: caCurrentYearByMonth, load: loadcaCurrentYearByMonth, loading: loadingcaCurrentYearByMonth } = useFetchGet(useContext(AddressServer) + `/api/getCaByMonthAndClient/${ idClient }?page=1&debut%5Bafter%5D=${ startDate.length === 0 ? new Date().getFullYear() + "-01-01" : startDate }&fin%5Bbefore%5D=${ endDate.length === 0 ? new Date().getFullYear() + "-12-01" : endDate }`);
    const { items: caPreviousYearByMonth, load: commandeCALeastOneLoad, loading: commandeCALeastOneLoading } = useFetchGet(useContext(AddressServer) + `/api/getCaByMonthAndClient/${ idClient }?page=1&debut%5Bafter%5D=${ startDate.length === 0 ? ( new Date().getFullYear() - 1 ) + "-01-01" : startDate - 1 }&fin%5Bbefore%5D=${ endDate.length === 0 ? ( new Date().getFullYear() - 1 ) + "-12-01" : endDate - 1 }`);
    // Historiques client
    const { items: historiqueByClient, load: loadHistoriqueByClient, loading: loadingHistoriqueByClient } = useFetchGet(useContext(AddressServer) + `/api/getHistoriquesByClient/${ idClient }`);

    const numberOfPagesCommandes = Math.ceil(totalItems/offsetCommandes);

    useEffect(() => {
        loadClient()
    }, [ loadClient ]);

    useEffect(() => {
        loadHistoriqueByClient()
    }, [ loadHistoriqueByClient ]);

    useEffect(() => {
        loadCommandesByClient()
    }, [ loadCommandesByClient ])

    useEffect(() => {
        loadRelancesByClient()
    }, [ loadRelancesByClient ]);

    const mounthSorted = (a,b) => {
        return a[ 0 ] - b[ 0 ]
    };

    // On initialise l'objet CAObject avec tous les mois et les valeurs de chaque mois de l'année en cours
    useEffect(() => {
        makeCaByMonth(loadingcaCurrentYearByMonth, setCaCurrentObject, caCurrentObject, caCurrentYearByMonth, setCommandeCurrentSorted, startYearSelected, endYearSelected )
    }, [ caCurrentYearByMonth, loadingcaCurrentYearByMonth ] );

    // On initialise l'objet CAObject avec tous les mois et les valeurs de chaque mois de l'année n-1
    useEffect(() => {
        makeCaByMonth(commandeCALeastOneLoading, setCaLeastOneObject, caLeastOneObject, caPreviousYearByMonth, setCommandeLeastOneSorted, ( startYearSelected - 1 ), ( endYearSelected - 1 ) )
    }, [ caPreviousYearByMonth, commandeCALeastOneLoading ] );


    const makeCaByMonth = (loading, setObject, object, commandeCa, setCommandeSorted, startYear, endYear) => {
        if(loading === true){
            // ### PARTIE 1 - On calcule le nombre de mois entre les deux dates selectionnées
            // - Si même année
            if( ( endMouthSelected - startMouthSelected >= 0 ) && ( endYearSelected - startYearSelected === 0 ) ){
                setNumberOfMounths(( endMouthSelected - startMouthSelected ) + 1 );
            }
            // - Si année différente
            else if(endYear - startYear > 0){
                let differenceYear = endYear - startYear;
                setNumberOfMounths( ( endMouthSelected + ( 12 * differenceYear ) ) - ( startMouthSelected - 1  ) );
            }

            // ### PARTIE 2 - On initialise l'objet CAObject en fonction des dates choisies
            if( numberOfMounths > 0 ){
                /*
                * On démarre du mois choisi et on additionne la différence du nombre de mois
                * */
                for( let i = startMouthSelected ; i < numberOfMounths + startMouthSelected ; i++ ){

                    let newYear = Math.floor( i/12 );
                    let resetMounthNewYear = i - ( 12 * newYear );

                    // Si resetMounthYear === 0 > c'est le 12eme mois de l'année
                    if( resetMounthNewYear === 0 ){
                        setObject(object[ ( startYear +  newYear - 1 ) + "12" ] = { "caMounthly": 0, "mounthly": "12" + ( startYear + newYear - 1 ).toString() });
                    }
                    // Si le mois est inf. à 10 on ajoute un zero ex septembre = 9 > 09
                    else if( resetMounthNewYear < 10 ){
                        setObject(object[ (startYear + newYear ) + "0" + resetMounthNewYear ] = { "caMounthly": 0, "mounthly": "0" + resetMounthNewYear.toString() + ( startYear + newYear ).toString() });
                    }
                    else {
                        setObject(object[ ( startYear +  newYear ) + "" + resetMounthNewYear ] = { "caMounthly": 0, "mounthly": resetMounthNewYear.toString() + ( startYear + newYear ).toString() });
                    }
                }
            };

            // PARTIE 3 - On met à jour les chiffres d'affaire en fonction des mois
            commandeCa.forEach( el => {

                let yearMounthStartCommande = el.month && el.month.replace("-", "");

                if( object.hasOwnProperty( yearMounthStartCommande ) ) {
                    // trouve l'index correspondant et ajoute le prix au CA
                    object[ yearMounthStartCommande ].caMounthly = el.total;
                }
            });

            // PARTIE 4 - On convertit l'objet en tableau en triant les dates
            setCommandeSorted( Object.entries( object ).sort( mounthSorted ) );

            /* PARTIE 5 - On reset l'objet CAObject du au problème où à la fin de l'affichage, l'objet devenait
            * {caMounthly: 0, mounth : endMouthSelected}
            **/
            setObject({} )
        }
    }

    const commandeDateValidate = ( e ) => {
        e.preventDefault();
        // On checke si la date départ n'est pas inférieur à la date de fin
        if( endDaySelected - startDaySelected < 0 && endMouthSelected - startMouthSelected >= 0 ){
            alert("jour impossible");
            return;
        } else {
            if(endMouthSelected - startMouthSelected < 0 && endYearSelected - startYearSelected <= 0){
                alert("mois impossible");
                return;
            } else {
                if(endYearSelected - startYearSelected < 0){
                    alert("année impossible");
                    return;
                } else {
                    loadcaCurrentYearByMonth();
                    commandeCALeastOneLoad();
                }
            }
        }
    };

    useEffect(() => {
        if( commandesByClient && commandesByClient.length > 0 ){
            let allPricesOfCommandes = commandesByClient.map(commande => commande.facturation )
            let total = allPricesOfCommandes.reduce((previousValue, currentValue) => previousValue + currentValue)
            setTotalCommandesPrice(total)
        }
    }, [ commandesByClient ]);

    const closeModal = () => {
        setShowModalRelance(false);
        setShowModalHistorique(false);
        setShowModalDeleteHistorique(false)
    }


    if( loadingClient && loadingRelancesByClient ) {
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
                    <ButtonPrimaryLink to={ { pathname: `/update_client/${ idClient }` } }>Modifier le client</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_commande">Nouvelle commande</ButtonPrimaryLink>
                    <ButtonPrimary onClick={() => setShowModalRelance(true)}>Nouvelle relance</ButtonPrimary>
                    <ButtonPrimary onClick={() => setShowModalHistorique(true)}>Nouvel historique</ButtonPrimary>
                </DivButtonAction>
                <DivButtonAction justify={"flex-start"}>
                    <ButtonReturn onClick={history.goBack} margin={"10px 0 0 0"}>Retour</ButtonReturn>
                </DivButtonAction>
                { relancesByClient && relancesByClient.length > 0 && <RelanceContainer relances={relancesByClient} commande loading={loadingRelancesByClient} request={loadRelancesByClient} /> }
                <BoxTitle>
                    <h1>{ client.raisonSociale } / { client.nafSousClasse ? client.nafSousClasse.libelle : "loading" }</h1>
                </BoxTitle>
                <>
                    { tabs.map( (tab, key) => (
                        <BtnTabs
                            key={ tab }
                            active={ tabActive === tab }
                            onClick={(e) => {
                                e.preventDefault()
                                setTabActive( tab )
                            }}
                        >{ tab }</BtnTabs>
                    ) ) }
                </>
                { ( tabActive === "contacts" &&
                    <Flexbox>
                        <div style={{width:"50%"}}>
                            <InfoViewContainer>
                                <h2>Coordonnées</h2>
                                <InfoContainer>
                                    <Flexbox>
                                        <BoxInfos titre="Téléphone" information={ client.telephone ? client.telephone : "Aucun numéro de téléphone" } />
                                        <BoxInfos titre="Email" information={ client.email } />
                                    </Flexbox>
                                    <Flexbox>
                                        { client.adresse &&
                                        <BoxInfos titre="Adresse" information={ [client.adresse[ 0 ].numero + ' ' + client.adresse[ 0 ].typeVoie + ' ' + client.adresse[ 0 ].nomVoie , <br/>, client.adresse[ 0 ].ville.nom + ' ' + client.adresse[ 0 ].ville.codePostal] } /> }
                                        { client.adresse && client.adresse.length > 1 &&
                                        ( <BoxInfos titre="Adresse de livraison" information={ [client.adresse[ 1 ].numero + ' ' + client.adresse[ 1 ].typeVoie + ' ' + client.adresse[ 1 ].nomVoie , <br/> , client.adresse[ 1 ].ville.nom + ' ' + client.adresse[ 1 ].ville.codePostal] } /> ) }
                                    </Flexbox>
                                    <BoxInfos titre="Site internet" information={ client.siteInternet ? client.siteInternet : "Aucun site internet" } link/>
                                </InfoContainer>
                            </InfoViewContainer>
                            <InfoViewContainer>
                                <h2>Potentialité</h2>
                                { client.potentialites && client.potentialites.length > 0 ?
                                    (   <table>
                                            <thead>
                                                <tr>
                                                    <th>Type de potentialité</th>
                                                    <th>Magazine</th>
                                                </tr>
                                            </thead>
                                        <tbody>
                                        { client.potentialites.map( ( potentiality, key ) => (
                                            <tr key={ potentiality.id } id={ key }>
                                                <td>{ potentiality.typePotentialite.libelle }</td>
                                                <td>{ potentiality.magazine ? potentiality.magazine.nom : "" }</td>
                                            </tr>
                                        ) ) }
                                        </tbody>
                                    </table> )
                                    : "Aucune potentialité" }
                            </InfoViewContainer></div>
                        <ContactViewContainer>
                            <h2>Contacts</h2>
                            <ContactContainer>
                                { client.contacts && client.contacts.length > 0
                                    ? client.contacts.map( ( contact ) => <BoxContact key={ contact.id } contact={ contact } /> )
                                    : "Aucun contact" }
                            </ContactContainer>
                        </ContactViewContainer>
                    </Flexbox>
                ) ||
                ( tabActive === "commandes" &&
                    <>
                        <h2>Commandes</h2>
                        { commandesByClient && commandesByClient.length > 0
                            ?  <>
                                <InfoPage numberPage={numberPageCommande.value} numberOfPages={numberOfPagesCommandes} offset={offsetCommandes} totalItems={totalItems} />
                                <TableCommandeStyle>
                                    <thead>
                                    <tr>
                                        {headTable.map((item) => <th key={ item }>{item}</th>)}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {commandesByClient.map((commande) => (
                                        <tr key={ commande.id }>
                                            <td><Link to={{pathname: `/commande/${commande.id}`}}>Type de produit</Link></td>
                                            <td><Link to={{pathname: `/commande/${commande.id}`}}>{ dateIsoFormated( commande.fin ) }</Link></td>
                                            <td><Link to={{pathname: `/commande/${commande.id}`}}>{commande.facturation}</Link></td>
                                            <td><Link to={{pathname: `/commande/${commande.id}`}}>Champ manquant</Link></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </TableCommandeStyle>
                                <Pagination numberOfPages={ numberOfPagesCommandes } numberPage={ numberPageCommande.value } setNumberPage={ setNumberPageCommande } />
                                <TotalCa>Total de CA : {totalCommandesPrice}€</TotalCa>
                            </>
                            : "Aucune commandes" }
                    </>
                ) ||
                ( tabActive === "historiques" &&
                    <Flexbox>
                        <HistoriqueViewContainer>
                            <HeaderHistoriqueView>
                                <h2>Historique de contact</h2>
                            </HeaderHistoriqueView>
                            <HistoriqueDataContainer>
                                { historiqueByClient && historiqueByClient.length > 0 && !loadingHistoriqueByClient
                                    ? historiqueByClient.map( ( historique ) => <BoxHistorique key={ historique.id } dataHistorique={ historique } setIdHistorique={setIdHistorique} setShowModalDeleteHistorique={setShowModalDeleteHistorique} /> )
                                    : <Spinner /> }
                            </HistoriqueDataContainer>
                        </HistoriqueViewContainer>
                    </Flexbox>
                ) ||
                ( tabActive === "chiffres d'affaires" &&
                    <Flexbox>
                        <div>
                            <InfoViewContainer>
                                <h2>Chiffres d'affaires</h2>
                                <ChiffreDateContainer>
                                    <label htmlFor={ "start_date" }>De</label>
                                    <input
                                        type="date"
                                        onChange={ ( e ) => setStartDate( e.target.value ) }
                                        value={ startDate }
                                        name="start_date"
                                    />
                                    <label htmlFor={ "end_date" }>à</label>
                                    <input
                                        type="date"
                                        onChange={ ( e ) => setEndDate( e.target.value ) }
                                        value={ endDate }
                                        name="end_date"
                                    />
                                    <ButtonPrimary onClick={ commandeDateValidate }>Valider</ButtonPrimary>
                                </ChiffreDateContainer>
                            </InfoViewContainer>
                            <BoxAnneeCaStyle>
                                { loadingcaCurrentYearByMonth === true
                                    ? <Spinner/>
                                    : commandeCurrentSorted.map( ( commande) =>
                                        <ItemCaMounth key={ commande[ 1 ].caMounthly }>
                                            <ResultCa>{ commande[ 1 ].caMounthly }</ResultCa>
                                            <Cercle></Cercle>
                                            <p>{ (commande[ 1 ].mounthly.slice (0,2 ) + "/" + commande[ 1 ].mounthly.slice(2,6)) }</p>
                                        </ItemCaMounth>
                                    )
                                }
                            </BoxAnneeCaStyle>
                            <>
                                <h2>Chiffre d'affaire N-1</h2>
                                <BoxAnneeCaStyle>
                                    { commandeCALeastOneLoading === true
                                        ? <Spinner/>
                                        : commandeLeastOneSorted.map( ( commande) =>
                                            <ItemCaMounth key={ commande[ 1 ].caMounthly }>
                                                <ResultCa>{ commande[ 1 ].caMounthly }</ResultCa>
                                                <Cercle></Cercle>
                                                <p>{ (commande[ 1 ].mounthly.slice (0,2 ) + "/" + commande[ 1 ].mounthly.slice(2,6)) }</p>
                                            </ItemCaMounth>
                                        )
                                    }
                                </BoxAnneeCaStyle>
                            </>
                        </div>
                    </Flexbox>
                ) }
            </MainContainer>
            { showModalRelance && <ModalCreateAction client={client} closeModal={closeModal} request={loadRelancesByClient} /> }
            { showModalHistorique && <ModalCreateHistorique closeModal={closeModal} idClient={client.id} request={loadHistoriqueByClient} historiqueClient />  }
            { showModalDeleteHistorique && <ModalDeleteHistorique request={loadHistoriqueByClient} closeModal={closeModal} historique={idHistorique} /> }
        </>
    )
}
export default Profile