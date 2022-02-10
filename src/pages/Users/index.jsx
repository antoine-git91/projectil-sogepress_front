import React, {useContext, useEffect, useState} from "react";
import MainContainer from "../../templates/Container";
import {useFetchGet} from "../../utils/misc/fetch/useFetchGet";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner";
import {ButtonPrimaryLink} from "../../utils/styles/button";
import DivButtonAction from "../../utils/styles/DivButton";
import Pagination from "../../components/Pagination";
import {AddressServer} from "../App";

const User = () => {

    const headTable = [ "Nom", "Prenom", "Role" ];
    let offset = 5;
    const [ numberPage, setNumberPage ] = useState({value:1, valueDisplay:1} );

    const { items: users, load: loadUsers, totalItems, loading: loadingUsers } = useFetchGet( useContext(AddressServer) + "/api/users" );
    const numberOfPages = Math.ceil(totalItems/offset);

    useEffect( () => {
        loadUsers()
    }, [ loadUsers ] );

    const getRole = ( role ) => {
        let r;
        if( role === "ROLE_ADMIN" ){
            r = "Administrateur"
        } else if( role === "ROLE_COMMERCIAL" ){
            r = "Commercial"
        }
        return r;
    }

    return(
        <MainContainer>
            <DivButtonAction>
                <ButtonPrimaryLink to="/create_user">Créer un utilisateur</ButtonPrimaryLink>
            </DivButtonAction>
            <h1>Utilisateurs</h1>
            { loadingUsers ?
            <Spinner/>
            : <table>
                    <thead>
                    <tr>
                        {headTable.map((item, key) => <th key={key}>{item}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((dataUser, key) => (
                            <tr key={key}>
                                <td><Link to={{pathname: `/user/${dataUser.id}`}}>{dataUser.nom}</Link></td>
                                <td><Link to={{pathname: `/user/${dataUser.id}`}}>{dataUser.prenom}</Link></td>
                                <td><Link to={{pathname: `/user/${dataUser.id}`}}>{ getRole( dataUser.roles[0] ) }</Link></td>
                            </tr>
                        )) }
                    </tbody>
                </table>}
            <Pagination
                numberOfPages={ numberOfPages }
                setNumberPage={ setNumberPage }
                numberPage={ numberPage.value }
            />
        </MainContainer>
    )
}
export default User