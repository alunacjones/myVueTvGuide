import type { IMeta } from "./IMeta";

export interface IDetails {
  genre: string;
  categories: string[];
  meta: IMeta;
  title: string;
  summary_long: string;
  summary_short: string;
}
