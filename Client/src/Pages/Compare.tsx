import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WeaponTrendingModel } from '../Models/WeaponTrendingModel';



export default function Compare() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState(new Array<{ resultString: string; resultId: string }>(0));
    const [data,setData]=useState(new Array(0));
    const [name,setName]=useState("weaponName");

    useEffect(() => {
        if (search == "") return;
        const searchUrl = new URL("findWeapons", process.env.REACT_APP_API_URL!);
        searchUrl.searchParams.set("searchString", search);
        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);
            })
    }, [search])
    function fetchPlot(weaponId:string,weaponName:string){
        const weaponUrl=new URL("getWeaponPriceHistory",process.env.REACT_APP_API_URL!);
        weaponUrl.searchParams.set("id",weaponId);
        fetch(weaponUrl)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setSearch("")
            setSearchResults([])
            setData(data.prices);
            setName(weaponName);
            
        })
    }
    return (<div className='mt-12 w-svw flex flex-col items-center px-20'>
        <div className="flex flex-col gap-2 mb-10 w-full">
            <h1 className="text-3xl font-bold text-slate-200 ">Comparison</h1>
            <h2 className="text-xl text-slate-300 ">Here you can search for price plot of any weapon you want</h2>
        </div>
        <ResponsiveContainer width="100%" height={500} className="m-10">
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 50,
                    left: 30,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priceTime" tickFormatter={timeStr => new Date(timeStr)
                    .toLocaleDateString("ru-RU",{
                        year:'numeric',
                        month:'2-digit',
                        day:'2-digit'
                    })} />
                <YAxis tickFormatter={(value) => `${value}$`} />
                <Tooltip  labelFormatter={t => new Date(t).toLocaleString()} />
                <Line type="monotone" dataKey="price" name={name} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
        <div className=" w-full rounded-lg border border-slate-600 bg-slate-800 w-fit p-8 flex flex-col gap-5">
                <div className=" w-96 ">
                    <label>Search </label>
                    <div className=" relative rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input onChange={(e) => setSearch(e.currentTarget.value)} value={search} placeholder="e.g AK-47 | Redline (Field-Tested)" className=" border-none bg-transparent ml-2 text-slate-100 w-80" />
                        {searchResults.length > 0 ?
                            <div className=" absolute top-10 left-5 rounded-lg bg-slate-700 p-2">
                                {searchResults.map(el => <div onClick={() =>fetchPlot(el.resultId,el.resultString)} className="p-2 hover:cursor-pointer">
                                    {el.resultString}
                                </div>)}
                            </div> : null
                        }
                    </div>
                </div>
            </div>
    </div>)
}