import React from "react";
import TableField from "./TableField";

const Table = () => {

    const data = [{"nom": "nom 1", "prenom": "prenom 1", "adresse": "adresse 1"}, {"nom": "nom 1", "prenom": "prenom 1", "adresse": "adresse 1"}]

    return(
        <table>
            <thead>
                <tr>
                    <td>Nom</td>
                    <td>Prénom</td>
                    <td>Adresse</td>
                </tr>
            </thead>
            <tbody>
            {data.map(coordonnee => <TableField entry={coordonnee} />)}
            </tbody>
        </table>
    )
}
export default Table