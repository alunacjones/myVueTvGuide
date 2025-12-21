import moment from "moment";
import { isNearEaster } from "./api";

export enum Season {
    None,
    Christmas,
    Easter,
    NewYear
}

export async function getSeason(): Promise<Season> {
    var today = moment();
    if ((today.month() === 11 && today.date() === 31) || (today.month() === 0 && today.date() === 1)) return Season.NewYear
    if (today.month() === 11) return Season.Christmas;
    if (await isNearEaster(today)) return Season.Easter;
    
    return Season.None;
}
