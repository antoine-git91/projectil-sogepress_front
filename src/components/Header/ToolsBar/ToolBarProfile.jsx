import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import avatar from "../../../assets/images/profile.png";
import logout from "../../../assets/images/logout.png"
import profile from "../../../assets/images/profil.png"


const Avatar = styled.button`

  border-radius: 50%;
  width: 32px;
  height: 32px;
  background-image: url(${avatar});
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
  
    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
`

const MenuBox = styled.div`
  position: relative;
  margin-left: auto;
`

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: max-content;
  right: 0;
  top: 40px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  -webkit-box-shadow: 0px 6px 14px -6px #7A7A7A;
  box-shadow: 0px 6px 14px -6px #7A7A7A;
  z-index: 10000;

  & > * {
    font-size: 14px;
    font-weight: bold;
    color: #3b3b3b;
    border: none;
    background-color: #fff;
    padding: 5px 20px;
    
    &:first-child{
      padding: 16px 20px 8px 20px;
    }

    &:last-child{
      padding: 8px 20px 16px 20px;
    }

    &:hover {
      background-color: #efefef;
    }
  }
`

const Logout = styled.button`
  &:before{
    content: url(${logout});
    display: inline-block;
    transform: translateY(3px);
    margin-right: 5px;
  }
`

const ProfileItem = styled(Link)`
  &:before{
    content: url(${profile});
    display: inline-block;
    transform: translateY(3px);
    margin-right: 5px;
  }
`


const ToolBarProfile = () => {

    const [ showMenuBtn ,setShowMenuBtn ] = useState(false );
    const ProfileBtn = useRef(null);

    const logout = ( e ) => {
        e.preventDefault();
        console.log("logout")
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('meUser');
        window.location.reload();
        window.location.href = '/';
    };

    const closeMenuProfile = ( e ) => {
        if (ProfileBtn.current && !ProfileBtn.current.contains(e.target)) {
            setShowMenuBtn( false );
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeMenuProfile);
        return () => {
            document.removeEventListener('click', closeMenuProfile);
        };
    });

    return(
        <MenuBox>
            <Avatar onClick={ () => setShowMenuBtn( !showMenuBtn ) } aria-expanded={showMenuBtn} ref={ProfileBtn}>
                <span className={"screen-reader-text"}>Ouvrir le menu profil</span>
            </Avatar>
            { showMenuBtn &&
                <MenuItems>
                    <ProfileItem to={"/my_account"}>Mon profil</ProfileItem>
                    <Logout onClick={ ( e ) => logout( e ) } >Déconnexion</Logout>
                </MenuItems>
            }
        </MenuBox>
    )
}
export default ToolBarProfile