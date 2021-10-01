import React from "react";
import styled from "styled-components";

const BoxHistoriqueStyle = styled.div`
  border: 1px solid black;
  margin-bottom: 50px;
}
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

const BoxHistorique = () => {

    return (
        <BoxHistoriqueStyle>
            <HeadBoxHistorique>
            <p>Date : <span>11/09/2021</span></p>
            <p>Type de contact : <span>Physique</span></p>
            <p>Projet : <span>Projet n°1</span></p>
            </HeadBoxHistorique>
            <ContentBoxHistorique>
            <p>ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
            </ContentBoxHistorique>
        </BoxHistoriqueStyle>

    )
}

export default BoxHistorique;