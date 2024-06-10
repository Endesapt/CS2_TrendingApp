import { faAnglesLeft, faAnglesRight, faDollarSign, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WeaponTrending from "../Components/WeaponTrending";
import { WeaponTrendingModel } from "../Models/WeaponTrendingModel";
import { useEffect, useState } from "react";

export default function Trending() {
    const [weapons,setWeapons]=useState(new Array<WeaponTrendingModel>(0));
    const [from,setFrom]=useState(0);
    const [to,setTo]=useState(10000);
    const [page,setPage]=useState(1);

    useEffect(()=> {
        const url = new URL("getWeapons",process.env.REACT_APP_API_URL!);
        url.searchParams.set("from",from.toString());
        url.searchParams.set("to",to.toString());
        url.searchParams.set("page",page.toString());
        fetch(
            url
        ).then((response) => {
            if(response.status==200){
                return response.json()
            }else{
                setPage(1);
            }
        })
        .then((data)=>{
            setWeapons(data.weapons);
        });
    },[from,to,page])
    return (
        <div className=" mt-4 ml-10 ">
            <p className=' text-4xl font-bold dark:text-slate-300 text-muted-800'>CS2 Weapon Trending</p>
            <div className="flex mt-20 text-[14px] gap-4">
                <div className="w-60 ">
                    <label>Search </label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input  placeholder="Start typing..." className=" border-none bg-slate-900 ml-2 text-slate-100" />
                    </div>
                </div>
                <div className="">
                    <label>From </label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faDollarSign} />
                        <input onChange={(e)=>{setPage(1);setFrom(parseFloat(e.currentTarget.value))}} type="number" value={from} placeholder="" className=" w-20 border-none bg-slate-900 ml-2 text-slate-100 focus-visible:border-none" />
                    </div>
                </div>
                <div className="">
                    <label>To </label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faDollarSign} />
                        <input onChange={(e)=>{setPage(1);setTo(parseFloat(e.currentTarget.value))}} type="number" value={to} placeholder="" className=" border-none bg-slate-900 ml-2 text-slate-100 focus-visible:border-none" />
                    </div>
                </div>

            </div>
            
            <div id="trendings" className="mt-12 w-fit">
                <div className="flex gap-2 p-2  bg-transparent ">
                    <div className=" w-14">#</div>
                    <div className=" w-20">Image</div>
                    <div className=" w-96">Name</div>
                    <div className=" w-28">Steam Price</div>
                    <div className=" w-20">7D</div>
                    <div className=" w-20">30D</div>
                </div>
                {weapons.map((el) => (
                    <WeaponTrending {...el} />
                ))}
            </div>
            <div className=" flex items-center justify-between rounded-lg bg-slate-800 border-slate-600 p-4  my-6 border">
                <div onClick={()=>setPage(page=>page>1?page-1:1)} className=' flex justify-center items-center flex-col p-4  rounded-md hover:bg-slate-700 hover:text-stone-100 text-sm ease-linear duration-200'>
                    <FontAwesomeIcon icon={faAnglesLeft} size="lg" />
                </div>
                <div className="text-lg">Page : {page}</div>
                <div onClick={()=>setPage(page=>page+1)} className=' flex justify-center items-center flex-col p-4  rounded-md hover:bg-slate-700 hover:text-stone-100 text-sm ease-linear duration-200'>
                    <FontAwesomeIcon icon={faAnglesRight} size="lg" />
                </div>
            </div>
        </div>
    )
}