// Fonction pour mettre en clair le mdp
export const toggleTypeInput = ( e, setTypeInputPass, typeInputPass ) => {
    e.preventDefault();
    setTypeInputPass(!typeInputPass)
}