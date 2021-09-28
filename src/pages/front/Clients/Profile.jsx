import React, {useEffect, useState} from "react";
import MainContainer from "../../../templates/Container";
import {useParams} from "react-router-dom";

const Profile = () => {

    const {id} = useParams()
    const [items, setItems] = useState([])

    //const {item: client, loading, load} = usePaginationFetch(`http://127.0.0.1:8000/api/clients/${id}`)


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/clients/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result)
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    console.log(error)
                }
            )
    }, [id])

    /*useEffect(() => load(), [load])
    console.log(JSON.stringify(client))*/

    const {raison_sociale, email} = {...items};
    return (
        <MainContainer>
            <h1>{raison_sociale}</h1>
            <p>{email}</p>

        </MainContainer>
    )

}
export default Profile