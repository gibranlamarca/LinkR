import React, { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import PostContext from "../contexts/PostContext";

export default function EditPost({
    post,
    userToken,
    currentId,
}) {
    const {posts,setPosts} = useContext(PostContext);
    const [newTitle, setNewTitle] = useState(post.text);
    const [isLoading, setIsLoading] = useState(false);

    const textAreaRef = useRef(null);

    useEffect(() => {
        if(post.isEdit) {
            textAreaRef.current.focus();
        }
    }, [post.isEdit]);
    function refresh(){
        post.text=newTitle;
        setIsLoading(false);
        post.isEdit = false;
        setPosts([...posts]);
    }
    function errorHandle(error) {
        console.error(error);
        console.log(currentId);
        console.log(userToken);
        alert("Não foi possível editar o post!");
        setIsLoading(false);
    }
    function updatePostTitle(e) {
        if (e.keyCode === 27) {
            setNewTitle(post.text);
            post.isEdit = false;
            setPosts([...posts]);
            return;
        }
        if (e.keyCode === 13) {
            setIsLoading(true);
            const req = axios.put(
                `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${currentId}`,
                { text: newTitle },
                { headers: { "user-token": userToken } }
            )
            .then(refresh)
            .catch(errorHandle)
        }
    };

    return (
        <EditTextArea
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            ref={textAreaRef}
            onKeyDown={updatePostTitle}
            disabled={isLoading}
        />
    );
}

const EditTextArea = styled.textarea`
  outline: none;
  border: none;
  border-radius: 5px;
  resize: none;
`;