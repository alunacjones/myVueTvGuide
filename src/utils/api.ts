import moment from "moment"

const baseUrl = atob("aHR0cHM6Ly9hcGktMi50dmd1aWRlLmNvLnVrLw==")
export function getDetails(id: string)
{
    return fetch(`${baseUrl}single?pa_id=${id}`)
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
    
    var result = await fetch(`${baseUrl}listings?platform=popular&date=${formattedDate}&hour=6&details=true`)
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

    var result2 = await fetch(`${baseUrl}listings?platform=popular&date=${formattedDate}&hour=12&details=true`)
        .then(r => r.json())
        .then(r => r.filter((_: any, i: number) => i < 10))
        .then(async (r: Array<any>) => {
            var promises = r.flatMap(r => r.schedules)
                .map(i => getDetails(i.pa_id).then(r => i.details = r))

            await Promise.all(promises);
            
            
            return r;
        });       
        
    var result3 = await fetch(`${baseUrl}listings?platform=popular&date=${formattedDate}&hour=18&details=true`)
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

const key = atob("ZDJmNjgzOQ==");

export async function getImdbUrl(filmName: string, year: number) {
    const film = await fetch(`http://www.xomdbapi.com/?t=${encodeURIComponent(filmName)}&y=${year}&apikey=${key}`)
        .then(r => r.json())
        .catch(() => ({}))
    
    return film.imdbID 
        ? `https://www.imdb.com/title/${film.imdbID}`
        : `https://www.imdb.com/find/?q=${encodeURIComponent(filmName)}`;
}