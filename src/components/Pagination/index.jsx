import React from "react";
import styled from "styled-components";
import InputSelect from "../Form/InputSelect";
import Flexbox from "../../templates/Flexbox";
import {setSelectDataRequest} from "../../utils/misc/Function";

const PaginateContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  margin-top: 30px;

   p {
     color: black;
     float: left;
     padding: 8px 16px;
     text-decoration: none;
     cursor: pointer;
  }
`

const ItemPagination = styled.a`
  font-size: 20px;
  padding: 0 10px;
  color: orangered;
`

const Pagination = ( { numberOfPages, setNumberPage, numberPage } ) => {

    const range = () => {
        let tab = [];
         for( let i=1; i <= numberOfPages; i++ ){
             tab.push( i );
         };
        return tab;
    };

    const toPrevious = () => {
        numberPage > 1 && setNumberPage( { value:numberPage - 1, valueDisplay:numberPage - 1 } );
        setSelectDataRequest({
            tagWanted: "select_page",
            data: range(),
            itemWanted: numberPage,
            setSelectState: setNumberPage,
            valueChosen: numberPage,
            valueDisplayChosen: numberPage,
        });
    };
    const toNext = () => {
        numberPage < numberOfPages && setNumberPage( { value:numberPage + 1, valueDisplay:numberPage + 1 } );
        setSelectDataRequest({
            tagWanted: "select_page",
            data: range(),
            itemWanted: numberPage,
            setSelectState: setNumberPage,
            valueChosen: numberPage,
            valueDisplayChosen: numberPage,
        });
    };


    return (
        <PaginateContent className="pagination">
            <Flexbox>
                { numberPage > 1 && <ItemPagination href={ "#" } onClick={toPrevious} title="aller à la page précédente">&laquo;</ItemPagination> }
                <p>Page </p>
                <InputSelect
                    label={""}
                    name={"select_page"}
                    data={ range() && range().map( ( page, key ) => ( { id: ( key + page ), value: page, valueDisplay: page } ) ) }
                    selectValue={numberPage}
                    setSelectValue={setNumberPage}
                    option={numberPage}
                    optionValue={numberPage}
                    margin={"0 0 0 0"}
                />
                <p> sur {numberOfPages}</p>
                { numberPage < numberOfPages && <ItemPagination href={ "#" } onClick={ toNext } title="aller à la page suivante">&raquo;</ItemPagination> }
            </Flexbox>
        </PaginateContent>
    )
}
export default Pagination