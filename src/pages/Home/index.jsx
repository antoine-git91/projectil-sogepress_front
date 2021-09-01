import React from "react";
import InputText from "../../components/Form/InputText";
import InputGroupRadio from "../../components/Form/InputGroupRadio";
import styled from "styled-components";

const Home = () => {

    const Main = styled.div`
      position: absolute;
      width: calc(100vw - 250px);
      left: 250px;
      top: 58px;
    `

    return(
        <Main>
            <h1>Dashboard</h1>
            <InputText labeltext="coucou" typeinput="text"/>
            <InputGroupRadio />
        </Main>
    )
}
export default Home