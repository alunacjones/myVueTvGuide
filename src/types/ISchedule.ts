import type { IDetails } from "./IDetails";

export interface ISchedule {
  pa_id: string;
  title: string;
  details: IDetails;
  start_at: string;
  end_at: string;
  type: string;
  duration: number;
  expanded: boolean;
}
