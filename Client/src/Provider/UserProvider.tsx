import { createContext,ReactNode, useState } from "react";
import { UserContextType } from "../Models/UserContextType";
import axios from "axios";

class UserInfoModel{
    isAuthenticated:boolean;
    userId:number|null;
    userName:string|null;
    imageHash:string|null;
}

export const UserContext=createContext<UserContextType|null>(null);
function UserProvider({children}:{children:ReactNode}){
    const [userInfo,setUserInfo]=useState<UserInfoModel>();
    async function login(){
        const url=new URL('signin',process.env.REACT_APP_AUTH_URL);
        window.location.replace(url);
    }
    async function logout(){
        if(!userInfo?.isAuthenticated)return;
        const url=new URL('signout',process.env.REACT_APP_AUTH_URL);
        fetch(url,{
            method:'GET',
            headers:{'Content-Type':'application/json'},
            credentials:"include"
        }).then(()=>{
            setUserInfo({} as UserInfoModel);
        });
        
    }
    async function parseUserInfo(){
        if(userInfo?.isAuthenticated)return;
        const url=new URL('userInfo',process.env.REACT_APP_AUTH_URL);
        await fetch(url,{
            method:'GET',
            headers:{'Content-Type':'application/json'},
            credentials:"include"
          })
            .then(response=>{
                return response.json()
            }).then((data:UserInfoModel)=>{
                if(!data.isAuthenticated)return;
                setUserInfo(data);
            })
    }
    const props:UserContextType={
        isAuthenticated:userInfo?.isAuthenticated??false,
        parsedUserInfo:true,
        userId:userInfo?.userId??null,
        imageHash:userInfo?.imageHash??null,
        userName:userInfo?.userName??null,
        login:login,
        logout:logout,
        parseUserInfo:parseUserInfo
    }
    return (<UserContext.Provider value={{...props}}>
        {children}
    </UserContext.Provider>);
}
export default UserProvider;