export type UserContextType={
    isAuthorized:boolean;
    parsedUserInfo:boolean;
    userId:number|null;
    username:string|null;
    userImageHash:string|null;
    login:()=>void;
    logout:()=>void;
    parseUserInfo:()=>void;
}