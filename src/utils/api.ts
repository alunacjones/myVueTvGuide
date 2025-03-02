import moment from "moment";
import type { IListing } from "../types";

const baseUrl = atob("aHR0cHM6Ly9hcGktMi50dmd1aWRlLmNvLnVrLw==");
export function getDetails(id: string) {
  return fetch(`${baseUrl}single?pa_id=${id}`).then((r) => r.json());
}

async function getListingsForDateAndTime(
  formattedDate: string,
  hour: number,
  platform: string,
  region: string
): Promise<IListing[]> {
  return await fetch(
    `${baseUrl}listings?platform=${platform}&region=${region}&date=${formattedDate}&hour=${hour}&details=true`
  )
    .then<IListing[]>((r) => r.json())
    .then((r) => r.filter((_: IListing, i: number) => i < 20))
    .then(async (r: Array<IListing>) => {
      var promises = r
        .flatMap((r) => r.schedules)
        .map((i) =>
          getDetails(i.pa_id).then((r) => {
            i.details = r;
          })
        );

      await Promise.all(promises);

      return r;
    });
}

function combineListings(toCombine: IListing[][]) {
  const result = toCombine[0];

  result.forEach((i) => {
    toCombine.slice(1).forEach((add) => {
      i.schedules = i.schedules.concat(
        add
          .find((r) => r.pa_id === i.pa_id)
          ?.schedules?.filter(
            (s: any) => !i.schedules.find((x: any) => x.pa_id === s.pa_id)
          ) ?? []
      );
    });
  });

  return result;
}

const cachedItemsKey = "cachedListings";
const getAllCachedItems = () =>
  JSON.parse(localStorage.getItem(cachedItemsKey) ?? "{}");

function getCachedItem(key: string): IListing[] | null {
  return getAllCachedItems()[key];
}

function setCachedItem(key: string, value: IListing[]) {
  var cachedItems = getAllCachedItems();

  cachedItems[key] = value;
  var storageLengh = JSON.stringify(cachedItems).length;
  if (storageLengh > 4_000_000) {
    console.warn(`Purging data as it is currently using ${storageLengh} bytes`);
    cachedItems = {};
    cachedItems[key] = value;
  }

  localStorage.setItem(cachedItemsKey, JSON.stringify(cachedItems));
}

function addToDates(listings: IListing[]) {
    listings.flatMap(l => l.schedules).forEach((value, index, array) => {
        value.end_at = array[index + 1]?.start_at ?? moment(value.start_at).add(value.duration, "minutes").toJSON();        
    });

    return listings;
}

export async function getListings(
  date: Date,
  platform: string,
  region: string
): Promise<IListing[]> {
  if (!platform) return [];

  const formattedDate = moment(date).format("YYYY-MM-DD");
  if (platform === "popular") region = "";
  const storageKey = `listings-${formattedDate}-${platform}-${region}`;

  var cached: any[] | null;
  if ((cached = getCachedItem(storageKey))) {
    return Promise.resolve(addToDates(cached));
  }

  var result = addToDates(
    combineListings([
      await getListingsForDateAndTime(formattedDate, 6, platform, region),
      await getListingsForDateAndTime(formattedDate, 12, platform, region),
      await getListingsForDateAndTime(formattedDate, 18, platform, region),
      await getListingsForDateAndTime(formattedDate, 24, platform, region),
    ])
  );

  setCachedItem(storageKey, result);

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
