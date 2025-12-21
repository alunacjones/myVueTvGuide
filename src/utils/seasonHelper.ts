import moment, { type Moment } from "moment";
import { isNearEaster } from "./api";

export enum Season {
    None,
    Christmas,
    Easter,
    NewYear,
    Birthday
}

const birthdays: Record<string, IBirthday> = {
    "05-02": {
        name: "Tor"
    },
    "29-03": {
        name: "Joanna"
    },        
    "05-10": {
        name: "Alun"
    },
    "21-10": {
        name: "Sue"
    },
    "28-11": {
        name: "Juni"
    },
    "21-12": {
        name: "Geoff"
    }
};

export interface IBirthday {
    name: string
}

export async function getSeason(): Promise<Season> {
    var today = moment();
    if (getBirthday(today)) return Season.Birthday;
    if ((today.month() === 11 && today.date() === 31) || (today.month() === 0 && today.date() === 1)) return Season.NewYear
    if (today.month() === 11) return Season.Christmas;
    if (await isNearEaster(today)) return Season.Easter;
    
    return Season.None;
}

export function getBirthday(date: Moment): IBirthday | undefined {
    return birthdays[date.format("DD-MM")];
}