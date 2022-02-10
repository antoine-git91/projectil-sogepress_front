/* On insert les données pour chaque contactBlock */
export const insertDataFromChild = (arrayContact, setArrayContact, newContact, index ) => {
    arrayContact[ index ].nom = newContact.nom;
    arrayContact[ index ].prenom = newContact.prenom;
    arrayContact[ index ].fonction = newContact.fonction;
    arrayContact[ index ].tel = newContact.tel;
    arrayContact[ index ].email = newContact.email;
    setArrayContact( arrayContact );
};

/* On Créé un contactBlock à chaque clique de buttonAjout */
export const addContact = ( e, arrayContact, setArrayContact, setDisabledSelectContact ) => {
    e.preventDefault();
    setArrayContact(
        arrayContact.concat( { "nom": "","prenom": "", "fonction": "", "tel": "", "email": "" } )
    );
    setDisabledSelectContact(true );
};

/* On supprime un contactBlock à chaque clique de buttonRemove */
export const removeContact = ( index, setArrayContact, arrayContact ) => {
    setArrayContact([ ...arrayContact.slice( 0, index ), ...arrayContact.slice( index + 1 ) ] );
};