import React,{createContext,useState} from 'react';
const UserContext = createContext();
export default UserContext;

export function UserContextProvider(props){
    const loginStruct = {
        email:"",
        password:""
    };
    const signUpStruct = {
        email:"",
        password:"",
        username:"",
        pictureUrl:""
    };
    const userDataStruct = { 
        avatar: localStorage.getItem('avatar'),
        email: localStorage.getItem('email'),
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username')
    };
    const inputStruct = {
        link: '',
        text:''
    }
    function logOut(){
        localStorage.removeItem('userData');
        setLogIn(loginStruct);
        setSignUp(signUpStruct);
        setUserData(userDataStruct);
        localStorage.removeItem('avatar');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
    const [logIn,setLogIn] = useState(loginStruct);
    const [signUp,setSignUp] = useState(signUpStruct);
    const [userData,setUserData] = useState(userDataStruct);
    const [inputPost, setInputPost] = useState(inputStruct);
    return(
        <UserContext.Provider value={{setLogIn,setSignUp,logIn,signUp,setUserData,userData,inputPost,setInputPost,logOut}}>
            {props.children}
        </UserContext.Provider>
    );
}

