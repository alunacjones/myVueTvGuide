import moment from "moment";
import type { IdAndText } from "../stores/queryStore";
import type { Ref } from "vue";

export const platformValues: IdAndText[] = [
  { id: "popular", text: "Popular" },
  { id: "freeview", text: "Freeview" },
  { id: "virgin", text: "Virgin" },
];

export const regionValues: IdAndText[] = [
  { id: "yorkshire", text: "Yorkshire" },
  { id: "north-west", text: "North West" },
  { id: "wales", text: "Wales" },
];

export const typeValues: IdAndText[] = [
  { id: "", text: "All" },
  { id: "movie", text: "Films" },
  { id: "episode", text: "Series" },
];

export const createOption = (days: number, today: Ref<Date>): IdAndText => {
  var date = moment(today.value).add(days, "days");
  var dayOfWeek = date.format("dddd");
  var mapping: Record<string, string> = {
    "-1": " (Yesterday)",
    "0": " (Today)",
    "1": " (Tomorrow)",
  };

  const getExtraInfo = () =>
    mapping[days.toString()] ?? ` (${date.format("Do MMM")})`;

  return {
    text: `${dayOfWeek}${getExtraInfo()}`,
    id: date.format("yyyy-MM-DD"),
  };
};
