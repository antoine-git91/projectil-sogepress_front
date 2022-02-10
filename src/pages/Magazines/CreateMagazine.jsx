import React, {useContext, useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import InputText from "../../components/Form/InputText";
import InputSelect from "../../components/Form/InputSelect";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import {ButtonPrimary} from "../../utils/styles/button";
import {useFetchPost} from "../../utils/misc/fetch/useFetchPost";
import {AddressServer} from "../App";

const CreateMagazine = () => {

    const [ clientSelected, setClientSelected ] = useState({  } );
    const [ magazineName, setMagazineName ] = useState("" );

    const {items: clients, load: loadClients, loading: loadingClient} = useFetchGet(useContext(AddressServer) + "/api/clients");
    const { success, error, loading, post: postMagazines } = useFetchPost(
        useContext(AddressServer) + "/api/magazines",
        {
            "nom": magazineName,
            "client": "/api/clients/" + clientSelected.value
        } );

    useEffect( () => {
        loadClients()
    }, [ loadClients ] );

    const createMagazine = (e) => {
        e.preventDefault();
        postMagazines();
    };

    return(
        <MainContainer>
            <h1>Création de magazine</h1>
            <form onSubmit={ ( e ) => { createMagazine( e ) } } >
                <InputSelect
                    label={ "Nom du client" }
                    name={ "client_name" }
                    selectValue={ clientSelected }
                    setSelectValue={ setClientSelected }
                    required
                    optionValue={ "" }
                    option={ "Choisir un client" }
                    data={ clients && clients.map( ( client, key ) => ( { id: key, value: client.id, valueDisplay: client.raisonSociale } ) ) } />
                <InputText
                    label={ "Nom du magazine" }
                    name={ "client_magazine" }
                    onChange={ ( e ) => { setMagazineName( e.target.value ) } }
                    value={ magazineName }
                    placeholder={ "Saisir le nom du magazine" }
                    required
                />
                <ButtonPrimary type={"submit"}>Créer le magazine</ButtonPrimary>
            </form>
        </MainContainer>
    )
}
export default CreateMagazine;