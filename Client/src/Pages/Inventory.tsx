import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import WeaponInventory from "../Components/WeaponInventory";
import { WeaponTrendingModel } from "../Models/WeaponTrendingModel";

export default function Inventory(){
    const weapons=Array(15).fill(0);
    const model: WeaponTrendingModel = {
            classId:null,
            iconUrl: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJR-M65moW0m_7zO6-fwj9TusZ3j-2T8dT22lW2-hBtZW3wcIOVJgZtaArWrlHvxei91Me06IOJlyVHZQVsTw",
            name: "AWP | Black Nile (Minimal Wear)",
            currentPrice: 9.38,
            weekPrice: -1.54,
            monthPrice: -5.54,

    }
    return(<div className="ml-10 mt-12">
        <div className="flex flex-col gap-2 mb-6">
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
                        <FontAwesomeIcon icon={faSteam}/>
                        <p className="ml-2">76561198970753428</p>
                    </Link>
                </div>
            </div>
            <div className=" flex flex-col flex-1">
                <div className="h-16 flex flex-row items-end gap-6 mb-20">
                    <div className="w-60 text-[14px]">
                        <label>Search </label>
                        <div className="rounded-md border-slate-700 border p-2">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input value="76561198970753428" placeholder="Insert Id..." className=" border-none bg-slate-900 ml-2 text-slate-100" />
                        </div>
                    </div>
                    <button className=" px-6 py-2 rounded-md border border-slate-600 bg-slate-600 flex justify-center">Fetch</button>
                </div>
                <div className="mr-10 inventory_wrapper">
                    {weapons.map(weapon=>(<WeaponInventory {...model}/>))}
                </div>
            </div>
            
        </div>
    </div>)
}