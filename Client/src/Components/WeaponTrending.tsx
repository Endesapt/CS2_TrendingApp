import { WeaponTrendingModel } from "../Models/WeaponTrendingModel";

export default function WeaponTrending(model:WeaponTrendingModel) {
    const imageUrl=`https://steamcommunity-a.akamaihd.net/economy/image/${model.iconUrl}`;
    const styleBase=" w-20 flex items-center ";
    const h24Class=styleBase+(model.price24H>0?"text-green-600":"text-red-600");
    const d7Class=styleBase+(model.price7D>0?"text-green-600":"text-red-600");
    const d30Class=styleBase+(model.price30D>0?"text-green-600":"text-red-600");
    const nameText = document.createElement("textarea");
    nameText.innerHTML = model.name;
    return (
        <div className="flex gap-2 p-2 h-20 mt-1 rounded-xl font-medium even:bg-slate-800 odd:bg-slate-800/60 w-fit">
            <div className=" w-14 flex items-center">{model.id}</div>
            <div className=" w-20  overflow-hidden"><img alt={nameText.value} src={imageUrl}/></div>
            <div className=" w-96 flex items-center font-normal text-white">{nameText.value}</div>
            <div className=" w-28 flex items-center text-white">${model.currentPrice}</div>
            <div className={h24Class}>{model.price24H}%</div>
            <div className={d7Class}>{model.price7D}%</div>
            <div className={d30Class}>{model.price30D}%</div>
        </div>
    )
}