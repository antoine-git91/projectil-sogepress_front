import React from "react";
import plus from '../../images/plus.png';
import styled from "styled-components";

const BtnAjoutStyle = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 1rem;
    border: none; 
    background-color: white;
    `

const BtnAjoutImgStyle = styled.img`
margin-left: 1rem;
`    


const BtnAjout = ({text}) => {

    return (

        <BtnAjoutStyle>{text}<BtnAjoutImgStyle src={plus}></BtnAjoutImgStyle></BtnAjoutStyle>

    )
}

export default BtnAjout;