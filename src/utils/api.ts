import moment, { type Moment } from "moment";
import type { IListing } from "../types";

const baseUrl = "https://tv-guide-ma6ecfmh7-alun-jones-projects.vercel.app/";

function getDetails(id: string) {
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

/**
 * Adds an `end_at` property to each schedule item
 * @param listings the listings to add `end_at` properties to
 * @returns the updated listings array
 */
function addToDates(listings: IListing[]): IListing[] {
    listings.flatMap(l => l.schedules).forEach((value, index, array) => {
        value.end_at = array[index + 1]?.start_at ?? moment(value.start_at).add(value.duration, "minutes").toJSON();        
    });

    return listings;
}

export type Platform = "popular" | "freeview" | "virgin";
export type Region = "yorkshire" | "north-west" | "" | "wales";

/**
 * Fetches the array of `IListing`'s
 * @param date the date to fetch listings for
 * @param platform the platform to retrieve listings for
 * @param region the region to retrieve listings for
 * @returns the listings for the given parameters
 */
export async function getListings(
  date: Date,
  platform: Platform,
  region: Region
): Promise<IListing[]> {
  if (!platform) return [];

  const formattedDate = moment(date).format("YYYY-MM-DD");
  if (platform === "popular") region = "";
  const storageKey = `listings-${formattedDate}-${platform}-${region}`;

  var cached: any[] | null;
  if ((cached = getCachedItem(storageKey))) {
    return Promise.resolve(addToDates(cached));
  }

  console.log(new Date(), "Start fetching all listings")
  var allResults = await Promise.all([
    getListingsForDateAndTime(formattedDate, 6, platform, region),
    getListingsForDateAndTime(formattedDate, 12, platform, region),
    getListingsForDateAndTime(formattedDate, 18, platform, region),
    getListingsForDateAndTime(formattedDate, 24, platform, region),
  ]);

  console.log(new Date(), "Finished fetching all listings")
  
  var result = addToDates(combineListings(allResults));

  setCachedItem(storageKey, result);

  return result;
}

const key = atob("ZDJmNjgzOQ==");

/**
 * Get an IMDB Url for the film name and year
 * @param filmName The name of the filme
 * @param year The year of the film
 * @returns Returns the IMDB URL for the film or an IMDB search URL
 */
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

var holidays: IBankHolidays | null = null;

export async function getBankHolidays() : Promise<IBankHolidays> {
  return (holidays ??= await fetch(
    "https://www.gov.uk/bank-holidays.json "
  )
  .then(r => r.json()))
}

export async function getGoodFriday() : Promise<Moment>
{
  const holidays = await getBankHolidays();
  const now = moment();
  const thisYear = now.year().toString();
  const goodFriday = holidays["england-and-wales"].events.filter(e => e.date.startsWith(thisYear) && e.title == "Good Friday")[0]

  return moment(goodFriday.date);
}

export async function isNearEaster(date: Moment) : Promise<boolean>
{
  const goodFriday = await getGoodFriday();
  return Math.abs(goodFriday.diff(date, "days")) <= 3;
}

export interface IBankHolidays
{
  "england-and-wales": IHolidays
}

export interface IHolidays
{
  division: string
  events: IEvent[]
}

export interface IEvent
{
  title: string
  date: string
}