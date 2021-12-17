import React, {useEffect} from "react";
import styled from "styled-components";
import Spinner from "../../Spinner";
import {useFetchGet} from "../../../utils/misc/useFetchGet";

const BoxHistoriqueStyle = styled.div`
  border: 1px solid black;
  margin-bottom: 30px;
  max-width: 60%;
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

    const {items, load, loading} = useFetchGet(`https://127.0.0.1:8000/api/historique_clients/${dataHistorique.id}`)
    useEffect(() => {
        load()
    }, [load])


    if(loading){
        return <Spinner />
    }

    return (
        <BoxHistoriqueStyle>
            <HeadBoxHistorique>
                <p>Date : <span>{items.createdAt}</span></p>
                <p>Contact : <span>{items.nom + " " + items.prenom}</span> <span>(Physique)</span></p>
                <p>Projet : <span>Projet n°</span></p>
            </HeadBoxHistorique>
            <ContentBoxHistorique>
                <p>{items.commentaire}</p>
            </ContentBoxHistorique>
        </BoxHistoriqueStyle>
    )
}

export default BoxHistorique;