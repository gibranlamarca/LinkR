import React,{createContext,useState,useContext, useEffect} from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
const PostContext = createContext();
export default PostContext;

export function PostContextProvider(props){
    const [inputPost, setInputPost] = useState({'link':'','text':''});
    const [posts,setPosts] = useState(null);
    const { userData } = useContext(UserContext);
    const [timeline,setTimeline] = useState(true);
    const [likedPosts,setLikedPosts] = useState([]);
    const [followedUsers,setFollowedUsers] = useState([]);
    const headers = {
        'user-token': userData.token
    }
    function getFollowedUsers(){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows`, {headers});
        request.then((response) => {
            setFollowedUsers(response.data.users)
        });
        request.catch(e=>console.log(e));

    }
    function isFollowed(id) {
        let state = false;
        followedUsers.forEach(user => {
            if (user.id == id) {
                state = true;
            }
        });
        return state;
    }
    function getLikedPosts(){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/liked`, {headers});
        request.then((response) => setLikedPosts(response.data.posts)).catch(e=>alert('Erro ao buscar liked posts'));
    }
    function getPosts(){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts`, {headers});
        request.then((response) => setPosts(response.data.posts)).catch(e=>alert('Houve uma falha ao obter os posts, por favor atualize a página'));
    }
    function getMyPosts(){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userData.id}/posts`, {headers});
        request.then((response) => setPosts(response.data.posts)).catch(e=>alert('Houve uma falha ao obter os posts, por favor atualize a página'));
    }
    function getHashtagPosts(hashtag){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${hashtag}/posts`, {headers});
        request.then((response) => setPosts(response.data.posts)).catch(e=>alert('Houve uma falha ao obter os posts, por favor atualize a página'));
    }
    function like(post){
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/like`, {},{headers});
        request.then(() => {
            getLikedPosts();
            post.likes.push([]);
            setPosts([...posts]);
        }).catch(e=>console.log(e));
    }
    function dislike(post){
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${post.id}/dislike`,{}, {headers});
        request.then(() => {
            getLikedPosts();
            post.likes.pop();
            setPosts([...posts]);
        }).catch(e=>console.log(e));
    }
    return(
        <PostContext.Provider value={{inputPost,setInputPost,posts,setPosts,getPosts,timeline,setTimeline,getMyPosts,getHashtagPosts,likedPosts,like,dislike,getLikedPosts,getFollowedUsers,followedUsers,isFollowed}}>
            {props.children}
        </PostContext.Provider>
    );
}

