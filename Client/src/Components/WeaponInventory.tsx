import { priceStyle } from "../Helper/PercentStyleHelper";
import splitWeaponName from "../Helper/WeaponNameSplit";
import { WeaponTrendingModel } from "../Models/WeaponTrendingModel";

export default function WeaponInventory(model:WeaponTrendingModel) {
    const {name,type,skin}=splitWeaponName(model.name);
    const weekPrice= priceStyle(model.weekPrice,model.currentPrice);
    const monthPrice= priceStyle(model.monthPrice,model.currentPrice);
    return (
        <div className=" p-5 rounded-lg border border-slate-600 bg-slate-800 flex flex-col items-center">
            <img alt='weapon' src={`https://steamcommunity-a.akamaihd.net/economy/image/${model.iconUrl}`}
                className=" w-40" />
            <p className="text-lg text-stone-100 font-medium w-full">{name}</p>
            <p className="text-md text-stone-100 w-full">{skin}</p>
            <p className=" text-sm text-slate-300 w-full">{type}</p>
            <div className="flex flex-col w-full">
                <div className=" w-1/2 flex flex-col gap-1">
                    <div className="flex gap-1">
                        <p>7D:</p>
                        <p className={weekPrice.style}>{weekPrice.percent}%</p>
                    </div>
                </div>
                <div className=" w-1/2 flex flex-col gap-1">
                    <div className="flex gap-1">
                        <p>30D:</p>
                        <p className={monthPrice.style}>{monthPrice.percent}%</p>
                    </div>
                </div>

                <div className=" w-1/2 flex text-lg text-stone-100 font-bold">
                    ${model.currentPrice}
                </div>
            </div>
        </div>
    )
}