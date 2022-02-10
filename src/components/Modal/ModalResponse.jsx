import styled from "styled-components";
import checkSuccess from "../../assets/images/check_success.png";
import checkError from "../../assets/images/check_error.png";
import React from "react";
import ModalBody from "./parts/ModalBody";
import Flexbox from "../../templates/Flexbox";
import {ButtonPrimary, ButtonPrimaryLink} from "../../utils/styles/button";

const Message = styled.p`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px !important;
  
  &.success:before{
    content: url(${checkSuccess});
    display: block;
    margin-bottom: 20px;
  }

  &.error:before{
    content: url(${checkError});
    display: block;
    margin-bottom: 20px;
  }
`

const ModalResponse = ({ idType, type, response, closeModal }) => {

    const patchSuccessCode = 200;
    const postSuccessCode = 201;
    const error = 500;

    const ifType = () => {

        let message = "";
        let contentButton = "";
        let addressItemCreated = "";

        if( type === "client" ){
            if( response === postSuccessCode ){
                message = "Le client a bien été créé";
            } else if( response === patchSuccessCode ){
                message = "Le client a bien été modifié";
            }
            else {
                message = "Une erreur est survenue. Veuillez réessayer"
            }
            contentButton = "Voir la fiche du client";
            addressItemCreated = "profile";
        } else if( type === "commande" ){
            if( response === postSuccessCode ){
                message = "La commande a bien été créée";
            } else if( response === patchSuccessCode ){
                message = "La commande a bien été modifiée";
            }
            else {
                message = "Une erreur est survenue. Veuillez réessayer"
            }
            contentButton = "Voir la fiche de la commande";
            addressItemCreated = "commande";
        } else if( type === "magazine" ){
            if( response === postSuccessCode ){
                message = "Le magazine a bien été créé";
            } else if( response === patchSuccessCode ){
                message = "Le magazine a bien été modifié";
            }
            else {
                message = "Une erreur est survenue. Veuillez réessayer"
            }
            contentButton = "Voir la fiche du magazine";
            addressItemCreated = "magazine";
        } else if( type === "relance" ){
            if( response === postSuccessCode ){
                message = "La relance a bien été créée";
            } else if( response === patchSuccessCode ){
                message = "La relance a bien été modifié";
            }
            else {
                message = "Une erreur est survenue. Veuillez réessayer"
            }
            contentButton = "Voir la relance";
            addressItemCreated = "action";
        }

        return {
            message,
            contentButton,
            addressItemCreated,
        }
    };

    return (
            <ModalBody justify={"center"} align={"center"}>
                <Flexbox direction={"column"} align={"center"} justify={"center"}>
                    {response && (response === patchSuccessCode || response === postSuccessCode) && <Message className={ "success" }>{ ifType().message }</Message>}
                    {response && (response === error) && <Message className={ "error" }>{ ifType().message }</Message>}

                    { ( response === patchSuccessCode || response === postSuccessCode ) &&
                        (<Flexbox justify={"center"} align={"center"}>
                            <ButtonPrimaryLink to={"/" + ifType().addressItemCreated + "/" + idType}
                                               margin={"0 10px"}>{ifType().contentButton}</ButtonPrimaryLink>
                            <ButtonPrimaryLink to={"/"}>Retour à l'accueil</ButtonPrimaryLink>
                        </Flexbox>)
                    }
                    { ( response === error ) && ( <>
                                <ButtonPrimary onClick={ () => { closeModal() } }>Retour au formulaire</ButtonPrimary>
                            </> )
                    }
                </Flexbox>
            </ModalBody>
    )
}
export default ModalResponse;