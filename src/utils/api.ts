import moment from "moment";

const baseUrl = atob("aHR0cHM6Ly9hcGktMi50dmd1aWRlLmNvLnVrLw==");
export function getDetails(id: string) {
  return fetch(`${baseUrl}single?pa_id=${id}`).then((r) => r.json());
}

async function getListingsForDateAndTime(formattedDate: string, hour: number) {
  return await fetch(
    `${baseUrl}listings?platform=popular&date=${formattedDate}&hour=${hour}&details=true`
  )
    .then((r) => r.json())
    .then((r) => r.filter((_: any, i: number) => i < 10))
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

export async function getListings(date: Date): Promise<any[]> {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const storageKey = `listings-${formattedDate}`;

  var cached: string | undefined | null;
  if ((cached = window.localStorage.getItem(storageKey))) {
    return Promise.resolve(JSON.parse(cached));
  }

  var result = combineListings([
        await getListingsForDateAndTime(formattedDate, 6),
        await getListingsForDateAndTime(formattedDate, 12), 
        await getListingsForDateAndTime(formattedDate, 18),
        await getListingsForDateAndTime(formattedDate, 24)
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
