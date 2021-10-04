import React from "react";
import styled from "styled-components";

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
  }
`

const Pagination = () => {

    return (
        <PaginateContent className="pagination">
            <p>&laquo;</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>&raquo;</p>
        </PaginateContent>
    )
}
export default Pagination