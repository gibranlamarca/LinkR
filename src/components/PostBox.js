import React, { useContext,useEffect } from 'react'
import styled from 'styled-components';
import PostContext from '../contexts/PostContext';
import {Link} from 'react-router-dom';
import ReactHashtag from "react-hashtag";
import { useHistory } from 'react-router-dom';
import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io";
import axios from 'axios';
export default function PostBox() {
    const { posts,likedPosts,like,dislike,setPosts } = useContext(PostContext);
    const history = useHistory();
    function goToHashtag(val){
        val = val.slice(1);
        history.push(`/hashtag/${val}`)
    }
    function liked(id){
        let isLiked = false;
        likedPosts.forEach(post => {
            if(post.id === id){
                isLiked = true;
            }
        });
        return isLiked;
    }
    if(posts === null){
        return <Post><h1>Loading posts...</h1></Post>
    } else if(posts.length === 0){
        return <Post><h1>No posts found</h1></Post>
    }
    return (
        <>
            {posts.map((post) => {
                return(
                <Post key={post.id} heart={liked(post.id) ? 'red':'blue'}>
                    <LeftBox>
                        <Link to={`/user/${post.user.id}`}><img src={post.user.avatar} /></Link>
                        <div className='likeContainer'>
                            {liked(post.id) ? <IoIosHeart className='liked' onClick={() => dislike(post.id)}/> : <IoIosHeartEmpty onClick={() => like(post.id)}/>}
                            <p>{post.likes.length}</p>
                        </div>
                    </LeftBox>
                    <RightBox>
                    <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>
                       <p><ReactHashtag onHashtagClick={val => goToHashtag(val)}>{post.text}</ReactHashtag></p>
                        <ImgBox ImgBox onClick={() => window.open(post.link, '_blank')}>
                            <div className='descriptionContainer'>
                                <p className="titleLink">{post.linkTitle}</p>
                                <p className="small grey">{post.linkDescription}</p>
                                <p className="small">{post.link}</p>
                            </div>
                            <div className='imgContainer'>
                                <img src={post.linkImage} />
                            </div>
                        </ImgBox>
                    </RightBox>
                </Post>
                )
            })}
        </>
    )
}


const Post = styled.div`
    margin-bottom:20px;
    display: flex;
    background: #151515;
    border-radius: 16px;
    width: 40vw;
    @media (max-width: 600px){
        width: 100%;
        border-radius: 0px;
    }
    h1{
        padding:20px;
    }
`;
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
    .likeContainer{
        margin-top:20px;
        text-align:center;
        font-size: 26px;
        p{
            font-size: 16px;
            font-weight: normal;
            font-family: 'Lato';
        }
        .liked{
            color:red;
        }
    }
`;
const RightBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 15px 15px 0px;
    width: 100%;
    padding-top: 15px;
    a{
        color: white;
        font-size: 15px;
        font-family: Lato;
        font-weight: 300;
    }
    p{
        color: #B7B7B7;
        margin-top: 5px;
        font-family: Lato;
    }
    span{
        font-weight:bold;
        color:#FFF;
        cursor:pointer;
    }
`;
const ImgBox = styled.div`
    border-radius: 11px;
    border: 1px solid grey;
    font-family: Lato;
    padding-left: 15px;
    margin-top: 10px;
    display: flex;
    justify-content:space-between;
    overflow-wrap: anywhere;
    cursor: pointer;
    .small{
        font-size: 11px;
    }
    .grey{
        color: #9B9595;
    }
    .titleLink{
        color: #CECECE;
        font-size: 16px;
    }
  
    .descriptionContainer{
        width:60%;
        padding-top: 15px;
        padding-bottom: 15px;
        margin-right: 10px;
    }
    .imgContainer{
        display:flex;
        align-items:center;
        height:100%;
        width:40%;
        border-top-right-radius:11px;
        border-bottom-right-radius:11px;
        overflow:hidden;
    }
    img{
        width:100%;
        
    }
    p{
        margin: 10px 0px;
    }
`;