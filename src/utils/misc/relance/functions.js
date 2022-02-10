export const getStatusRelance = ( relanceStatus ) => {
    let statut;
    relanceStatus === "validé" ? statut = "validated" : statut = "current";
    return statut;
}

export const whichPriority = (dateIso ) => {

    const today = Date.now();
    const date = new Date(dateIso);
    const dateDiff = Math.floor(((date-today) / 1000) / 3600 / 24);
    let priority;

    if( dateDiff > 30 ){
        priority = "faible";
    } else if(dateDiff < 30 && dateDiff > 15){
        priority = "moyenne";
    } else if(dateDiff < 15 && dateDiff > 0){
        priority = "urgente";
    } else {
        priority = "retard"
    }
    return priority
}