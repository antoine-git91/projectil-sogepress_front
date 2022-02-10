export const addPotentiality = (
    e,
    selectPotentialityType,
    setDataPotentiality,
    dataPotentiality,
    selectMagazine,
    setPotentialityPost,
    potentialitePost
    ) => {
    e.preventDefault();
    if( selectPotentialityType.value !== "" ){
        setDataPotentiality(
            dataPotentiality.concat(
                {
                    "type": {
                        "value": selectPotentialityType.value, "valueDisplay" : selectPotentialityType.valueDisplay
                    },
                    "magazine": {
                        "value": selectMagazine.value, "valueDisplay" : selectMagazine.valueDisplay
                    }
                }
            )
        )
        setPotentialityPost( potentialitePost.concat(
            {
                "magazine": selectMagazine.value !== "" ? "/api/magazines/" + selectMagazine.value : null ,
                "typePotentialite": "/api/type_potentialites/" + selectPotentialityType.value
            }
        ) )
    }
};

export const removePotentiality = ( e, index, setDataPotentiality, dataPotentiality) => {
    e.preventDefault();
    setDataPotentiality([ ...dataPotentiality.slice( 0, index ), ...dataPotentiality.slice( index + 1 ) ] );
}