import React from "react";
import styled from "styled-components";

const BoxAutocomplete = styled.div`
  position: relative;
`

const SuggestionList = styled.ul`
    border: 1px solid #999;
    list-style: none;
    margin-top: 0;
    max-height: 143px;
    overflow-y: auto;
    padding: 0;
    width: calc(300px + 1rem);
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 4px 39px -11px rgba(0, 0, 0, 0.17);
    
    li {
    padding: 0.5rem;
    
        &.suggestion-active, &:hover {
          background-color: #ffd4b3;
          color: #000;
          cursor: pointer;
          font-weight: 700;
        }
    }
`

const InputStyle = styled.input`
    display: block;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-right: 10px;
    padding: 10px 20px;
`

const NoSuggestionItem = styled.div`
    color: #999;
    padding: 0.5rem;
    position: absolute;
    border: 1px solid black;
    box-shadow: 0 4px 39px -11px rgba(0,0,0,0.17);
    background-color: #fff;
`

const InputAutoComplete = ({label,
                           resultFetch,
                           input,
                           setInput,
                           showSuggestions,
                           setShowSuggestions,
                           filteredSuggestions,
                           setFilteredSuggestions,
                           activeSuggestionIndex,
                           setActiveSuggestionIndex,
                           property }) => {

    const resultsPropositions = [];

    const handleChange = (e) => {
        const valueInput = e.target.value;

        resultFetch.forEach(suggestion => resultsPropositions.push(suggestion[property].toLowerCase()))
        /* on évite les doublons */
        const uniqueResultsPropositions = resultsPropositions.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })

        // Filter our suggestions that don't contain the user's input
        const unLinked = uniqueResultsPropositions.filter(
            (suggestion) =>
                suggestion.toString().toLowerCase().indexOf(valueInput.toLowerCase()) > -1
        );

        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    /* Navigation dans les proposition
    * TODO -> si on clique en dehors de la box des propositions */
    const onKeyDown = (e) => {
        e.preventDefault();
        if(e.keyCode === 40 && (activeSuggestionIndex < filteredSuggestions.length - 1) ){
            setActiveSuggestionIndex(activeSuggestionIndex+1);
            setInput(document.getElementsByClassName("suggestion-active")[0].innerText);
        } else if (e.keyCode === 38 && activeSuggestionIndex > 0){
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
            setInput(document.getElementsByClassName("suggestion-active")[0].innerText);
        } else if(e.keyCode === 13){
            setInput(document.getElementsByClassName("suggestion-active")[0].innerText);
            setShowSuggestions(false);
        }
    }

    /* Si on clique l'item de la propositions */
    const onClick = (e) => {
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <SuggestionList>
                {filteredSuggestions.map((suggestion, index) => {
                    let className;
                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    }
                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    );
                })};
            </SuggestionList>
        ) : (
            <NoSuggestionItem>
                <em>Aucune suggestion trouvée.</em>
            </NoSuggestionItem>
        );
    };

    return (
        <BoxAutocomplete>
            <label htmlFor="search-client">{label}
            <InputStyle
                name="search-client"
                type="text"
                onChange={handleChange}
                onKeyDown={onKeyDown}
                value={input}
                autoComplete="off"
            />
            </label>
            {showSuggestions && input && <SuggestionsListComponent />}
        </BoxAutocomplete>
    );
};
export default InputAutoComplete;