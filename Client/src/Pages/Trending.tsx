import { faDollarSign, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WeaponTrending from "../Components/WeaponTrending";
import { WeaponTrendingModel } from "../Models/WeaponTrendingModel";

export default function Trending() {
    const model: WeaponTrendingModel = {
        id: 1,
        iconUrl:"-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXA6Q1NL4kmrAlOA0_FVPCi2t_fUkRxNztUoreaOBM27OXJYzRD4si82tOOw6KkN76Ak2kCsZ0g3uuV99ql0Vbg_0JuZWj7J4PDcwVoMg3S-1mggbC4dTOfvUs",
        name:"&#39Blueberries&#39 Buckshot | NSWC SEAL",
        currentPrice:9.38,
        price24H:0.03,
        price30D:-1.54,
        price7D:-5.54

    }
    return (
        <div className=" mt-4 ml-10 ">
            <p className=' text-4xl font-bold dark:text-slate-300 text-muted-800'>CS2 Weapon Trending</p>
            <div className="flex mt-20 text-[14px] gap-4">
                <div className="w-60 ">
                    <label>Search </label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input placeholder="Start typing..." className=" border-none bg-slate-900 ml-2 text-slate-100" />
                    </div>
                </div>
                <div className="">
                    <label>From </label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faDollarSign} />
                        <input value="0" placeholder="" className=" w-20 border-none bg-slate-900 ml-2 text-slate-100 focus-visible:border-none" />
                    </div>
                </div>
                <div className="">
                    <label>To </label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faDollarSign} />
                        <input value="10000" placeholder="" className=" border-none bg-slate-900 ml-2 text-slate-100 focus-visible:border-none" />
                    </div>
                </div>

            </div>
            
            <div id="trendings" className="mt-12 w-fit">
                <div className="flex gap-2 p-2  bg-transparent ">
                    <div className=" w-14">#</div>
                    <div className=" w-20">Image</div>
                    <div className=" w-96">Name</div>
                    <div className=" w-28">Steam Price</div>
                    <div className=" w-20">24H</div>
                    <div className=" w-20">7D</div>
                    <div className=" w-20">30D</div>
                </div>
                {Array(15).fill(0).map((el) => (
                    <WeaponTrending {...model} />
                ))}
            </div>
        </div>
    )
}