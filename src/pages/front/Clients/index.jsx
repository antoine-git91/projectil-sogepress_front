import React from "react";
import MainContainer from "../../../templates/Container";
import DivButtonAction from "../../../utils/styles/DivButton";
import {ButtonPrimaryLink} from "../../../utils/styles/button-primary";
import TableClientsIndex from "../../../components/table/TableClientsIndex";
import ResearchClient from "../../../components/Research/ResearchClient";
import {usePaginationFetch} from "../../../components/Hook";
import {useState} from "react";
import {useEffect} from "react";

const Clients = () => {

    const {items: clients, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/clients');

    const [arrayClient, setArrayClient] = useState([]);

    useEffect(() => {
        setArrayClient(clients)
    }, [clients])

    const [typeClientSelect, setTypeClientSelect] = useState(null);
    const getValueType = (e) => {
        setTypeClientSelect(e.target.value)
    };

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const nameClients = [];
    const handleChange = (e) => {
        const clientInput = e.target.value;

        arrayClient.forEach(suggestion => nameClients.push(suggestion.raison_sociale))

        // Filter our suggestions that don't contain the user's input
        const unLinked = nameClients.filter(
            (suggestion) =>
                suggestion.toString().toLowerCase().indexOf(clientInput.toLowerCase()) > -1
        );

        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onClick = (e) => {
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const onKeyDown = (e) => {
        if(e.keyCode === 40 && (activeSuggestionIndex < filteredSuggestions.length - 1) ){
            setActiveSuggestionIndex(activeSuggestionIndex+1)
            setInput(document.getElementsByClassName("suggestion-active")[0].innerText)
        } else if (e.keyCode === 38 && activeSuggestionIndex > 0){
            setActiveSuggestionIndex(activeSuggestionIndex - 1)
            setInput(document.getElementsByClassName("suggestion-active")[0].innerText)
        } else if(e.keyCode === 13){
            setInput(document.getElementsByClassName("suggestion-active")[0].innerText)
            setShowSuggestions(false);
        }
    }

    useEffect(() => {
        setArrayClient(a =>a.filter(client => client.statut == typeClientSelect))
    }, [typeClientSelect]);


    return(
        <MainContainer>
            <ResearchClient clientsList={arrayClient} onChangeStatus={getValueType} typeClientSelect={typeClientSelect} onKeyDown={onKeyDown} onClick={onClick} inputNameClient={handleChange} showSuggestions={showSuggestions} input={input} filteredSuggestions={filteredSuggestions} activeSuggestionIndex={activeSuggestionIndex} />
            <DivButtonAction>
                <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Clients page</h1>
            <TableClientsIndex clients={arrayClient} loading={loading} load={load} nameClientSearch={input} statusClient={typeClientSelect} />
        </MainContainer>
    )
}
export default Clients;