import React, {useEffect} from "react";
import styled from "styled-components";
import {useState} from "react";
import Spinner from "../../Spinner";

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

    const [items, setItems] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const requestOptions = {
            method: 'Get',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('itemName')
            }
        };
        fetch(`http://127.0.0.1:8000/api/historique_clients/${dataHistorique.id}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setIsLoading(false)
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    console.log(error)
                }
            )
    }, [dataHistorique.id])


    if(isLoading){
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