import React, {useState} from "react";
import MainContainer from "../../templates/Container";
import InputGroupRadio from "../../components/Form/radio/InputGroupRadio";
import TitreForm from "../../templates/TitreForm";
import InputSelect from "../../components/Form/InputSelect";
import InputText from "../../components/Form/InputText";
import InputTextArea from "../../components/Form/InputTextArea";
import {ButtonPrimary} from "../../utils/styles/button";

const CreateCommande = () => {

    const [supportType, setSupportType] = useState("print");
    const getValueFormat = (e) => {
        setSupportType(e.target.value);
    }

    const [siteContrat, setSiteContrat] = useState();
    const getValueSiteContrat = (e) => {
        setSiteContrat(e.target.value);
    }

    const [typeProduit, setTypeProduit] = useState("communication");
    const getValueTypeProduit = (e) => {
        setTypeProduit(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        console.log('coucou');
    }


    return(
        <>
            <MainContainer>
                <h1>Création d'une nouvelle commande</h1>

                <form onSubmit={handleSubmit}>

                {/* CHOIX N°1 : PRINT */}

                    <div className="commande_print">
                        <TitreForm titre="Type de commande" />
                        <InputGroupRadio selected={"false"} name="type_commande" data={[{"id": "id1", "label": "Nouvelle commande", "value": "false"}, {"id": "id2", "label": "Renouvellement", "value": "true"}]}/>

                        <TitreForm titre="Type de produit" />
                        <InputGroupRadio onchange={getValueTypeProduit} selected={typeProduit} name="type_produit" data={[{"id": "id1", "label": "Support de communication", "value": "communication"}, {"id": "id2", "label": "Régie", "value": "regie"}]}/>

                        { typeProduit === "communication" ?
                            <div>
                                <TitreForm titre="Client" />
                                <InputSelect label="Choix du client" data={[{"id" : "id1", "value" : "Site internet"}, {"id" : "id2", "value" : "Brochure"}, {"id" : "id3", "value" : "Flyer"} ]} />
                                <InputSelect label="Choix du contact" data={[{"id" : "id1", "value" : "Site internet"}, {"id" : "id2", "value" : "Brochure"}, {"id" : "id3", "value" : "Flyer"} ]} />


                                <TitreForm titre="Support" />
                                <InputGroupRadio label="Type de support" name="type_support" onchange={getValueFormat} selected={supportType} data={[{"id": "id1", "label": "Produit imprimé", "value": "print"}, {"id": "id2", "label": "Web", "value": "web"}, {"id": "id3", "label": "Contenu", "value": "contenu"}, {"id": "id4", "label": "Réseaux sociaux", "value": "social"}, {"id": "id5", "label": "Magasine", "value": "magasine"}]}/>

                                {supportType === 'print' &&
                                (
                                    <div>
                                        <InputGroupRadio name="format" data={[{"id": "id1", "label": "Flyer", "value": "flyer "}, {"id": "id2", "label": "Autocollant", "value": "autocollant"}]}/>

                                        <InputText label="Nombre d'exemplaire" name="number_items" type={"number"} />
                                        <InputText type={"date"} label="Nombre d'exemplaire" name="number_items" />
                                    </div>
                                )
                                }

                                {supportType === 'web' && (
                                    <div>
                                        <InputGroupRadio label={"type de contrat"} onchange={getValueSiteContrat} name="format" data={[{"id": "id1", "label": "Création de site", "value": "create "}, {"id": "id2", "label": "Maintenance", "value": "maintenance"}, {"id": "id3", "label": "Hébergement", "value": "hebergement"}]}/>

                                        {
                                            siteContrat === "maintenance" && (
                                                <div>
                                                    <InputText label="Adresse du site" name="site_name" />
                                                    <InputText type={"date"} label="Date de fin de maintenance" name="maintenance_date" />
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                                }
                                {supportType === 'contenu' && (
                                    <div>
                                        <TitreForm titre="Type de contenu" />
                                        <InputGroupRadio name="format" data={[{"id": "id1", "label": "Web", "value": "web"}, {"id": "id2", "label": "Print", "value": "print"}]}/>
                                    </div>
                                )
                                }
                                {supportType === 'magasine' && (
                                    <div>
                                        <TitreForm titre="Information du magasine" />
                                        <InputSelect label="Nom du magasine" data={[{"id" : "id1", "value" : "Site internet"}, {"id" : "id2", "value" : "Brochure"}, {"id" : "id3", "value" : "Flyer"} ]} />
                                        <InputText label="Extension du magasine" name="number_items" />
                                        <InputText type={"date"} label="Date de fin de commercialisation" name="number_items" />


                                    </div>
                                )
                                }
                            </div>
                            :
                                <div>
                                    <TitreForm titre={"MAGAZINE"} />
                                    <InputSelect label="Choix de magazine" data={[{"id" : "id1", "value" : "Site internet"}, {"id" : "id2", "value" : "Brochure"}, {"id" : "id3", "value" : "Flyer"} ]} />
                                    <InputSelect label="Choix de l'édition" data={[{"id" : "id1", "value" : "Site internet"}, {"id" : "id2", "value" : "Brochure"}, {"id" : "id3", "value" : "Flyer"} ]} />
                                    <InputSelect label="Choix du contact" data={[{"id" : "id1", "value" : "Site internet"}, {"id" : "id2", "value" : "Brochure"}, {"id" : "id3", "value" : "Flyer"} ]} />

                                    <TitreForm titre="Choix de l'emplacement" />
                                    <InputGroupRadio name="format" data={[{"id": "id1", "label": "Web", "value": "web"}, {"id": "id2", "label": "Print", "value": "print"}]}/>
                                    <TitreForm titre="Choix de l'encart" />
                                    <InputGroupRadio name="format" data={[{"id": "id1", "label": "Web", "value": "web"}, {"id": "id2", "label": "Print", "value": "print"}]}/>
                                </div>
                        }

                        <InputTextArea label="Commentaire" commentaireId="com1" commentaireName="comname" commentaireRows="10" commentaireCols="60" />
                        <InputText label="Montant de la facture" name="bill" />
                        <ButtonPrimary>Créer la commande</ButtonPrimary>

                    </div>
                </form>

            </MainContainer>
        </>
    )
}
export default CreateCommande;