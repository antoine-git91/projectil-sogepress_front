import React, {useEffect} from "react";
import MainContainer from "../../templates/Container";
import {useFetchGet} from "../../utils/misc/useFetchGet";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner";

const User = () => {

    const headTable = [ "Nom", "Prenom", "Role" ]

    const { items: users, load: loadUsers, loading: loadingUsers } = useFetchGet( "https://localhost:8000/api/users" );

    useEffect( () => {
        loadUsers()
    }, [ loadUsers ] );

    console.log(users);

    return(
        <MainContainer>
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
                                <td><Link to={{pathname: `/user/${dataUser.id}`}}>{dataUser.roles[0]}</Link></td>
                            </tr>
                        )) }
                    </tbody>
                </table>}
        </MainContainer>
    )
}
export default User