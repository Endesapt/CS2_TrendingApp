export function priceStyle(prev:number,curr:number):{percent:string,style:string}{
    let ret=" w-20 flex items-center ";
    let percent=(prev-curr)/curr*100;
    if(percent>0){
        ret+="text-green-600";
    }else if(percent==0 || percent==-100){
        percent=0;
        ret+="text-slate-600";
    }
    else{
        ret+="text-red-600";
    }
    return {
        percent:percent.toLocaleString('en-US', {
            maximumFractionDigits:2,
            useGrouping: false
          }),
        style:ret
    }
}