import styled from "styled-components";
import {Link} from "react-router-dom";
import arrow from '../../assets/images/arrowreturn.svg';
import deleteIcon from "../../assets/images/delete.png";
import deletehoverIcon from "../../assets/images/deletehover.png";
import checkedIcon from "../../assets/images/checked.png";
import checkedhoverIcon from "../../assets/images/checkedhover.png";
import returnIcon from "../../assets/images/return.png"
import returnIconHover from "../../assets/images/return_hover.png"

export const ButtonPrimary = styled.button`
  background-color: #FF6700;
  color: #fff;
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .3s;
  margin: ${({ margin }) => margin ?? 0};

  &:hover {
    background: #000;
  }
`

export const ButtonPrimaryLink = styled(Link) `
  display: inline-block;
  font-size: 14px;
  background-color: #FF6700;
  color: #fff;
  border: none;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .3s;
  margin: ${({ margin }) => margin ?? 0};
  border-right: 1px solid #fff;

  &:hover {
    background: #000;
  }
`

export const ButtonSecondaryLink = styled(Link)`
  margin: ${({ margin }) => margin ?? 0};
  font-weight: bold;
  color: #FF6700;
  display: block;
  transition: .3s;
  
  &:hover{
    color: #000;
  }
`

export const ButtonReturn = styled.button`
  background-color: transparent;
  border: 0px solid transparent;
  margin: ${({margin}) => margin ?? 0};
  padding: 15px 0;
  font-weight: 400;
  font-size: 16px;
  color: #FF6700;
  display: block;
  transition: .3s;

  &:hover {
    color: #2f2f2f;
  }

  &:before {
    content: url(${arrow});
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
`

export const ButtonSecondary = styled.button`
  margin: ${({ margin }) => margin ?? 0};
  font-weight: bold;
  font-size: 16px;
  color: #FF6700;
  display: block;
  transition: .3s;
  border: transparent;
  background-color: transparent;
  
  &:hover{
    color: #000;
  }
`

export const DeleteButton = styled.button`
    border: none;
    background-color: transparent;
    color: #b83c3c;
    cursor: pointer;
    margin-left: 10px;
    
    &:hover{
    text-decoration: underline;
    }
`

export const ButtonAction = styled.button`
  
  border: transparent;
  background-color: transparent;

  & i.deleted{
    &:before{
      content: url(${deleteIcon});
    }
    
    &:hover:before{
      content: url(${deletehoverIcon});
    }
  }

  & i.checked{
    &:before{
      content: url(${checkedIcon});
    }

    &:hover:before{
      content: url(${checkedhoverIcon});
    }
  }

  & i.return {
    &:before {
      content: url(${returnIcon});
    }

    &:hover:before {
      content: url(${returnIconHover});
    }
  }
`