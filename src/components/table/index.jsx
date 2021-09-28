import React, {useEffect} from "react";
import TableField from "./TableField";
import styled from "styled-components";
import {usePaginationFetch} from "../Hook";

const TableStyle = styled.table`
      width: 100%;
    `

const HeadTable = styled.thead`
      line-height: 2;
    `

const Table = ({headTable}) => {

    const {items: clients, loading, load} = usePaginationFetch('http://127.0.0.1:8000/api/clients');

    useEffect(() => load(), [load])

    return(
        <div>
            {loading && 'Chargement...'}
            <TableStyle>
                <HeadTable>
                    <tr>
                        {headTable.map((item, key) => <th key={key}>{item}</th>)}
                    </tr>
                </HeadTable>
                <tbody>
                {clients.map((dataClient, key) => <TableField key={key} index={key + 1} dataClient={dataClient} />)}
                </tbody>
            </TableStyle>
            {/*{JSON.stringify(client)}*/}

        </div>
    )
}
export default Table