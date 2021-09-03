import React from "react";
import MainContainer from "../../../templates/Container";
import InputText from "../../../components/Form/InputText";
import {Link} from "react-router-dom";
import InputGroupRadio from "../../../components/Form/radio/InputGroupRadio";
import InputSelect from "../../../components/Form/InputSelect";


const Home = () => {

    const data = [{"id": "id1", "label": "Mon label 1", "value": "value1"},{"id": "id2", "label": "Mon label 2", "value": "value2"},{"id": "id3", "label": "Mon label 3", "value": "value3"},{"id": "id4", "label": "Mon label 4", "value": "value4"}]


    return(
        <MainContainer>
            <h1>Dashboard</h1>
            <InputGroupRadio selected={3} name="groupe1" data={data}/>
            <InputText labeltext="Coucou" />
            <InputSelect data={[{"id" : "id1", "value" : "Site internet"}, {"id" : "id2", "value" : "Brochure"}, {"id" : "id3", "value" : "Flyer"} ]} />
            <Link to="/creation_client" >Créer un client</Link>
        </MainContainer>
    )
}
export default Home;