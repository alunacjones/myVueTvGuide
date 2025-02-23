import moment from "moment"

export function getDetails(id: string)
{
    return fetch(`https://api-2.tvguide.co.uk/single?pa_id=${id}`)
        .then(r => r.json())
}
export async function getListings(date: Date): Promise<any[]>
{
    const formattedDate = moment(date).format("YYYY-MM-DD");   
    const storageKey =  `listings-${formattedDate}`;

    var cached: string | undefined | null;
    if (cached = window.localStorage.getItem(storageKey)) {
        // return new Promise((resolve) =>
        // {
        //     setTimeout(() => resolve(JSON.parse(cached!)), 2000)
        // })
        return Promise.resolve(JSON.parse(cached))
    }
    
    var result = await fetch(`https://api-2.tvguide.co.uk/listings?platform=popular&date=${formattedDate}&hour=6&details=true`)
        .then(r => r.json())
        .then(r => r.filter((_: any, i: number) => i < 10))
        .then(async (r: Array<any>) => {
            var promises = r.flatMap(r => r.schedules)
                .map(i => getDetails(i.pa_id).then(r => {
                    i.details = r;
                    i.isMorning = true;
                }))

            await Promise.all(promises);
                        
            return r;
        });

    var result2 = await fetch(`https://api-2.tvguide.co.uk/listings?platform=popular&date=${formattedDate}&hour=12&details=true`)
        .then(r => r.json())
        .then(r => r.filter((_: any, i: number) => i < 10))
        .then(async (r: Array<any>) => {
            var promises = r.flatMap(r => r.schedules)
                .map(i => getDetails(i.pa_id).then(r => i.details = r))

            await Promise.all(promises);
            
            
            return r;
        });       
        
    var result3 = await fetch(`https://api-2.tvguide.co.uk/listings?platform=popular&date=${formattedDate}&hour=18&details=true`)
        .then(r => r.json())
        .then(r => r.filter((_: any, i: number) => i < 10))
        .then(async (r: Array<any>) => {
            var promises = r.flatMap(r => r.schedules)
                .map(i => getDetails(i.pa_id).then(r => i.details = r))

            await Promise.all(promises);
            
            
            return r;
        });               
        
    result.forEach(i =>
    {
        //
        i.schedules = i.schedules.concat(result2.find(r => r.pa_id === i.pa_id)?.schedules?.filter((s: any) => !i.schedules.find((x: any) => x.pa_id === s.pa_id)))
        i.schedules = i.schedules.concat(result3.find(r => r.pa_id === i.pa_id)?.schedules?.filter((s: any) => !i.schedules.find((x: any) => x.pa_id === s.pa_id)))
    })
    localStorage.setItem(storageKey, JSON.stringify(result))

    return result;
}