import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import {GoPrimitiveDot} from 'react-icons/go';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import PostContext from '../contexts/PostContext';
export default function Topbar() {
    const {followedUsers,isFollowed} = useContext(PostContext);
    const [DropMenu, SetDropMenu] = useState(false);
    const { userData, logOut } = useContext(UserContext);
    const [searchInput, setSearchInput] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    useEffect(() => {
        getFilteredUsers();
    }, [searchInput])
    function getFilteredUsers() {
        if(searchInput.length === 0) return;
        const headers = { 'user-token': userData.token };
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${searchInput}`, { headers })
        request.then((response) => {
            const arr = response.data.users;
            arr.forEach((user,index) => {
                if(isFollowed(user.id)){
                    arr.splice(index,1);
                    arr.unshift(user);
                };
            });
            setFilteredUsers(response.data.users);
        }).catch(e => console.log(e));
    }
   
    return (
        <Header>
            <h1>
                <Link to='/timeline'>linkr</Link>
            </h1>

            <InputContainer display={(searchInput.length === 0 || filteredUsers.length === 0) ? 'none' : 'block'}>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    placeholder='Search for people and friends'
                    onChange={e => setSearchInput(e.target.value)}
                    value={searchInput} />
                <ul>
                    {filteredUsers.map(user =>
                        <li>
                            <Link to={`/user/${user.id}`}>
                                <img src={user.avatar} />
                                <div>{user.username}</div>
                            </Link>
                            {isFollowed(user.id) ? <div className='followed'>{` • following`}</div> : ''}
                        </li>
                    )}
                </ul>
            </InputContainer>


            <div onClick={() => SetDropMenu(!DropMenu)}>
                <Menu
                    opacity={DropMenu ? '1' : '0'}
                    translate={DropMenu ? 'translateY(0)' : 'translateY(-20px)'}
                    rotate={DropMenu ? 'rotate(180deg)' : 'rotate(0)'}
                    display={DropMenu ? 'flex' : 'none'}
                >
                    <div><IoIosArrowDown class="arrowDown" /></div>
                    <nav>
                        <Link to='/my-posts'>My posts</Link>
                        <Link to='/my-likes'>My likes</Link>
                        <Link to='/' onClick={() => logOut()}>Logout</Link>
                    </nav>
                </Menu>
                <img src={userData.avatar} />
            </div>
        </Header>
    );
}
const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    font-family: 'Lato',sans-serif;
    
    ul{
        position:absolute;
        top:35px;
        width:100%;
        background: #e5e5e5;
        display: ${props => props.display};
        border-radius:5px;
        padding: 15px;
        li{
            display:flex;
            align-items:center;
            margin-bottom:10px;
        }
        a{
            display:flex;
        }
        img{
            margin-right:10px;
        }
    }
    input{
        height:40px;
        width: 400px;
        padding: 10px;
        border-radius: 5px;
        font-family: 'Lato',sans-serif;
        font-size: 19px;
        line-height:22.8px;  
        z-index:99;
        &::placeholder{
            color: #C6C6C6;
        }
    }
    .followed{
        margin-left:5px;
        color: #C5C5C5;
    }
`
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
        &:hover{
            background:grey;
        }
    }
    .arrowDown{
        @media(max-width:600px){
            font-size: 8vw;
        }
    }
`