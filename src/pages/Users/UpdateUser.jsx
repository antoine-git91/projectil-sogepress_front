import React, {useEffect, useReducer} from "react";
import MainContainer from "../../templates/Container";
import {BoxTitle} from "../../utils/styles/single";
import {useParams} from "react-router-dom";
import {useFetchPatch} from "../../utils/misc/useFetchPatch";
import {useFetchGet} from "../../utils/misc/useFetchGet";
import Spinner from "../../components/Spinner";
import InputText from "../../components/Form/InputText";
import {handleChangeInput} from "../../utils/misc/inputChange";
import {ButtonPrimary} from "../../utils/styles/button";
import Flexbox from "../../templates/Flexbox";

const UpdateUser = ( ) => {

    const { id_user } = useParams();

    /* On initialise les input text simple */
    const [ inputState, setInputState ] = useReducer(
        ( state, newState ) => ({ ...state, ...newState }),
        {
            user_firstname: "",
            user_lastname: "",
            user_email: "",
            user_phone: "",
        }
    );

    const { items: user , load: loadUser, loading: loadingUser } = useFetchGet( "https://localhost:8000/api/users/" + id_user );
    const { success, error, loading, post: postUser } = useFetchPatch( "https://localhost:8000/api/users/" + id_user,
        {
            "email": inputState.user_email,
            "nom": inputState.user_firstname,
            "prenom": inputState.user_lastname,
            "telephone": inputState.user_phone,
        });


    useEffect( () => {
        loadUser()
    }, [ loadUser ]);

    useEffect(() => {
        setInputState({
            user_firstname: user.nom,
            user_lastname: user.prenom,
            user_email: user.email,
            user_phone: user.telephone,
        })
    }, [ user ]);

    const handleSubmit = ( e ) => {
        e.preventDefault();
        postUser();
    }

    return(
        <MainContainer>
            { loadingUser ? <Spinner />
                :
                <>
                    <BoxTitle>
                        <h1>Modifier l'utilisateur { user.nom + " " + user.prenom }</h1>
                    </BoxTitle>
                    <form onSubmit={ ( e ) => { handleSubmit( e ) } }>
                        <Flexbox>
                            <InputText
                                label={ "Nom" }
                                value={ inputState.user_firstname}
                                onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                name={ "user_firstname" }
                                placeholder={ "Nom de l'utilisateur" }
                            />
                            <InputText
                                label={ "Prénom" }
                                value={ inputState.user_lastname}
                                onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                                name={ "user_lastname" }
                                placeholder={ "Prénom de l'utilisateur" }
                            />
                        </Flexbox>
                        <InputText
                            label={ "Téléphone" }
                            value={ inputState.user_phone}
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            name={ "user_phone" }
                            placeholder={ "Téléphone de l'utilisateur" }
                        />
                        <InputText
                            label={ "Email" }
                            value={ inputState.user_email}
                            onChange={ ( e ) => { handleChangeInput( e, setInputState ) } }
                            name={ "user_email" }
                            placeholder={ "Email de l'utilisateur" }
                        />
                        <ButtonPrimary type={ "submit" }>Modifier l'utilisateur</ButtonPrimary>
                    </form>
                </>
            }
        </MainContainer>
    )
}
export default UpdateUser;