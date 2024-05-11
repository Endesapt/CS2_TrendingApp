import { priceStyle } from "../Helper/PercentStyleHelper";
import { WeaponTrendingModel } from "../Models/WeaponTrendingModel";

export default function WeaponTrending(model:WeaponTrendingModel) {
    const imageUrl=`https://steamcommunity-a.akamaihd.net/economy/image/${model.iconUrl}`;
    const weekPrice= priceStyle(model.weekPrice,model.currentPrice);
    const monthPrice= priceStyle(model.monthPrice,model.currentPrice);
    const nameText = document.createElement("textarea");
    nameText.innerHTML = model.name;
    return (
        <div className="flex gap-2 p-2 h-20 mt-1 rounded-xl font-medium even:bg-slate-800 odd:bg-slate-800/60 w-fit">
            <div className=" w-14 flex items-center">{model.id}</div>
            <div className=" w-20  overflow-hidden"><img alt={nameText.value} src={imageUrl}/></div>
            <div className=" w-96 flex items-center font-normal text-white">{nameText.value}</div>
            <div className=" w-28 flex items-center text-white">${model.currentPrice}</div>
            <div className={weekPrice.style}>{weekPrice.percent}%</div>
            <div className={monthPrice.style}>{monthPrice.percent}%</div>
        </div>
    )
}
