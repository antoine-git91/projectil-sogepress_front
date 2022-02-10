import React, {useContext, useEffect, useState} from "react";
import ModalHeader from "../../../components/Modal/parts/ModalHeader";
import ModalBody from "../../../components/Modal/parts/ModalBody";
import InputGroupRadio from "../../../components/Form/radio/InputGroupRadio";
import InputText from "../../../components/Form/InputText";
import InputSelect from "../../../components/Form/InputSelect";
import InputTextArea from "../../../components/Form/InputTextArea";
import {ButtonPrimary} from "../../../utils/styles/button";
import {useFetchGet} from "../../../utils/misc/fetch/useFetchGet";
import {useFetchPost} from "../../../utils/misc/fetch/useFetchPost";
import {AddressServer, UserContext} from "../../App";
import Spinner from "../../../components/Spinner";
import Flexbox from "../../../templates/Flexbox";
import Modal from "../../../components/Modal/Modal";
import ModalResponse from "../../../components/Modal/ModalResponse";

const ModalCreateAction = ({client, commande, closeModal, request, actionFor}) => {

    const meUser = useContext(UserContext)

    const [ subject, setSubject ] = useState("");
    const [ commentaire, setCommentaire ] = useState("");
    const [ deadline, setDeadline ] = useState("");
    const [ clientSelected, setClientSelected ] = useState({value: "", id: ""});
    const [ commandeSelected, setCommandeSelected ] = useState({value: "", id: ""});
    const [ relanceType, setRelanceType ] = useState({value: "in_progress", id: 1});
    const [ commandesClientDisabled, setCommandesClientDisabled ] = useState(true );

    const { items: clients, load: loadClients, loading: loadingClients} = useFetchGet(useContext(AddressServer) +"/api/clients");
    const { items: commandes, load: loadCommandes, loading: loadingCommandes} = useFetchGet(useContext(AddressServer) +"/api/getCommandesByClient/" + (client ? client.id : clientSelected.value));

    const { success, error, loading, post, responseStatut } = useFetchPost(
        useContext(AddressServer) + "/api/relances",
        {
            "typeRelance": true,
            "objet": subject,
            "contenu": commentaire,
            "dateEcheance": deadline,
            "status": "/api/relance_statuses/1",
            "client": "/api/clients/" + clientSelected.value,
            "commande": "/api/commandes/" + commandeSelected.value,
            "user": "/api/users/" + meUser.id
        }
    );

    useEffect( () => {
        (!client || !commande) && loadClients();
    }, [ loadClients ] );

    useEffect( () => {
        if(actionFor === "client"){
            setClientSelected({value: client.id, id: 0})
        }
        if(actionFor === "commande"){
            setClientSelected({value: client.id, id: 0})
            setCommandeSelected({value: commande.id, id: 0})
        }
        if( clientSelected.value !== "" || client ){
            setCommandesClientDisabled(false );
            loadCommandes();
        }
    }, [ clientSelected.value, loadCommandes, client ] );


    const getTypeCommande = ( commande ) => {

        let typeCommande;

        Object.keys(commande).forEach( el => {
            if(el === "supportPrint" && commande.supportPrint !== null ){
                typeCommande = "Print / " + commande.supportPrint.typePrint.libelle + " / " + commande.title;
            } else if(el === "supportWeb" && commande.supportWeb !== null ){
                typeCommande = "Web" + commande.supportWeb.typePrestation.libelle + " / " + commande.title;
            } else if(el === "supportMagazine" && commande.supportMagazine !== null ){
                typeCommande = "Edition / " + commande.supportMagazine.magazine.nom + " / " + commande.supportMagazine.nom;
            } else if(el === "contenu" && commande.contenu !== null ){
                typeCommande = "Contenu / " + commande.contenu.typeContenu.libelle + " / " + commande.title;
            } else if(el === "communityManagement" && commande.communityManagement !== null ){
                typeCommande = "Community Management" + " / " + commande.title;
            } else if(el === "encart" && commande.encart !== null ){
                typeCommande = "Régie / " + commande.encart.supportMagazine.magazine.nom + " / " + commande.encart.supportMagazine.nom;
            }
        })
        return typeCommande;
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
        post();
    };

    return(
      <>
          <Modal closeModal={closeModal} justify={"center"} align={"center"}>
              <ModalHeader>
                  <h1>Création d'une nouvelle relance</h1>
              </ModalHeader>
              <ModalBody justify={"center"} align={"center"}>
                  { !loading && !success.id && (
                      <form onSubmit={ ( e ) => { handleSubmit( e ) } }>
                          <Flexbox>
                              <InputGroupRadio
                                  label={ "Type de relance" }
                                  name={ "relance_type" }
                                  data={ [ { id: 1, label: "Projet en cours", value: "in_progress" }, { id: 2, label: "Prospection", value: "prospection" } ] }
                                  selected={ relanceType }
                                  setRadioChecked={ setRelanceType }
                                  required
                              />
                              <InputText
                                  label={ "Objet de la relance" }
                                  name={ "relance_subject" }
                                  placeholder={ "Saisir l'objet de la relance" }
                                  onChange={ ( e ) => setSubject( e.target.value ) }
                                  value={ subject }
                                  required
                              />
                          </Flexbox>
                          <Flexbox>
                              { !actionFor && (
                                  <InputSelect
                                      label={ "Choix du client" }
                                      name={ "client" }
                                      data={ clients && clients.map( ( el, key) => ( { id : key + el.id, value : el.id, valueDisplay: el.raisonSociale } ) ) }
                                      selectValue={ clientSelected }
                                      setSelectValue={ setClientSelected }
                                      option={ client ? client.raisonSociale : "Client" }
                                      optionValue={ client ? client.id : "" }
                                      required
                                  />
                              )}
                              { ( actionFor === "client" || !actionFor ) && (
                                  <InputSelect
                                      label={ "Choix de la commande" }
                                      name={ "commande" }
                                      data={ commandes && commandes.map( ( el, key) => ( { id : key, value : el.id, valueDisplay: getTypeCommande(el)} ) ) }
                                      selectValue={ commandeSelected }
                                      setSelectValue={ setCommandeSelected }
                                      option={ "Commande" }
                                      optionValue={ "" }
                                      disabled={commandesClientDisabled}
                                  />
                              )}
                              <InputText
                                  label={ "Date d'échéance" }
                                  name={ "relance_deadline" }
                                  type={"date"}
                                  onChange={ ( e ) => setDeadline( e.target.value ) }
                                  value={ deadline }
                                  required
                              />
                          </Flexbox>
                          <InputTextArea
                              label={ "Information de la relance" }
                              name={ "comentaire" }
                              placeholder={ "Saisir le commentaire" }
                              onChange={ ( e ) => setCommentaire( e.target.value ) }
                              commentaireCols={ 1 }
                              commentaireRows={ 10 }
                          />
                          <ButtonPrimary type={ "submit" }>Créer la relance</ButtonPrimary>
                      </form>
                  )}
                  { loading && <Spinner/> }
              </ModalBody>
              { success.id && <ModalResponse type={"relance"} response={responseStatut} closeModal={closeModal} idType={success.id}/>}
          </Modal>
      </>
) }
export default ModalCreateAction;