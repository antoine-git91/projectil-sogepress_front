
export const dateIsoFormated = ( dateISO ) => {
   return  new Date( dateISO ).toLocaleString( 'fr-FR', { day: "2-digit", month: "2-digit", year: "numeric" } )
}

export const setSelectDataRequest = ( { tagWanted, data, itemWanted, setSelectState, valueChosen, valueDisplayChosen} ) => {
   const selectName = document.querySelector('select[ name=' + tagWanted + ']' );
   let object = data.find( el => el.id === itemWanted );
   let i = data.findIndex( el => el.id === itemWanted );
   selectName.selectedIndex = i + 1;
   object && setSelectState( { value: object[valueChosen], valueDisplay: object[valueDisplayChosen] } )
}

