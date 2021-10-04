import React from 'react'
import InputGroupRadio from "../Form/radio/InputGroupRadio";
import Flexbox from "../../templates/Flexbox";
import styled from "styled-components";
import InputSelect from "../Form/InputSelect";
import InputAutoComplete from "../Form/InputAutocomplete";

const SearchBox = styled.div`
      margin-top: 20px;
      margin-bottom: 20px;
    `

const ResearchClient = ({clientsList, onChangeStatus, typeClientSelect, inputNameClient, input, onClick, onKeyDown, showSuggestions, activeSuggestionIndex, filteredSuggestions}) => {

    const villeClients = []
    const villes = clientsList.map(client => client.adresses.map(adresse => adresse.ville.nom))
    villes.map( arrayVille => arrayVille.map( ville => villeClients.push(ville)))

    const unique = villeClients.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })

    return (
        <SearchBox>
            <Flexbox>
                <InputAutoComplete label={"Recherche par client"} onChange={inputNameClient} typeClientSelect={typeClientSelect} onKeyDown={onKeyDown} onClick={onClick} inputNameClient={inputNameClient} showSuggestions={showSuggestions} input={input} activeSuggestionIndex={activeSuggestionIndex} filteredSuggestions={filteredSuggestions} />
                <InputSelect label={"Activité"} data={[{"id" : "id1", "value" : "Site internet"}, {"id" : "id2", "value" : "Brochure"}, {"id" : "id3", "value" : "Flyer"} ]} />
                <InputSelect label={"Ville"} data={unique.map( (el, key) => ({id : key, value : el}))} />
            </Flexbox>
            <Flexbox>
                <InputGroupRadio label={"Status du client"} onchange={onChangeStatus} selected={typeClientSelect} name="isHasAddressDelivery" data={[{"id": "id1", "label": "Acquis", "value": "true"}, {"id": "id2", "label": "Prospect", "value": "false"}, {"id": "id3", "label": "Les deux", "value": null}]}/>
            </Flexbox>
        </SearchBox>
    )
}
export default ResearchClient;

