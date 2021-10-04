import React from "react";
import MainContainer from "../../../templates/Container";
import DivButtonAction from "../../../utils/styles/DivButton";
import {ButtonPrimaryLink} from "../../../utils/styles/button-primary";
import TableClientsIndex from "../../../components/table/TableClientsIndex";
import ResearchClient from "../../../components/Research/ResearchClient";
import {usePaginationFetch} from "../../../components/Hook";
import {useState} from "react";
import {useEffect} from "react";
import Pagination from "../../../components/Pagination";

const Clients = () => {

    const {items: clients, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/clients');

    const [arrayClient, setArrayClient] = useState([]);
    useEffect(() => {
        setArrayClient(clients)
    }, [clients])

    const [typeClientRadio, setTypeClientRadio] = useState("");
    const [selectActivite, setSelectActivite] = useState('');
    const [selectVille, setSelectVille] = useState('');
    const [selectCodePostal, setSelectCodePostal] = useState('');

    const getStatus = (a) => {
        if(typeClientRadio === "Acquis"){
            return a.statut === true;
        } else if(typeClientRadio === "Prospect"){
            return a.statut !== true;
        } else {
            return a;
        }
    };



    /* #### input de recherche par nom de client #### */
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const nameClients = [];

    const handleChange = (e) => {
        const clientInput = e.target.value;

        arrayClient.forEach(suggestion => nameClients.push(suggestion.raisonSociale))

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
    /* #########################*/

    return(
        <MainContainer>
            <ResearchClient clientsList={arrayClient}
                            typeClientRadio={typeClientRadio}
                            onKeyDown={onKeyDown} onClick={onClick}
                            inputNameClient={handleChange}
                            showSuggestions={showSuggestions}
                            input={input}
                            filteredSuggestions={filteredSuggestions}
                            activeSuggestionIndex={activeSuggestionIndex}
                            selectActivite={selectActivite}
                            setSelectActivite={setSelectActivite}
                            selectVille={selectVille}
                            setSelectVille={setSelectVille}
                            selectCodePostal={selectCodePostal}
                            setSelectCodePostal={setSelectCodePostal}
                            setTypeClientRadio={setTypeClientRadio}
                            setArrayClient={setArrayClient}

            />
            <DivButtonAction>
                <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Clients page</h1>
            <TableClientsIndex clients={arrayClient}
                               loading={loading}
                               load={load}
                               nameClientSearch={input}
                               selectVille={selectVille}
                               selectCodePostal={selectCodePostal}
                               selectActivite={selectActivite}
                               getStatus={getStatus}
                               setArrayClient={setArrayClient}
            />
            <Pagination />
        </MainContainer>
    )
}
export default Clients;