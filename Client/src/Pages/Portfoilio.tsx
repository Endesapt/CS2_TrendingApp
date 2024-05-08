
import { WeaponProfileModel } from "../Models/WeaponProfileModel";
import WeaponPortfolio from "../Components/WeaponPortfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Portfolio() {
    const model: WeaponProfileModel = {
        id: 1,
        iconUrl: "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJR-M65moW0m_7zO6-fwj9TusZ3j-2T8dT22lW2-hBtZW3wcIOVJgZtaArWrlHvxei91Me06IOJlyVHZQVsTw",
        name: "AWP | Black Nile (Minimal Wear)",
        currentPrice: 9.38,
        price24H: 0.03,
        price30D: -1.54,
        price7D: -5.54,
        maxPrice: 10.05,
        minPrice: 5.45

    }
    const procentStyle = 80 > 0 ? "text-green-500" : "text-red-500";
    return (<div className=" mt-12 ml-10 flex flex-col gap-12">
        <h1 className=' text-4xl font-bold dark:text-slate-300 text-muted-800'>Конан Дойл's Portfolio</h1>
        <p className=" text-2xl font-bold dark:text-slate-300 text-muted-800 "> Add new event to your portfolio</p>
        <div className="rounded-lg border border-slate-600 bg-slate-800 w-fit p-8 flex flex-col gap-5">
            <div className=" h-80 p-5 rounded-lg border border-slate-600 bg-slate-800 flex flex-col items-center">
                <img alt='weapon' src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWNU6dNoxL3H94qm3Ffm_RE6amn2ctWXdlI2ZwqB-FG_w-7s0ZK-7cjLzyE37HI8pSGKrIDGOAI"
                    className=" w-40" />
                <p className="text-lg text-stone-100 font-medium w-full">AK-47</p>
                <p className="text-md text-stone-100 w-full">Aquamarine Revenge</p>
                <p className=" text-sm text-slate-300 w-full">Battle-Scarred</p>
                <div className="flex w-full">
                    <div className=" w-1/2 flex flex-col gap-1">
                        <div className="flex gap-1">
                            <p>24H:</p>
                            <p className={procentStyle}>5.56%</p>
                        </div>
                        <div className="flex gap-1">
                            <p>7D:</p>
                            <p className={procentStyle}>80.45%</p>
                        </div>
                        <div className="flex gap-1">
                            <p>30D:</p>
                            <p className={procentStyle}>50.14%</p>
                        </div>
                    </div>
                    <div className=" w-1/2 flex justify-end text-lg text-stone-100 font-bold">
                        $67.95
                    </div>
                </div>
            </div>
            <div className=" w-96 ">
                <label>Search </label>
                <div className="rounded-md border-slate-700 border p-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input placeholder="e.g AK-47 | Redline (Field-Tested)" className=" border-none bg-transparent ml-2 text-slate-100 w-80" />
                </div>
            </div>
            <div className="flex gap-2 items-end">
                <div className="">
                    <label>Min Price </label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faDollarSign} />
                        <input value="0" placeholder="" className=" w-20 border-none bg-transparent ml-2 text-slate-100 focus-visible:border-none" />
                    </div>
                </div>
                <div className="">
                    <label>Max Price</label>
                    <div className="rounded-md border-slate-700 border p-2">
                        <FontAwesomeIcon icon={faDollarSign} />
                        <input value="10000" placeholder="" className=" w-20 border-none bg-transparent ml-2 text-slate-100 focus-visible:border-none" />
                    </div>
                </div>
                <button className=" px-8 py-2  flex items-center justify-center rounded-lg bg-[#14b8a6] hover:bg-[#14b8a633] duration-150 ease-linear"> Create </button>
            </div>

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
                <div className=" w-20">24H</div>
                <div className=" w-20">7D</div>
                <div className=" w-20">30D</div>
            </div>
            {Array(15).fill(0).map((el) => (
                <WeaponPortfolio {...model} />
            ))
            }
        </div>
    </div>)
}