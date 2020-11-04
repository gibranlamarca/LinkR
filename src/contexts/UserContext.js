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
        avatar:"https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F013%2F564%2Fdoge.jpg",
        email: "herick@linkr.com",
        id: '49',
        token: "34d11bbf-f9e9-4934-9b21-ccaada2a1536",
        username: "HerickM"
    };
    
    const inputStruct = {
        link: '',
        text:''
    }
    function logOut(){
        setLogIn(loginStruct);
        setSignUp(signUpStruct);
        setUserData(userDataStruct);
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

