import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import '@ionic/react/css/core.css';
import { IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';

export default function BtnHome(){
    const navigateTo = useNavigate();

    return (
        <SecBtn onClick={() => navigateTo('/')}>
            <IonIcon data-test="go-home-header-btn" icon={arrowBackOutline} id="arrowIcon"></IonIcon>
        </SecBtn>
    )
}

const SecBtn = styled.section`
    position: absolute;
    height:auto;
    top: 0.75rem;
    left: 1rem;
    #arrowIcon{
        cursor: pointer;
        color: black;
    }
`