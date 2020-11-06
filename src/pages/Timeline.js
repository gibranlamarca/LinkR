import React from 'react';
import styled from 'styled-components';
import Topbar from '../components/TopBar';


export default function Timeline(props){

    return (
        <Page>
            <Topbar />
            {props.children}
        </Page>
    );
}

const Page = styled.div`
    width: 100%;
    background: #333;
    display:flex;
    justify-content:center;
    background-repeat: repeat;
`
