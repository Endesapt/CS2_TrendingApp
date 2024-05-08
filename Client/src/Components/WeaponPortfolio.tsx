import{WeaponProfileModel} from "../Models/WeaponProfileModel"
export default function WeaponPortfolio(model:WeaponProfileModel) {
    const imageUrl=`https://steamcommunity-a.akamaihd.net/economy/image/${model.iconUrl}`;
    const h24Class=" w-20 flex items-center "+(model.price24H>0?"text-green-600":"text-red-600");
    const d7Class=" w-20 flex items-center "+(model.price7D>0?"text-green-600":"text-red-600");
    const d30Class=" w-20 flex items-center "+(model.price30D>0?"text-green-600":"text-red-600");
    const nameText = document.createElement("textarea");
    nameText.innerHTML = model.name;
    return (
        <div className="flex gap-2 p-2 h-20 mt-1 rounded-xl font-medium even:bg-slate-800 odd:bg-slate-800/60 w-fit">
            <div className=" w-14 flex items-center">{model.id}</div>
            <div className=" w-20  overflow-hidden"><img alt="lol" className="" src={imageUrl}/></div>
            <div className=" w-96 flex items-center font-normal text-white">{nameText.value}</div>
            <div className=" w-28 flex items-center text-white">${model.currentPrice}</div>
            <div className=" w-28 flex items-center text-white">${model.maxPrice}</div>
            <div className=" w-28 flex items-center text-white">${model.minPrice}</div>
            <div className={h24Class}>{model.price24H}%</div>
            <div className={d7Class}>{model.price7D}%</div>
            <div className={d30Class}>{model.price30D}%</div>
            <div className="flex items-center">
                <button className="px-4 rounded-md h-8 bg-[#334155] hover:bg-slate-500 ease-in duration-150">Delete</button>
            </div>          
        </div>
    )
}