import React from "react";
import MainContainer from "../../../templates/Container";
import Flexbox from "../../../templates/Flexbox";
import InputGroupRadio from "../../../components/Form/radio/InputGroupRadio";
import TitreForm from "../../../templates/TitreForm";
import InputSelect from "../../../components/Form/InputSelect";

const CreateCommande = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        console.log('coucou');
    }

    return(
        <MainContainer>
            <h1>Création d'une nouvelle commande</h1>

            <form onSubmit={handleSubmit}>

            {/* CHOIX N°1 : PRINT */}

            <div class="commande_print">

            <Flexbox>

            <InputGroupRadio selected={"false"} name="type_commande" data={[{"id": "id1", "label": "Nouvelle commande", "value": "false"}, {"id": "id2", "label": "Renouvellement", "value": "true"}]}/>

            </Flexbox>

            <Flexbox direction="column">

            <TitreForm titre="Type de produit" />

            <InputGroupRadio selected={"false"} name="type_produit" data={[{"id": "id1", "label": "Support de communication", "value": "false"}, {"id": "id2", "label": "Régie", "value": "true"}]}/>

            </Flexbox>

            <Flexbox direction="column">

            <TitreForm titre="Type de support" />

            <InputGroupRadio name="type_support" data={[{"id": "id1", "label": "Produit imprimé", "value": "print "}, {"id": "id2", "label": "Web", "value": "web"}, {"id": "id3", "label": "Magazine", "value": "magazine"}, {"id": "id4", "label": "Contenu", "value": "contenu"}, {"id": "id5", "label": "Community Management", "value": "cm"}]}/>

            </Flexbox>

            <Flexbox direction="column">

            <TitreForm titre="Choix du client" />

            

            

            </Flexbox>

            </div>


            </form>
            
        </MainContainer>
    )
}
export default CreateCommande;