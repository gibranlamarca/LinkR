import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function EditPost({
    text,
    setPostText,
    isEdit,
    setIsEdit,
    userToken,
    currentId,
}) {
    const [newTitle, setNewTitle] = useState(text);
    const [isLoading, setIsLoading] = useState(false);

    const textAreaRef = useRef(null);

    useEffect(() => {
        if(isEdit) {
            textAreaRef.current.focus();
        }
    }, [isEdit]);
    function refresh(){
        setPostText(newTitle);
        setIsLoading(false);
        setIsEdit(!isEdit)
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
            setNewTitle(text);
            setIsEdit(false);
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