import moment from "moment";

const baseUrl = atob("aHR0cHM6Ly9hcGktMi50dmd1aWRlLmNvLnVrLw==");
export function getDetails(id: string) {
  return fetch(`${baseUrl}single?pa_id=${id}`).then((r) => r.json());
}

async function getListingsForDateAndTime(formattedDate: string, hour: number, platform: string, region: string) {
  return await fetch(
        `${baseUrl}listings?platform=${platform}&region=${region}&date=${formattedDate}&hour=${hour}&details=true`
    )
    .then((r) => r.json())
    .then((r) => r.filter((_: any, i: number) => i < 20))
    .then(async (r: Array<any>) => {
      var promises = r
        .flatMap((r) => r.schedules)
        .map((i) =>
          getDetails(i.pa_id).then((r) => {
            i.details = r;
            i.isMorning = true;
          })
        );

      await Promise.all(promises);

      return r;
    });
}

function combineListings(toCombine: any[][]) {
    const result = toCombine[0];

    result.forEach(i => {        
        toCombine.slice(1).forEach(add => {
            i.schedules = i.schedules.concat(
                add.find((r) => r.pa_id === i.pa_id)?.schedules?.filter(
                  (s: any) => !i.schedules.find((x: any) => x.pa_id === s.pa_id)
                )
            );
        })
    })

    return result;
}

export async function getListings(date: Date, platform: string, region: string): Promise<any[]> {
  if (!platform) return [];
  const formattedDate = moment(date).format("YYYY-MM-DD");
  if (platform === "popular") region = "";
  const storageKey = `listings-${formattedDate}-${platform}-${region}`;

  var cached: string | undefined | null;
  if ((cached = window.localStorage.getItem(storageKey))) {
    return Promise.resolve(JSON.parse(cached));
  }

  var result = combineListings([
        await getListingsForDateAndTime(formattedDate, 6, platform, region),
        await getListingsForDateAndTime(formattedDate, 12, platform, region), 
        await getListingsForDateAndTime(formattedDate, 18, platform, region),
        await getListingsForDateAndTime(formattedDate, 24, platform, region)
    ]);

  localStorage.setItem(storageKey, JSON.stringify(result));

  return result;
}

const key = atob("ZDJmNjgzOQ==");

export async function getImdbUrl(filmName: string, year: number) {
  const film = await fetch(
    `https://www.omdbapi.com/?t=${encodeURIComponent(
      filmName
    )}&y=${year}&apikey=${key}`
  )
    .then((r) => r.json())
    .catch(() => ({}));

  return film.imdbID
    ? `https://www.imdb.com/title/${film.imdbID}`
    : `https://www.imdb.com/find/?q=${encodeURIComponent(filmName)}`;
}
