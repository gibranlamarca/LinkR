import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TrendingTopics from './TrendingTopics';
import InputPostBoxSection from './InputPostBoxSection';
import PostBox from './PostBox';
import PostContext from '../contexts/PostContext';
import { useParams } from 'react-router';
export default function TimelineSection(props) {
    const { getPosts, getMyPosts, getHashtagPosts, setPosts, likedPosts, getLikedPosts,getFollowedUsers} = useContext(PostContext);
    const { title } = props;
    const { hashtag } = useParams();
    const [displayTitle, setDisplayTitle] = useState('timeline');
    const [showInput, setShowInput] = useState(false);
    useEffect(() => {
        getFollowedUsers();
        getLikedPosts();
        choosePosts();
    }, [title, hashtag,])

    function choosePosts() {
        
        if (title === 'timeline') {
            setDisplayTitle(title);
            setShowInput(true);
            getPosts();

        } else if (title === 'my posts') {
            setDisplayTitle(title);
            setShowInput(false);
            getMyPosts();

        } else if (title === 'my likes') {
            setDisplayTitle(title);
            setShowInput(false);
            setPosts(likedPosts);

        } else if (hashtag) {
            setDisplayTitle(`# ${hashtag}`);
            setShowInput(false);
            getHashtagPosts(hashtag);

        }
    }

    return (
        <Page >
                <header>
                    <h1 className="title">{displayTitle}</h1>
                </header>
            <Section>
                <PostsSection>
                    {showInput ? <InputPostBoxSection /> : ''}
                    <PostBox choosePosts={choosePosts}/>
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

