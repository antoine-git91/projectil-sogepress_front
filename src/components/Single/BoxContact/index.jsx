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

const BoxContact = (nom, prenom, fonction, tel, mail) => {

    return (
        <BoxContactStyle>
            <h3> {nom} <span>{prenom}</span></h3>
            <ContactTitle>Fonction</ContactTitle>
            <p>{fonction}</p>
            <ContactTitle>Téléphone</ContactTitle>
            <p>{tel}</p>
            <ContactTitle>Email</ContactTitle>
            <p>{mail}</p>
        </BoxContactStyle>

    )
}

export default BoxContact;