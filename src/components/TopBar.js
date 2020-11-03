import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { IoIosArrowDown,IoIosSearch } from "react-icons/io";
import {Link} from 'react-router-dom';
export default function Topbar(){
    const [DropMenu,SetDropMenu] = useState(false);
    const {userData,logOut} = useContext(UserContext);
    return(
        <Header>
            <h1>
                <Link to='/timeline'>linkr</Link>
            </h1>

            <div>
                <input placeholder='Search for people and friends'/>
            </div>
            
            
            <div onClick={() => SetDropMenu(!DropMenu)}>
                <Menu
                 opacity={DropMenu? '1':'0'}
                 translate={DropMenu? 'translateY(0)':'translateY(-20px)'}
                 rotate={DropMenu? 'rotate(180deg)':'rotate(0)'}
                 display={DropMenu? 'flex' : 'none'}
                >
                    <div><IoIosArrowDown  class="arrowDown"/></div>
                    <nav>
                        <Link to='/my-posts'>My posts</Link>
                        <Link to='/my-likes'>My likes</Link>
                        <Link to='/' onClick={()=>logOut()}>Logout</Link>
                    </nav>
                </Menu>
                <img src={userData.avatar} />
            </div>
        </Header>
    );
}

const Header = styled.header`
    width: 100%;
    display:flex;
    justify-content: space-between;
    background:#151515;
    height: 70px;
    position:fixed;
    top: 0;
    left: 0;
    padding: 0 15px;
    align-items: center;
    h1{
        font-family: 'Passion One', cursive;
        font-size: 3vw;
        letter-spacing: 0.05em;
        color:#FFF;
    }
    div{
        display:flex;
        align-items:center;
    }
    img{
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
    input{
        height:40px;
        width: 400px;
        padding: 10px;
        border-radius: 5px;
        font-family: 'Lato',sans-serif;
        font-size: 19px;
        line-height:22.8px;
        position:relative;    
        &::placeholder{
            color: #C6C6C6;
        }
    }

    
    @media (max-width: 600px){
       h1{
           font-size: 10vw;
       }
    }
`

const Menu = styled.div`
    position: relative;
    color: #FFF;
    font-size: 3vw;
    margin-right: 10px;
    div{
        transform: ${props => props.rotate};
    }
    nav {
        display:flex;
        flex-direction:column;
        font-size: 22px;
        top:50px;
        position: absolute;
        background:#151515;
        border-bottom-left-radius: 25px;
        font-family:'Lato', sans-serif;
        width: 200px;
        right: -75px;
        opacity: ${props => props.opacity};
        transition: 400ms ease;
        padding: 20px;
        transform: ${props => props.translate};
        display: ${props => props.display};
    }
    a{
        padding: 10px;
    }
    .arrowDown{
        @media(max-width:600px){
            font-size: 8vw;
        }
    }
`