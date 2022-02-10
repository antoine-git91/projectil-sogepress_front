import React from "react";
import styled from "styled-components";
import {dateIsoFormated} from "../../../utils/misc/Function";
import {ButtonAction} from "../../../utils/styles/button";

const BoxHistoriqueStyle = styled.div`
  border: 3px solid #fd6e3a;
  border-radius: 10px;
  margin-bottom: 30px;
  max-width: 60%;
`

export const HeadBoxHistorique = styled.div`
display : flex;
justify-content: space-between;
padding: 10px 20px;
`

export const ContentBoxHistorique = styled.div`
  display: flex;
  border-top: 2px solid #fd6e3a;
  padding: 20px;
`

const BoxHistorique = ({dataHistorique, setIdHistorique, setShowModalDeleteHistorique}) => {

    return (
        <>
            <BoxHistoriqueStyle>
                <HeadBoxHistorique>
                    <p>Date : <span>{dateIsoFormated( dataHistorique.createdAt )}</span></p>
                    <p>Contact : <span>{dataHistorique.contact && dataHistorique.contact.fullname}</span> <span>(Physique)</span></p>
                    <p>Projet : <span>Projet n°</span></p>
                    <ButtonAction
                        onClick={ () => (
                            setShowModalDeleteHistorique( true ),
                                setIdHistorique(dataHistorique)
                        ) }>
                        <span className="screen-reader-text">Valider la relance</span>
                        <i className={ "deleted" }/>
                    </ButtonAction>
                </HeadBoxHistorique>
                <ContentBoxHistorique>
                    <p>{dataHistorique.commentaire}</p>
                </ContentBoxHistorique>
            </BoxHistoriqueStyle>
        </>
    )
}

export default BoxHistorique;