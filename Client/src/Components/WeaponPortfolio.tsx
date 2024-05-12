import { priceStyle } from "../Helper/PercentStyleHelper";
import{WeaponProfileModel} from "../Models/WeaponProfileModel"
export default function WeaponPortfolio(model:WeaponProfileModel) {
    const imageUrl=`https://steamcommunity-a.akamaihd.net/economy/image/${model.weapon.iconUrl}`;
    const weekPrice= priceStyle(model.weapon.weekPrice,model.weapon.currentPrice);
    const monthPrice= priceStyle(model.weapon.monthPrice,model.weapon.currentPrice);
    const nameText = document.createElement("textarea");
    nameText.innerHTML = model.weapon.name;
    return (
        <div className="flex gap-2 p-2 h-20 mt-1 rounded-xl font-medium even:bg-slate-800 odd:bg-slate-800/60 w-fit">
            <div className=" w-14 flex items-center"></div>
            <div className=" w-20  overflow-hidden"><img alt="lol" className="" src={imageUrl}/></div>
            <div className=" w-96 flex items-center font-normal text-white">{nameText.value}</div>
            <div className=" w-28 flex items-center text-white">${model.weapon.currentPrice}</div>
            <div className=" w-28 flex items-center text-white">${model.maxPrice}</div>
            <div className=" w-28 flex items-center text-white">${model.minPrice}</div>
            <div className={weekPrice.style}>{weekPrice.percent}%</div>
            <div className={monthPrice.style}>{monthPrice.percent}%</div>
            <div className="flex items-center">
                <button className="px-4 rounded-md h-8 bg-[#334155] hover:bg-slate-500 ease-in duration-150">Delete</button>
            </div>          
        </div>
    )
}