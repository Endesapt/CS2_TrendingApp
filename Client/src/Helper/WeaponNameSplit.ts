export default function splitWeaponName(str:string):{name:string,skin:string,type:string}{
    if(str==null)return {name:"",skin:"",type:""}
    const regex = str.match(/([^|]+)\|([^(]+)\((.*)\)/);
    let name = "", skin = "", type = "";
    if (regex == null) {
        name = str;
    } else {
        name = regex[1];
        skin = regex[2];
        type = regex[3];
    }
    return {name,skin,type};
}