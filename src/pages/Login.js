import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
export default function Login() {
    const history = useHistory();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { setLogIn, setSignUp, logIn, signUp,setUserData } = useContext(UserContext);
    const [signUpState, setSignUpState] = useState(false);
    function submitForm(event) {
        event.preventDefault();
        if (signUpState) {
            trySignUp();
        } else tryLogin();
    }
    function tryLogin() {
        if (buttonDisabled) return;
        const cont = validateForm(logIn);
        if (cont === 0) {
            setButtonDisabled(true);
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_in', logIn);

            request.then((response) => {
                const userData = {...response.data.user,'token':response.data.token};
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('avatar',response.data.user.avatar);
                localStorage.setItem('username',response.data.user.username);
                localStorage.setItem('id',response.data.user.id);
                localStorage.setItem('email',response.data.user.email);
                setUserData(userData);
                history.push('/timeline');
            });
            request.catch((error) => {
                alert('E-mail/senha inválidos')
                setButtonDisabled(false);
            });
        }
    }
    function trySignUp() {
        const cont = validateForm(signUp);
        if (buttonDisabled) return;
        if (cont === 0) {
            setButtonDisabled(true);
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up', signUp);

            request.then((response) => {
                alert('Usuário cadastrado!');
                setSignUpState(false);
                setButtonDisabled(false);
            });
            request.catch((error) => {
                alert('Erro ao cadastrar! Verifique os campos!')
                setButtonDisabled(false);
            });
        }
    }
    function validateForm(obj){
        let cont = 0;
        const entries = Object.entries(obj);
        entries.forEach(entrie => {
            if(entrie[1] === ""){
                cont ++;
                alert(`Preencha o campo ${entrie[0]}`);
            }
        });
        return cont;
    }
    return (
        <Page>
            <TitleContainer>
                <div>
                    <h1>linkr</h1>
                    <p>save, share and discover<br /> the best links on the web</p>
                </div>
            </TitleContainer>
            <Aside>
                <form onSubmit={(event) => submitForm(event)}>
                    {
                        signUpState ?
                            <Form>
                                <input type="email" placeholder="e-mail" value={signUp.email} onChange={e => setSignUp({ ...signUp, 'email': e.target.value })} />
                                <input type="password" placeholder="password" value={signUp.password}onChange={e => setSignUp({ ...signUp, 'password': e.target.value })} />
                                <input type="text" placeholder="username" value={signUp.username}onChange={e => setSignUp({ ...signUp, 'username': e.target.value })} />
                                <input type="url" placeholder="picture url" value={signUp.pictureUrl}onChange={e => setSignUp({ ...signUp, 'pictureUrl': e.target.value })} />
                                <button type="submit">Sign Up</button>
                            </Form>
                            :
                            <Form>
                                <input type="email" placeholder="e-mail" value={logIn.email}onChange={e => setLogIn({ ...logIn, 'email': e.target.value })} />
                                <input type="password" placeholder="password" value={logIn.password}onChange={e => setLogIn({ ...logIn, 'password': e.target.value })} />
                                <button type="submit">Log In</button>
                            </Form>
                    }
                </form>
                <span onClick={() => { setSignUpState(!signUpState) }}>
                    {signUpState ? 'Switch back to log in' : 'First time? Create an account!'}
                </span>
            </Aside>
        </Page>
    );
}

const Page = styled.div`
    width: 100%;
    display:flex;
    height: 100vh;

    @media(max-width:600px){
        flex-direction:column;
        align-items: center;
    }
`

const TitleContainer = styled.div`
    background:#151515;
    width: 62%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    color: #fff;
    h1{
        font-size: 7vw;
        margin-bottom:25px;
        font-family: 'Passion One', cursive;
    }
    p{
        font-size: 2vw;
        line-height: 45px;
    }
    @media (max-width: 600px){
        width: 100%;
        text-align: center;
        h1{
            font-size: 15vw;
            margin-bottom: 0px;
        }
        p{
            font-size: 5vw;
            line-height: 30px;
            margin-bottom: 25px;
        }
    }
`
const Aside = styled.div`
    background: #333;
    width: 38%;
    color: #FFF;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    span{
        border-bottom-width: 1px;
        border-bottom-style: solid;
        cursor: pointer;
        color: #FFF;
        font-size: 1vw;
        font-family:'Lato', sans-serif;
        letter-spacing: 1.2px;
    }
    @media (max-width: 600px){
        width: 100vw;
        span{
            font-size: 3.5vw;
        }
    }
`
const Form = styled.div`
    width: 90%;
    display: flex;
    flex-direction:column;
    
    input{
        border-radius: 5px;
        margin-bottom:10px;
        height: 50px;
        padding: 0 15px;
        font-size: 1.5vw;
        font-family:inherit;
    }
    input::placeholder{
        color: rgba(159,159,159,0.8);
        font-weight: lighter;
    }
    button{
        font-size: 1.5vw;
        border-radius: 5px;
        background: #1877F2;
        height: 50px;
        color:#FFF;
        font-family:inherit;
        margin-bottom: 20px;
    }
    @media (max-width: 600px){
        width: 90vw;
        margin-top: 35px;
        input{
            font-size: 5vw;
        }
        button{
            font-size: 5vw;
        }
    }
`