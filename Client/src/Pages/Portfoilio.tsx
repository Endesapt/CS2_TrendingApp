
import { WeaponProfileModel } from "../Models/WeaponProfileModel";
import WeaponPortfolio from "../Components/WeaponPortfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { WeaponTrendingModel } from "../Models/WeaponTrendingModel";
import WeaponInventory from "../Components/WeaponInventory";
import { UserContextType } from "../Models/UserContextType";
import { UserContext } from "../Provider/UserProvider";

export default function Portfolio() {
    const userContext=useContext(UserContext) as UserContextType;
    const [searchResults,setSearchResults]=useState(new Array<{resultString:string;resultId:string}>(0));
    const [profileWeapons,setProfileWeapons]=useState(new Array<WeaponProfileModel>(0));
    const [search,setSearch]=useState("");
    const [modelWeapon,setModelWeapon]=useState({} as WeaponTrendingModel);
    const [warning,setWarning]=useState("");
    const minPrice=createRef<HTMLInputElement>();
    const maxPrice=createRef<HTMLInputElement>();
    
    useEffect(()=> {
        if(!userContext.isAuthenticated)return;
        const queriesUrl = new URL("getQueries",process.env.REACT_APP_API_URL!);
        fetch(
            queriesUrl
        ).then((response) => response.json())
        .then((data)=>{
            setProfileWeapons(data);
        });
    },[userContext])
    useEffect(()=>{
        if(search=="")return;
        const searchUrl=new URL("findWeapons",process.env.REACT_APP_API_URL!);
        searchUrl.searchParams.set("searchString",search);
        fetch(searchUrl)
        .then((response)=>response.json())
        .then((data)=>{
            setSearchResults(data);
        })
    },[search])
    function fetchWeapon(weaponId:string){
        const weaponUrl=new URL("getWeaponById",process.env.REACT_APP_API_URL!);
        weaponUrl.searchParams.set("id",weaponId);
        fetch(weaponUrl)
        .then((response)=>response.json())
        .then((data)=>{
            setSearch("")
            setSearchResults([])
            setModelWeapon(data)
            
        })
    }
    function createEvent(){
        if(!modelWeapon)return;
        if(parseFloat(minPrice.current?.value!)>modelWeapon.currentPrice){
            setWarning("Min Price must be smaller then current!!!");
            return;
        }
        if(parseFloat(maxPrice.current?.value!)<modelWeapon.currentPrice){
            setWarning("Max Price must be bigger then current!!!");
            return;
        }
        const addEventUrl=new URL("addQuery",process.env.REACT_APP_API_URL!);
        fetch(addEventUrl,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:JSON.stringify({
                weaponClassId:modelWeapon.classId,
                minPrice:parseFloat(minPrice.current?.value!),
                maxPrice:parseFloat(maxPrice.current?.value!),
            })
        })
        .then(response=>response.json())
        .then((data:WeaponProfileModel)=>{
            setProfileWeapons((weapons)=>{
                return [...weapons,data]
            })
            setModelWeapon({} as WeaponTrendingModel);
        })
    }

    if(!userContext.isAuthenticated){
        return <div className="ml-10 mt-12 flex flex-col gap-6">
            <div className="text-3xl font-bold text-slate-200"> You should sign in with Steam to see your inventory</div>
        </div>
    }
    return (<div className=" mt-12 ml-10 flex flex-col gap-12">
        <h1 className=' text-4xl font-bold dark:text-slate-300 text-muted-800'>{userContext.userName}'s Portfolio</h1>
        <p className=" text-2xl font-bold dark:text-slate-300 text-muted-800 "> Add new event to your portfolio</p>
        <div className="rounded-lg border border-slate-600 bg-slate-800 w-fit p-8 flex flex-col gap-5">
            {modelWeapon.classId?
                <WeaponInventory {...modelWeapon}/>:null
            }
            <div className=" w-96 ">
                <label>Search </label>
                <div className=" relative rounded-md border-slate-700 border p-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input onChange={(e)=>setSearch(e.currentTarget.value)} value={search}  placeholder="e.g AK-47 | Redline (Field-Tested)" className=" border-none bg-transparent ml-2 text-slate-100 w-80" />
                    {searchResults.length>0?
                    <div className=" absolute top-10 left-5 rounded-lg bg-slate-700 p-2">
                        {searchResults.map(el=><div onClick={()=>fetchWeapon(el.resultId)} className="p-2 hover:cursor-pointer">
                            {el.resultString}
                            </div>)}
                    </div>:null
                    }
                </div>
            </div>
            <div className="flex gap-2 items-end">
                <div className="">
                    <label>Min Price </label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faDollarSign} />
                        <input ref={minPrice} defaultValue="0" type="number"  placeholder="" className=" w-20 border-none bg-transparent ml-2 text-slate-100 focus-visible:border-none" />
                    </div>
                </div>
                <div className="">
                    <label>Max Price</label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faDollarSign} />
                        <input ref={maxPrice} defaultValue="10000" type="number" placeholder="" className=" w-20 border-none bg-transparent ml-2 text-slate-100 focus-visible:border-none" />
                    </div>
                </div>
                <button onClick={()=>createEvent()} className=" px-8 py-2  flex items-center justify-center rounded-lg bg-[#14b8a6] hover:bg-[#14b8a633] duration-150 ease-linear"> Create </button>
            </div>
            <div className="text-md text-red-500">{warning}</div>
        </div>
        <p className=" text-2xl font-bold dark:text-slate-300 text-muted-800 "> Your current events</p>
        <div id="events" className=" w-fit">
            <div className="flex gap-2 p-2  bg-transparent ">
                <div className=" w-14">#</div>
                <div className=" w-20">Image</div>
                <div className=" w-96">Name</div>
                <div className=" w-28">Steam Price</div>
                <div className=" w-28">Max Price</div>
                <div className=" w-28">Min Price</div>
                <div className=" w-20">7D</div>
                <div className=" w-20">30D</div>
            </div>
            {profileWeapons.map((el) => (
                <WeaponPortfolio model={el} setProfileWeapons={setProfileWeapons}/>
            ))
            }
            {profileWeapons.length==0? <div className="flex gap-2 p-2  bg-transparent ">
                <div className=" text-4xl font-bold dark:text-slate-300 text-muted-800"> You have no events yet! Add one using form above</div>
            </div>:null}
        </div>
    </div>)
}