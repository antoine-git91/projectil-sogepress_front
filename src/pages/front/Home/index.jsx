import React from "react";
import MainContainer from "../../../components/Container";
import InputGroupRadio from "../../../components/Form/InputGroupRadio";
import InputText from "../../../components/Form/InputText";
import {Link} from "react-router-dom";
<<<<<<< HEAD
import InputGroupRadio from "../../../components/Form/InputGroupRadio";
=======
import InputSelect from "../../../components/Form/InputSelect";
>>>>>>> develop

const Home = () => {

    return(
        <MainContainer>
            <h1>Dashboard</h1>
<<<<<<< HEAD
            <InputGroupRadio />
=======
            <InputGroupRadio selected={3} name="groupe1" data={[{"id": "id1", "label": "Mon label 1", "value": "value1"},{"id": "id2", "label": "Mon label 2", "value": "value2"},{"id": "id3", "label": "Mon label 3", "value": "value3"},{"id": "id4", "label": "Mon label 4", "value": "value4"}]}/>
            <InputText labeltext="Coucou" />
            <InputSelect />
>>>>>>> develop
            <Link to="/creation_client" >Créer un client</Link>
        </MainContainer>
    )
}
export default Home;