import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TrendingTopics from './TrendingTopics';
import InputPostBoxSection from './InputPostBoxSection';
import PostBox from './PostBox';
import PostContext from '../contexts/PostContext';
import { useParams } from 'react-router';
import { DebounceInput } from 'react-debounce-input';
export default function TimelineSection(props) {
    const { getPosts, getMyPosts, getHashtagPosts, setPosts, likedPosts, getLikedPosts, getFollowedUsers,posts } = useContext(PostContext);
    const { title } = props;
    const { hashtag } = useParams();
    const [displayTitle, setDisplayTitle] = useState('timeline');
    const [showInput, setShowInput] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showSearchResult,setShowSearchResult] = useState(false);
    const { isFollowed } = useContext(PostContext);
    const [filteredUsers] = useState([]);
    useEffect(() => {
        getFollowedUsers();
        getLikedPosts();
        choosePosts();
    }, [title, hashtag,])
    useEffect(() => {
        const intID = setInterval(()=>{
            choosePosts();
        },5000);
        return (() => clearInterval(intID));
    }, [posts]);
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
            <InputContainer display={(!showSearchResult) ? 'none' : 'block'}>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    placeholder='Search for people and friends'
                    onChange={e => {
                        setSearchInput(e.target.value)
                    }}
                    onFocus={() => setShowSearchResult(true)}
                    onBlur={() => setTimeout(() => setShowSearchResult(false), 500)}
                    value={searchInput} />
                <ul>
                    {filteredUsers.length === 0 ?
                        <li>
                            No users found
                    </li>
                        :

                        filteredUsers.map(user =>
                            <li>
                                <Link to={`/user/${user.id}`}>
                                    <img src={user.avatar} />
                                    <div>{user.username}</div>
                                </Link>
                                {isFollowed(user.id) ? <div className='followed'>{` • following`}</div> : ''}
                            </li>
                        )
                    }
                </ul>
            </InputContainer>
            <header>
                <h1 className="title">{displayTitle}</h1>
            </header>
            <Section>
                <PostsSection>
                    {showInput ? <InputPostBoxSection /> : ''}
                    <PostBox choosePosts={choosePosts} />
                </PostsSection>
                <TrendingTopics />
            </Section>
        </Page>
    );
}

const Page = styled.div`
    color:#FFF;
    padding-top:100px;
    @media (max-width:600px){
        padding-top: 77px;
    }
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
            overflow-wrap: anywhere;
            @media (max-width: 600px){
                font-size: 6vw;
            }
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
const InputContainer = styled.div`
    display:none;
    flex-direction:column;
    position:relative;
    font-family: 'Lato',sans-serif;
    @media (max-width: 600px){
        display: flex!important;
    }
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
        margin: 0 auto 15px auto;
        &::placeholder{
            color: #C6C6C6;
        }
    }
    .followed{
        margin-left:5px;
        color: #C5C5C5;
    }
`