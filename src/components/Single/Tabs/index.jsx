import React from "react";
import styled from "styled-components";
import BtnTabs from "../../btn_tabs";

const TabsStyle = styled.div`

`

const TabsSingle = () => {

    return (

        <TabsStyle>
          <BtnTabs text="Contact"></BtnTabs>
          <BtnTabs text="Commandes"></BtnTabs>
          <BtnTabs text="Historique"></BtnTabs>
          <BtnTabs text="Chiffres d'affaires"></BtnTabs>
        </TabsStyle>

    )
}

export default TabsSingle;