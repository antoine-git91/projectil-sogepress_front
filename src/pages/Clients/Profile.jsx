import React, {useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {useParams} from "react-router-dom";
import {ButtonPrimary, ButtonPrimaryLink} from "../../utils/styles/button";
import RelanceContainer from "../../components/RelanceBox";
import BtnAjout from "../../components/btn_ajout";
import BoxInfos from "../../components/Single/BoxInfos";
import BoxContact from "../../components/Single/BoxContact";
import BoxHistorique from "../../components/Single/BoxHistorique";
import {ContactViewContainer, BoxTitle, InfoViewContainer, InfoContainer,ContactContainer,HistoriqueViewContainer, HistoriqueDataContainer,HeaderHistoriqueView} from "../../utils/styles/single";
import styled from "styled-components";
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
  active && `
    color:#FF6700;
    border-bottom: 3px solid #FF6700;
    opacity: 1;
  `}
`

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


const Profile = () => {

    const {idClient} = useParams();
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

    const [ commandeSorted, setCommandeSorted ] = useState([] );
    const [ numberOfMounths,setNumberOfMounths ] = useState(0 );
    const [ CAObject, setCAObject ] = useState({} );

    const { items, load, loading } = useFetchGet(`https://127.0.0.1:8000/api/clients/${ idClient }`);
    // Requête des commandes par date : onglet Chiffre d'affaire
    const { items: commandeCA, load: commandeCALoad, loading: commandeCALoading } = useFetchGet(`https://localhost:8000/api/commandes?page=1&debut%5Bafter%5D=${ startDate.length === 0 ? new Date().getFullYear() + "-01-01" : startDate }&fin%5Bbefore%5D=${ endDate.length === 0 ? new Date().getFullYear() + "-12-01" : endDate }&client=${ idClient }`);

    useEffect(() => {
        load()
    }, [ load ]);


    const mounthSorted = (a,b) => {
        return a[ 0 ] - b[ 0 ]
    };


    // On initialise l'objet CAObject avec tous les mois et les valeurs de chaque mois
    useEffect(() => {

        if(commandeCALoading === true){
            // PARTIE 1 - On calcule le nombre de mois entre les deux dates selectionnées
            // - Si même année
            if( ( endMouthSelected - startMouthSelected >= 0 ) && ( endYearSelected - startYearSelected === 0 ) ){
                setNumberOfMounths(( endMouthSelected - startMouthSelected ) + 1 );
            }
            // - Si année différente
            else if(endYearSelected - startYearSelected > 0){
                let differenceYear = endYearSelected - startYearSelected;
                setNumberOfMounths( ( endMouthSelected + ( 12 * differenceYear ) ) - ( startMouthSelected - 1  ) );
            }

            // PARTIE 2 - On initialise l'objet CAObject en fonction des dates choisies
            if( numberOfMounths > 0 ){
                /*
                * On démarre du mois choisi et on additionne la différence du nombre de mois
                * */
                for( let i = startMouthSelected ; i < numberOfMounths + startMouthSelected ; i++ ){
                    // Si le range de date est dans la même année
                    if ( i <= 12 ){
                        // Si le mois est inf. à 10 on ajoute un zero ex septembre = 9 > 09
                        if( i < 10 ){
                            setCAObject(CAObject[ startYearSelected + "0" + i ] = { "caMounthly": 0, "mounthly": "0" + i.toString() + ( startYearSelected ).toString() });
                        }
                        else {
                            setCAObject(CAObject[ startYearSelected + "" + i ] = { "caMounthly": 0, "mounthly": i.toString() + ( startYearSelected ).toString() });
                        }
                    }
                    // Si les années sont différentes
                    else {
                        let newYearMounths = Math.floor( i/12 );
                        let resetMounthNewYear = i - ( 12 * newYearMounths );

                        // Si resetMounthYear === 0 > c'est le 12eme mois de l'année
                        if( resetMounthNewYear === 0 ){
                            setCAObject(CAObject[ ( startYearSelected +  newYearMounths - 1 ) + "12" ] = { "caMounthly": 0, "mounthly": "12" + ( startYearSelected + newYearMounths - 1 ).toString() });
                        }
                        // Si le mois est inf. à 10 on ajoute un zero ex septembre = 9 > 09
                        else if( resetMounthNewYear < 10 ){
                            setCAObject(CAObject[ (startYearSelected + newYearMounths ) + "0" + resetMounthNewYear ] = { "caMounthly": 0, "mounthly": "0" + resetMounthNewYear.toString() + ( startYearSelected + newYearMounths ).toString() });
                        }
                        else {
                            setCAObject(CAObject[ ( startYearSelected +  newYearMounths ) + "" + resetMounthNewYear ] = { "caMounthly": 0, "mounthly": resetMounthNewYear.toString() + ( startYearSelected + newYearMounths ).toString() });
                        }
                    }
                }
            }

            // PARTIE 3 - On met à jour les chiffres d'affaire en fonction des mois
            commandeCA.forEach( el => {

                let yearMounthStartCommande = el.debut.slice( 0,7 ).replace("-", "");

                if( CAObject.hasOwnProperty( yearMounthStartCommande ) ) {
                    // trouve l'index correspondant et ajoute le prix au CA
                    CAObject[ yearMounthStartCommande ].caMounthly += el.facturation;
                }
            });

            // PARTIE 4 - On convertit l'objet en tableau en triant les dates
            setCommandeSorted( Object.entries( CAObject ).sort( mounthSorted ) );

            /* PARTIE 5 - On reset l'objet CAObject du au problème où à la fin de l'affichage, l'objet devenait
            * {caMounthly: 0, mounth : endMouthSelected}
            **/
            setCAObject({} )
        }

    }, [ commandeCA, commandeCALoading ] );

    console.log(startDaySelected)
    const commandeDateValidate = ( e ) => {
        e.preventDefault();

        // On checke si la date départ n'est pas inférieur à la date de fin
        if( endDaySelected - startDaySelected < 0 && endMouthSelected - startMouthSelected >= 0 ){
            alert("jour impossible");
            return;
        } else {
            if(endMouthSelected - startMouthSelected < 0 && endYearSelected - startYearSelected >= 0){
                alert("mois impossible");
                return;
            } else {
                if(endYearSelected - startYearSelected < 0){
                    alert("année impossible");
                    return;
                } else {
                    commandeCALoad();
                }
            }
        }
    }


    if( loading ) {
        return <Spinner />
    }

    return (
        <>
            <MainContainer>
                <DivButtonAction>
                    <ButtonPrimaryLink to={ { pathname: `/update_client/${ idClient }` } }>Modifier le client</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_commande">Nouvelle commande</ButtonPrimaryLink>
                    <ButtonPrimaryLink to="/creation_client">Nouvelle relance</ButtonPrimaryLink>
                </DivButtonAction>
                <RelanceContainer />
                <BoxTitle>
                    <h1>{ items.raisonSociale } / { items.nafSousClasse ? items.nafSousClasse.libelle : "loading" }</h1>
                </BoxTitle>
                <div>
                    { tabs.map( tab => (
                        <BtnTabs
                            key={ tab }
                            active={ tabActive === tab }
                            onClick={(e) => {
                                e.preventDefault()
                                setTabActive( tab )
                            }}
                        >{ tab }</BtnTabs>
                    ) ) }
                </div>
                { ( tabActive === "contacts" &&
                    <Flexbox>
                        <InfoViewContainer>
                            <h2>Coordonnées</h2>
                            <InfoContainer>
                                <BoxInfos titre="Téléphone" information="" />
                                <BoxInfos titre="Email" information={ items.email } />
                                { items.adresse &&
                                <BoxInfos titre="Adresse" information={ items.adresse[ 0 ].numero + ' ' + items.adresse[ 0 ].typeVoie + ' ' + items.adresse[ 0 ].nomVoie + ' ' + items.adresse[ 0 ].ville.nom + ' ' + items.adresse[ 0 ].ville.codePostal } /> }
                                { items.adresse && items.adresse.length > 1 &&
                                ( <BoxInfos titre="Adresse de livraison" information={ items.adresse[ 1 ].numero + ' ' + items.adresse[ 1 ].typeVoie + ' ' + items.adresse[ 1 ].nomVoie + ' ' + items.adresse[ 1 ].ville.nom + ' ' + items.adresse[ 1 ].ville.codePostal } /> ) }
                                <BoxInfos titre="Site internet" information={ items.siteInternet ? items.siteInternet : "Aucun site internet" } />
                            </InfoContainer>
                            <h2>Potentialité</h2>
                            { items.potentialites && items.potentialites.length > 0 ?
                                ( <table>
                                    <thead>
                                    <tr>
                                        <th>Type de potentialité</th>
                                        <th>Magazine</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { items.potentialites.map( ( potentiality, key ) => (
                                        <tr key={ key + potentiality.id } id={ key }>
                                            <td>{ potentiality.typePotentialite.libelle }</td>
                                            <td>{ potentiality.magazine ? potentiality.magazine.nom : "" }</td>
                                        </tr>
                                    ) ) }
                                    </tbody>
                                </table> )
                            : "Aucune potentialité" }
                        </InfoViewContainer>
                        <ContactViewContainer>
                            <h2>Contacts</h2>
                            <ContactContainer>
                                { items.contacts && items.contacts.length > 0
                                    ? items.contacts.map( ( contact,key ) => <BoxContact key={ key } contact={ contact } /> )
                                    : "Aucun contact" }
                            </ContactContainer>
                        </ContactViewContainer>
                    </Flexbox>
                ) ||
                ( tabActive === "commandes" &&
                    <>
                        <h2>Commandes</h2>
                        <TableCommandeSingle commandes={ items.commandes } />
                    </>
                ) ||
                ( tabActive === "historiques" &&
                    <Flexbox>
                        <HistoriqueViewContainer>
                            <HeaderHistoriqueView>
                                <h2>Historique de contact</h2>
                                <BtnAjout text="Créer un historique"/>
                            </HeaderHistoriqueView>
                            <HistoriqueDataContainer>
                                { items.historiqueClients && items.historiqueClients.length > 0
                                    ? items.historiqueClients.map( ( historique, key ) => <BoxHistorique key={ key } dataHistorique={ historique } /> )
                                    : "Loading..." }
                            </HistoriqueDataContainer>
                        </HistoriqueViewContainer>
                    </Flexbox>
                ) ||
                ( tabActive === "chiffres d'affaires" &&
                    <Flexbox>
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
                                <BoxAnneeCaStyle>
                                    { commandeCALoading === true
                                        ? <Spinner/>
                                        : commandeSorted.map( ( commande, index) =>
                                            <ItemCaMounth key={ index }>
                                            <ResultCa>{ commande[ 1 ].caMounthly }</ResultCa>
                                            <Cercle></Cercle>
                                            <p>{ (commande[ 1 ].mounthly.slice (0,2 ) + "/" + commande[ 1 ].mounthly.slice(2,6)) }</p>
                                            </ItemCaMounth>
                                        )
                                    }
                                </BoxAnneeCaStyle>
                        </InfoViewContainer>
                    </Flexbox>
                ) }
            </MainContainer>
        </>
    )
}
export default Profile