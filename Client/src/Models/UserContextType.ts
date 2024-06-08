export type UserContextType={
    isAuthenticated:boolean;
    parsedUserInfo:boolean;
    userId:number|null;
    userName:string|null;
    imageHash:string|null;
    login:()=>Promise<void>;
    logout:()=>Promise<void>;
    parseUserInfo:()=>Promise<void>;
}