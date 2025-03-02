import type { ISchedule } from "./ISchedule";

export interface IListing {
  pa_id: string;
  genre: string;
  schedules: Array<ISchedule>;
  channelUrl: string | undefined;
  slug: string;
  duration: number;
  title: string;
  logo_url: string
}