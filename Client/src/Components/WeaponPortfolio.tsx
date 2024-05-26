import { priceStyle } from "../Helper/PercentStyleHelper";
import { WeaponProfileModel } from "../Models/WeaponProfileModel"
type WeaponPortfolioProps = {
    model: WeaponProfileModel;
    setProfileWeapons: React.Dispatch<React.SetStateAction<WeaponProfileModel[]>>;
}
export default function WeaponPortfolio({ model, setProfileWeapons }: WeaponPortfolioProps) {
    const imageUrl = `https://steamcommunity-a.akamaihd.net/economy/image/${model.weapon.iconUrl}`;
    const weekPrice = priceStyle(model.weapon.weekPrice, model.weapon.currentPrice);
    const monthPrice = priceStyle(model.weapon.monthPrice, model.weapon.currentPrice);
    const nameText = document.createElement("textarea");
    nameText.innerHTML = model.weapon.name;
    function deleteWeapon() {
        const deleteEventUrl = new URL("deleteQuery", process.env.REACT_APP_API_URL!);
        deleteEventUrl.searchParams.set("queryId",model.id);
        fetch(deleteEventUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => {
                if(response.ok){
                    setProfileWeapons((weapons) => {
                        const index = weapons.findIndex((el) => el.id == model.id);
                        if (index == -1) return weapons;
                        weapons.splice(index, 1);
                        console.log(index);
                        return [...weapons];
                    })
                }
            })
    }
    return (
        <div className="flex gap-2 p-2 h-20 mt-1 rounded-xl font-medium even:bg-slate-800 odd:bg-slate-800/60 w-fit">
            <div className=" w-14 flex items-center"></div>
            <div className=" w-20  overflow-hidden"><img alt="lol" className="" src={imageUrl} /></div>
            <div className=" w-96 flex items-center font-normal text-white">{nameText.value}</div>
            <div className=" w-28 flex items-center text-white">${model.weapon.currentPrice}</div>
            <div className=" w-28 flex items-center text-white">${model.maxPrice}</div>
            <div className=" w-28 flex items-center text-white">${model.minPrice}</div>
            <div className={weekPrice.style}>{weekPrice.percent}%</div>
            <div className={monthPrice.style}>{monthPrice.percent}%</div>
            <div className="flex items-center">
                <button onClick={() => deleteWeapon()} className="px-4 rounded-md h-8 bg-[#334155] hover:bg-slate-500 ease-in duration-150">Delete</button>
            </div>
        </div>
    )
}