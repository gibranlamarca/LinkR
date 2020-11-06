import Axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
export default function TrendingTopics(){
    const {userData} = useContext(UserContext);
    const [hashtags,setHashtags] = useState([]);
    const [inputHashtag,setInputHashTag] = useState('');
    const history = useHistory();
    useEffect(()=> {
        const headers = {
            'user-token': userData.token
        }
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending`,{headers})
        request.then((response) => setHashtags(response.data.hashtags)).catch(e=>alert('Erro ao buscar trending, atualize a página'));
    },[])
    
    return (
        <>
        <Section>
            <h2>trending</h2>
            <form onSubmit={(e)=> {e.preventDefault();history.push(`/hashtag/${inputHashtag}`)}}>
                <input placeholder='Procure por hashtag' className="hashtagInput" onChange={e =>setInputHashTag(e.target.value)} value={inputHashtag}/>
            </form>
            <List>
               {hashtags.length === 0 ?
                <h1>Loading...</h1>
                :
                hashtags.map(t => 
                    <li key={t.id}>
                        <Link to ={`/hashtag/${t.name}`}>{`# ${t.name}`}</Link>
                    </li>
                )
            }
            </List>
        </Section>
        </>
    );
}

const Section = styled.section`
    
    background: #151515;
    color:#FFF;
    width: 300px;
    height: 400px;
    border-radius: 10px;
    margin: 0 0 0 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    @media(max-width: 600px){
        display: none;
    }

    h2{
        padding:15px;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        font-size: 2vw;
    }
    .hashtagInput{
        margin: 0 auto;
        display: flex;
        text-align: center;
        background: #151515;
        border: 1px solid grey;
        border-radius: 5px;
        margin-top: 8px;
        color:#FFF;
    }
`;

const List = styled.ul`
    font-family: 'Lato', sans-serif;
    font-weight:bold;
    padding: 20px 0 0 15px;
    li{
        margin-bottom: 10px;
    }
`;

