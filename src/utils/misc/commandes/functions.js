export const getType = ( commande ) => {

    if( commande.supportWeb ){
        return "Site Internet"
    } else if( commande.supportPrint ){
        return "Print"
    } else if( commande.encart ){
        return "Régie"
    } else if( commande.supportMagazine ){
        return "Edition"
    } else if( commande.contenu ){
        return "Contenu"
    } else if( commande.communityManagement ){
        return "Community Management"
    }
}