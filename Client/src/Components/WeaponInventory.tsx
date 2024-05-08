export default function WeaponInventory() {
    const str = "AK-47 | Aquamarine Revenge (Battle-Scarred)";
    const regex = str.match(/([^|]+)\|([^(]+)\((.*)\)/);
    let name = "", skin = "", type = "";
    if (regex == null) {
        name = str;
    } else {
        name = regex[1];
        skin = regex[2];
        type = regex[3];
    }


    const procentStyle = 80 > 0 ? "text-green-500" : "text-red-500";
    return (
        <div className=" h-72 p-5 rounded-lg border border-slate-600 bg-slate-800 flex flex-col items-center">
            <img alt='weapon' src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWNU6dNoxL3H94qm3Ffm_RE6amn2ctWXdlI2ZwqB-FG_w-7s0ZK-7cjLzyE37HI8pSGKrIDGOAI"
                className=" w-40" />
            <p className="text-lg text-stone-100 font-medium w-full">{name}</p>
            <p className="text-md text-stone-100 w-full">{skin}</p>
            <p className=" text-sm text-slate-300 w-full">{type}</p>
            <div className="flex w-full">
                <div className=" w-1/2 flex flex-col gap-1">
                    <div className="flex gap-1">
                        <p>7D:</p>
                        <p className={procentStyle}>80%</p>
                    </div>
                </div>

                <div className=" w-1/2 flex justify-end text-lg text-stone-100 font-bold">
                    $67.95
                </div>
            </div>
        </div>
    )
}