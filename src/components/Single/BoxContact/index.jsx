import React from "react";
import styled from "styled-components";

const BoxContactStyle = styled.div`
  max-height: 250px;
  padding: 20px;
  background-color: lightgrey;
  
  h3{
    margin: 0;
  }
  
  p{
    font-size: 18px;
    margin-bottom: 5px;
}
`

export const ContactTitle = styled.p`
text-transform: uppercase;
font-weight: 600;
`

const BoxContact = () => {

    return (
        <BoxContactStyle>
            <h3>DUPONT <span>Louison</span></h3>
            <ContactTitle>Fonction</ContactTitle>
            <p>Secrétaire</p>
            <ContactTitle>Téléphone</ContactTitle>
            <p>0247458441</p>
            <ContactTitle>Email</ContactTitle>
            <p>a.dupont@exemple.com</p>
        </BoxContactStyle>

    )
}

export default BoxContact;