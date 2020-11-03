import React, { useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import TrendingTopics from './TrendingTopics';
import InputPostBoxSection from './InputPostBoxSection';
import PostBox from './PostBox';
import PostContext from '../contexts/PostContext';
import { useParams } from 'react-router';
export default function TimelineSection(props) {
    const {getPosts,getMyPosts,getHashtagPosts,getUserPosts,posts,setPosts,likedPosts,getLikedPosts} = useContext(PostContext);
    const {title} = props;
    const {hashtag} = useParams();
    const {id} = useParams();
    const [displayTitle,setDisplayTitle] = useState('timeline');
    const [showInput,setShowInput] = useState(false);
    
    useEffect(() => {
        getLikedPosts();
        choosePosts();
    }, [title, hashtag, id])

    function choosePosts(){
        if(title === 'timeline'){
            setDisplayTitle(title);
            setShowInput(true);
            getPosts();
        } else if(title === 'my posts'){
            setDisplayTitle(title);
            setShowInput(false);
            getMyPosts();
        } else if(title === 'my likes'){
            setDisplayTitle(title);
            setShowInput(false);
            setPosts(likedPosts);
        } else if(hashtag){
            setDisplayTitle(`# ${hashtag}`);
            setShowInput(false);
            getHashtagPosts(hashtag);
        } else if(id){
            setShowInput(false);
            getUserPosts(id);
            setDisplayTitle(`${posts[0].user.username}'s Posts`);
        }
    }
    return (
        <Page>
            <h1 className="title">{displayTitle}</h1>
            <Section>
                <PostsSection>
                    {showInput ?  <InputPostBoxSection /> :''}
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
    .title{
        font-size: 3vw;
        font-family: 'Oswald', sans-serif;
        margin-bottom: 20px;
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