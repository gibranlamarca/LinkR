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

    const headers = {
        'user-token': userData.token
    }
    
    function getLikedPosts(){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/liked`, {headers});
        request.then((response) => setLikedPosts(response.data.posts)).catch(e=>alert('Erro ao buscar liked posts'));
    }
    function getPosts(){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=10`, {headers});
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
    function getUserPosts(id){
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/posts`, {headers});
        request.then((response) => setPosts(response.data.posts)).catch(e=>alert('Houve uma falha ao obter os posts, por favor atualize a página'));
    }
    function like(id){
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${id}/like`, {},{headers});
        request.then((response) => getLikedPosts()).catch(e=>console.log(e));
    }
    function dislike(id){
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${id}/dislike`,{}, {headers});
        request.then((response) => getLikedPosts()).catch(e=>console.log(e));
    }
    return(
        <PostContext.Provider value={{inputPost,setInputPost,posts,setPosts,getPosts,timeline,setTimeline,getMyPosts,getHashtagPosts,getUserPosts,likedPosts,like,dislike,getLikedPosts}}>
            {props.children}
        </PostContext.Provider>
    );
}

