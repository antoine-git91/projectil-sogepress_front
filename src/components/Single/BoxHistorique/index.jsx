import React from "react";
import styled from "styled-components";

const BoxHistoriqueStyle = styled.div`
  border: 1px solid black;
  margin-bottom: 50px;
`

export const HeadBoxHistorique = styled.div`
display : flex;
justify-content: space-between;
padding: 10px; 20px;
`

export const ContentBoxHistorique = styled.div`
display : flex;
border-top: 1px solid black;
padding: 20px;
`

const BoxHistorique = ({dataHistorique}) => {

    const {commentaire, contact, createdAt} = {...dataHistorique}

    return (
        <BoxHistoriqueStyle>
            <HeadBoxHistorique>
                <p>Date : <span>{createdAt}</span></p>
                <p>Contact : <span>{contact.nom + " " + contact.prenom}</span> <span>(Physique)</span></p>
                <p>Projet : <span>Projet n°</span></p>
            </HeadBoxHistorique>
            <ContentBoxHistorique>
                <p>{commentaire}</p>
            </ContentBoxHistorique>
        </BoxHistoriqueStyle>
    )
}

export default BoxHistorique;