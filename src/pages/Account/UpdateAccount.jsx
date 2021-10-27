import React, {useState} from 'react';
import {BoxTitle} from "../../utils/styles/single";
import {ButtonPrimary} from "../../utils/styles/button";
import MainContainer from "../../templates/Container";
import Flexbox from "../../templates/Flexbox";
import {useReducer} from "react";
import {InputStyle} from "../../utils/styles/InputStyle";
import Spinner from "../../components/Spinner";
import Success from "../../components/MessageStateAction/Success";

const UpdateAccount = () => {

    const meUser = JSON.parse(localStorage.getItem("meUser"));
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeInput = (e, setState) => {
        const value = e.target.value;
        const name = e.target.name;

        setState({[name]: value});
    };
    /* On initialise les input text simple */
    const [inputSate, setInputState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            lastname_user: meUser.nom,
            firstname_user: meUser.prenom,
            email_user: meUser.email
        }
    )

    const handleUpdateAccount = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                nom: inputSate.lastname_user,
                prenom: inputSate.firstname_user,
                email: inputSate.email_user
            })
        };
        fetch('http://127.0.0.1:8000/api/users/' + meUser.id, requestOptions)
        .then(response => {
            setLoading(true)
            if(response.ok){
                response.json()
                .then(update => {
                    console.log(update);
                    const updateData = {
                        "nom": update.nom,
                        "prenom": update.prenom,
                        "email": update.email,
                        "role": update.roles[0],
                        "id" : update.id
                    }
                    localStorage.setItem('meUser', JSON.stringify(updateData));
                })
                setTimeout(() => {
                    setUpdateSuccess(true)
                    setLoading(false)
                }, 2000)
            }
            else if (response.status === 401){

            }
        })
    }

    if(loading){
        return (
            <MainContainer>
                <Spinner />
            </MainContainer>
        )
    }

    return (
        <>
            <MainContainer>
                <BoxTitle>
                    <h1>Modifier mon profil</h1>
                </BoxTitle>
                <form onSubmit={handleUpdateAccount}>
                    <Flexbox>
                        <label>Nom
                            <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.lastname_user} name="lastname_user" />
                        </label>
                        <label>Prénom
                            <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.firstname_user} name="firstname_user" />
                        </label>
                    </Flexbox>
                    <label>Email
                        <InputStyle type="text" onChange={(e) => handleChangeInput(e, setInputState)} value={inputSate.email_user} name="email_user" />
                    </label>
                    <ButtonPrimary>Je modifie mon profil</ButtonPrimary>
                </form>
                {updateSuccess && <Success messageTitle={"Demande Validée"} messageText={"Votre profil a bien été mis à jour"} />}

            </MainContainer>
        </>
    )

}
export default UpdateAccount;