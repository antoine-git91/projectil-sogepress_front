import React from "react";
import styled from "styled-components";

const BoxContactStyle = styled.div`
  width: 200px;
  padding: 20px;
  background-color: lightgrey;
  font-size: 18px;
  h3{
    margin: 0 ;
  }
`

export const ContactTitle = styled.p`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
  margin: 10px 0 5px 0 ;
`

const BoxContact = ({contact}) => {

    return (
        <BoxContactStyle>
            <h3>{contact.nom} <span>{contact.prenom}</span></h3>
            <ContactTitle>Fonction</ContactTitle>
            <p>{contact.fonction}</p>
            <ContactTitle>Téléphone</ContactTitle>
            <p>{contact.tel}</p>
            <ContactTitle>Email</ContactTitle>
            <p>{contact.email}</p>
        </BoxContactStyle>
    )
}

export default BoxContact;