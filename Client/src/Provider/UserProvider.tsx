import { createContext,ReactNode, useState } from "react";
import { UserContextType } from "../Models/UserContextType";
import axios from "axios";

class UserInfoModel{
    isAuthorized:boolean;
    userId:number|null;
    userName:string|null;
    userImageHash:string|null;
}

export const UserContext=createContext<UserContextType|null>(null);
function UserProvider({children}:{children:ReactNode}){
    const [userInfo,setUserInfo]=useState<UserInfoModel>();
    function login(){
        const url=new URL('signin',process.env.REACT_APP_AUTH_URL);
        window.location.replace(url);
    }
    function logout(){}
    function parseUserInfo(){
        if(userInfo?.isAuthorized)return;
        const url=new URL('userInfo',process.env.REACT_APP_AUTH_URL);
        axios.get(url.toString())
            .then(response=>{
                const data:UserInfoModel=response.data
                console.log(data);
                if(!data.isAuthorized)return;
                setUserInfo(response.data);
            })
    }
    const props:UserContextType={
        isAuthorized:false,
        parsedUserInfo:false,
        userId:null,
        userImageHash:null,
        username:null,
        login:login,
        logout:logout,
        parseUserInfo:parseUserInfo
    }
    return (<UserContext.Provider value={{...props}}>
        {children}
    </UserContext.Provider>);
}
export default UserProvider;