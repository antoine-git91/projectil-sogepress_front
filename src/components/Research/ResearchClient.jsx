import React, {useEffect} from 'react'
import InputGroupRadio from "../Form/radio/InputGroupRadio";
import Flexbox from "../../templates/Flexbox";
import styled from "styled-components";
import InputSelect from "../Form/InputSelect";
import InputAutoComplete from "../Form/InputAutocomplete";
import {useState} from "react";

const SearchBox = styled.div`
      margin-top: 20px;
      margin-bottom: 20px;
    `

const ResearchClient = ({clientsList,
                        typeClientRadio,
                        inputNameClient,
                        input,
                        setArrayClient,
                        onClick,
                        onKeyDown,
                        showSuggestions,
                        activeSuggestionIndex,
                        filteredSuggestions,
                        selectVille,
                        setSelectVille,
                        selectActivite,
                        setSelectActivite,
                        selectCodePostal,
                        setSelectCodePostal,
                        setTypeClientRadio,
                        }) => {

    const [villeClients, setVilleClients] = useState([]);
    const villes = clientsList.map(client => client.adresses.map(adresse => adresse.ville.nom));
    villes.map( arrayVille => arrayVille.map( ville => villeClients.push(ville)));
    /* on évite les doublon */
    const uniqueVillesClients = villeClients.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })

    const [codePostal, setCodePostal] = useState([]);
    const cp = clientsList.map(client => client.adresses.map(adresse => adresse.ville.codePostal));
    cp.map( arrayVille => arrayVille.map( ville => codePostal.push(ville)));
    /* on évite les doublon */
    const uniqueCodePostal = codePostal.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })

    const [activites, setActivites] = useState([]);
    clientsList.map( client => activites.push(client.nafSousClasse.libelle));
    /* on évite les doublon */
    const uniqueActivites = activites.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })

    return (
        <SearchBox>
            <Flexbox>
                <InputAutoComplete label={"Recherche par client"} onChange={inputNameClient} onKeyDown={onKeyDown} onClick={onClick} inputNameClient={inputNameClient} showSuggestions={showSuggestions} input={input} activeSuggestionIndex={activeSuggestionIndex} filteredSuggestions={filteredSuggestions} />
                <InputSelect label={"Activités"} data={uniqueActivites.map( (el, key) => ({id : key, value : el}))} option={"Filter par activité"} optionValue={""} selectValue={selectActivite} setSelectValue={setSelectActivite} />
                <InputSelect label={"Ville"} data={uniqueVillesClients.map( (el, key) => ({id : key, value : el}))} option={"Filter par ville"} optionValue={""} seleValue={selectVille} setSelectValue={setSelectVille} />
                <InputSelect label={"Code postal"} data={uniqueCodePostal.map( (el, key) => ({id : key, value : el}))} option={"Filter par code postal"} optionValue={""} seleValue={selectCodePostal} setSelectValue={setSelectCodePostal} />
            </Flexbox>
            <Flexbox>
                <InputGroupRadio label={"Status du client"} setTypeClientRadio={setTypeClientRadio}  selected={typeClientRadio} name="isHasAddressDelivery" data={[{"id": "id1", "label": "Acquis", "value": "Acquis"}, {"id": "id2", "label": "Prospect", "value": "Prospect"}, {"id": "id3", "label": "Les deux", "value": ""}]}/>
            </Flexbox>
        </SearchBox>
    )
}
export default ResearchClient;

