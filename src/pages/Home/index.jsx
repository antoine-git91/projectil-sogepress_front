import React from "react";
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
        </Main>
    )
}
export default Home