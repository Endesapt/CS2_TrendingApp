import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import WeaponInventory from "../Components/WeaponInventory";
import { WeaponTrendingModel } from "../Models/WeaponTrendingModel";
import { createRef, useState } from "react";

export default function Inventory() {
    const [weapons,setWeapons] = useState<Array<WeaponTrendingModel>>();
    const [allWeaponsCost,setCost]=useState(0);
    const idInputRef=createRef<HTMLInputElement>();
    function getInventory(){
        const id=idInputRef.current?.value;
        const url=new URL("getInventory",process.env.REACT_APP_API_URL!);
        url.searchParams.set("userId",id!);
        fetch(
            url
        ).then((response) => response.json())
        .then((data)=>{
            setWeapons(data);
            const sum=data.reduce((partialSum:number, a:{currentPrice:number}) => partialSum + a.currentPrice, 0);
            setCost(sum);
        });
        
    }
    return (<div className="ml-10 mt-12 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-200 ">Конан Дойл's Inventory </h1>
            <h2 className="text-xl text-slate-300 ">Track Конан Дойл's inventory and see their trade history. See the value of their inventory and their most expensive items.</h2>
        </div>
        <div className="flex w-full gap-6">
            <div className=" min-w-80 flex gap-4 h-32 rounded-lg bg-slate-800 border-slate-600 p-4 border">
                <img alt='your profile' src="https://avatars.akamai.steamstatic.com/24263dcade9dcd8fbd1ef5c6472b1377c7df7f36_full.jpg"
                    className="w-20 h-20 rounded-lg"
                />
                <div className="flex flex-col gap-1 h-20">
                    <p className="text-slate-300 text-2xl font-bold">Конан Дойл</p>
                    <Link to={"https://steamcommunity.com/profiles/76561198970753428"} className="text-slate-300 hover:text-slate-100 font-bold flex items-center">
                        <FontAwesomeIcon icon={faSteam} />
                        <p className="ml-2">76561198970753428</p>
                    </Link>
                </div>
            </div>
            <div className="h-16 flex flex-col">
                <div className="flex flex-row items-end gap-6">
                    <div className="w-60 text-[14px]">
                        <label>Search </label>
                        <div className="rounded-md border-slate-700 border p-2">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input ref={idInputRef} value="76561198970753428" placeholder="Insert Id..." className=" border-none bg-slate-900 ml-2 text-slate-100" />
                        </div>
                    </div>
                    <button onClick={()=>getInventory()} className=" px-6 py-2 rounded-md border border-slate-600 bg-slate-600 flex justify-center">Fetch</button>
                </div>
                <div>
                    {allWeaponsCost>0?<p className="text-xl text-slate-300 py-5">
                        Total weapons cost: {allWeaponsCost}$
                    </p>:null}
                </div>
            </div>
           
        </div>
        <div className="mr-10 inventory_wrapper">
            {weapons?weapons.map(weapon => (<WeaponInventory {...weapon} />)):null}
        </div>
    </div>)
}