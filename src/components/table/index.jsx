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

const Table = ({headTable, dataUrl}) => {

    const {items: clients, loading, load} = usePaginationFetch({dataUrl});

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