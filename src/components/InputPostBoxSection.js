import React, { useContext,useState } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import PostContext from '../contexts/PostContext';
import axios from 'axios';
import {VscLocation} from 'react-icons/vsc';
export default function InputPostBoxSection(){
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [location, setLocation] = useState(false);
    const { userData } = useContext(UserContext);
    const { setInputPost, inputPost ,getPosts} = useContext(PostContext);
    function publishPost() {
        if(buttonDisabled) return;
        if (inputPost.link.length !== 0) {
            setButtonDisabled(true);
            const headers = {
                'user-token': userData.token
            }
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts`, inputPost, { headers });
            request.then(()=>{
                setButtonDisabled(false);
                getPosts();
                setInputPost({'link':'','text':''});
            });
            request.catch(() => {
                alert('Houve um erro ao publicar seu link');
                setButtonDisabled(false);
            });
        } else alert("Preencha o campo link!");
    }
    if(location){
        if(!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
          } else {
            navigator.geolocation.getCurrentPosition(success, error);
          }
    }
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setInputPost({...inputPost,'geolocation':{latitude,longitude}});
    }
    function error() {
      alert('Unable to retrieve your location');
      setLocation(false);
    }
    
    return (
        <InputPostBox>
            <LeftBox>
                <img src={userData.avatar} />
            </LeftBox>
            <RightBox color={location ? '#238700' : '#ff4444'}>
                <h1>O que você tem pra favoritar hoje?</h1>
                <input placeholder="Insira aqui o link" onChange={e => setInputPost({ ...inputPost, 'link': e.target.value })} value={inputPost.link} />
                <textarea placeholder="Comentário" onChange={e => setInputPost({ ...inputPost, 'text': e.target.value })} value={inputPost.text}/>
                <div className="buttonDiv">
                    <div className='locationBox' onClick={()=>setLocation(!location)}>
                        <VscLocation/>
                        {` Localização ${location ? ' Ativada':' Desativada'}`}
                    </div>
                    <Button onClick={(e) => publishPost()}>
                        {buttonDisabled ? 'Publicando...' : 'Publicar'}
                    </Button>
                </div>
            </RightBox>
        </InputPostBox>
    );
}
const InputPostBox = styled.div`
    display: flex;
    background: white;
    border-radius: 16px;
    width: 40vw;
    height: 45%;
    margin-bottom: 20px;
    @media (max-width: 600px){
        width: 100%;
        border-radius: 0px;
    }
`
const LeftBox = styled.div`
    height: 100;
    width: 60px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    margin-right: 5px;
    img{
        border-radius: 50%;
        width:35px;
        height:35px;
    }
`;
const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px 15px 15px 0px;
    justify-content: center;
    width: 100%;
    h1{
        color: grey;
        font-size: 15px;
        font-family: Lato;
        font-weight: 300;
        margin-bottom:5px;
    }
    input{
        background: #EFEFEF;
        border-radius: 5px;
        font-family: Lato;
        outline: none;
        border: none;
        margin: 5px 0px;
        padding: 5px 10px;
    }
    textarea{
        resize: none;
        background: #EFEFEF;
        font-family: Lato;
        border-radius: 5px;
        outline: none;
        border: none;
        margin: 0px 0px 5px 0px;
        padding: 5px 10px;
    }
    .buttonDiv{
        width:100%;
        display: flex;
        justify-content: space-between;
        align-items:center;
    }
    .locationBox{
        font-size: 14px;
        color: ${props => props.color};
        font-family: 'Lato',sans-serif;
        cursor:pointer;
        display:flex;
        align-items:center;
    }
`;
const Button = styled.button`
    background: #1877F2;
    border-radius: 5px;
    color: white;
    width: 112px;
    height: 28px;
    font-family: Lato;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
`;