import React from "react";
import MainContainer from "../../templates/Container";
import DivButtonAction from "../../utils/styles/DivButton";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import TableClientsIndex from "../../components/table/TableClientsIndex";
import ResearchClient from "../../components/Research/ResearchClient";
import {useState, useEffect} from "react";
import Pagination from "../../components/Pagination";
import {useFetchGet} from "../../utils/misc/useFetchGet";



const Clients = () => {

    const {items, loading, load} = useFetchGet('http://localhost:8000/api/clients');
    useEffect(() => {
        load()
    }, [load])

    const [resultFetch, setResultFetch] = useState([]);
    useEffect(() => {
        setResultFetch(items)
    }, [items])



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


    /* #########################*/

    return(
        <>
        <MainContainer>
            <ResearchClient resultFetch={resultFetch}
                            setResultFetch={setResultFetch}
                            typeClientRadio={typeClientRadio}
                            showSuggestions={showSuggestions}
                            setShowSuggestions={setShowSuggestions}
                            input={input}
                            setInput={setInput}
                            filteredSuggestions={filteredSuggestions}
                            setFilteredSuggestions={setFilteredSuggestions}
                            activeSuggestionIndex={activeSuggestionIndex}
                            setActiveSuggestionIndex={setActiveSuggestionIndex}
                            selectActivite={selectActivite}
                            setSelectActivite={setSelectActivite}
                            selectVille={selectVille}
                            setSelectVille={setSelectVille}
                            selectCodePostal={selectCodePostal}
                            setSelectCodePostal={setSelectCodePostal}
                            setTypeClientRadio={setTypeClientRadio}
                            property={"raisonSociale"}

            />
            <DivButtonAction>
                <ButtonPrimaryLink to="/creation_client">Créer un client</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Clients page</h1>
            <TableClientsIndex clients={resultFetch}
                               loading={loading}
                               nameClientSearch={input}
                               selectVille={selectVille}
                               selectCodePostal={selectCodePostal}
                               selectActivite={selectActivite}
                               getStatus={getStatus}
                               setArrayClient={setResultFetch}
            />
            <Pagination />
        </MainContainer>
        </>
    )
}
export default Clients;