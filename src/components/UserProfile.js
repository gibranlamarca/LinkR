import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TrendingTopics from './TrendingTopics';
import axios from 'axios';
import PostBox from './PostBox';
import PostContext from '../contexts/PostContext';
import { useParams } from 'react-router';
import UserContext from '../contexts/UserContext';
export default function TimelineSection(props) {
    const { getUserPosts, posts, getLikedPosts } = useContext(PostContext);
    const {userData} = useContext(UserContext);
    const { id } = useParams();
    const [displayTitle, setDisplayTitle] = useState('timeline');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [followedUsers,setFollowedUsers] = useState([]);
    const [followed,setFollowed] = useState(null);
    const headers = {
        'user-token': userData.token
    };
    useEffect(() => {
        getFollowedUsers();
        getLikedPosts();
        getUserPosts(id);
    }, [])
    useEffect(() => {
        isFollowed();
    }, [followedUsers])
    useEffect(() => {
        setDisplayTitle(`${posts[0].user.username}'s Posts`);
    }, [posts]);
    function getFollowedUsers(){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows`, {headers});
        request.then((response) => {setFollowedUsers(response.data.users);}).catch(e=>console.log(e));
    }

    function followUser(){
        if(!buttonDisabled){
            setFollowed(true);
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/follow`,{}, {headers});
            request.then(() => setButtonDisabled(false))
            request.catch(e=>{
                alert('Error, please refresh the page');
                setButtonDisabled(false);
            });
        }
    }
    function unfollowUser(){
        if(!buttonDisabled){
            setFollowed(false);
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/unfollow`,{}, {headers});
            request.then(() => setButtonDisabled(false))
            request.catch(e=>{
                alert('Error, please refresh the page');
                setButtonDisabled(false);
            });
        }
    }

    function isFollowed() {
        let state = false;
        followedUsers.forEach(user => {
            if (user.id == id) {
                state = true;
            }
        });
        setFollowed(state);
    }
    return (
        <Page >
            <header>
                <div>
                    <img src={posts[0].user.avatar} />
                    <h1 className="title">{displayTitle}</h1>
                </div>
                {followed === null ? ''
                    :
                    userData.id == id ? ''
                    :
                    followed ?
                    <FollowBtn color= 'red' onClick={() => {setButtonDisabled(true);unfollowUser()}}>
                        Unfollow
                    </FollowBtn>
                    :
                    <FollowBtn color='#1877F2' onClick={() => {setButtonDisabled(true);followUser()}}>
                        Follow
                    </FollowBtn>
                }
            </header>


            <Section>
                <PostsSection>
                    <PostBox />
                </PostsSection>
                <TrendingTopics />
            </Section>
        </Page>
    );
}

const Page = styled.div`
    color:#FFF;
    padding-top:100px;
    header{
        margin-bottom: 20px;
        display:flex;
        justify-content: space-between;
        align-items:center;
        img{
            height: 50px;
            width: 50px;
            border-radius: 50%;
            margin-right: 20px;
        }
        div{
            display:flex;
            align-items:center;
        }
        .title{
            font-size: 3vw;
            font-family: 'Oswald', sans-serif;
        }
    }
    @media (max-width: 600px){
        width: 100%;
        .title{
            font-size: 7vw;
            margin-left: 15px;
        }
    }
`;

const Section = styled.section`
    display:flex;
    @media (max-width: 600px){
        width: 100%;
    }
`;

const PostsSection = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 600px){
        width: 100%;
    }
`;

const FollowBtn = styled.button`
    background: ${props => props.color};
    padding: 5px 30px;
    border-radius:5px;
    text-align:center;
    font-size: 16px;
    color: #fff;
    font-family: 'Lato', sans-serif;
    cursor:pointer;
`