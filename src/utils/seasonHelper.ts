import moment from "moment";
import { isNearEaster } from "./api";

export enum Season {
    None,
    Christmas,
    Easter
}

export async function getSeason(): Promise<Season> {
    return Season.Easter
    var today = moment();
    if (today.month() === 11) return Season.Christmas;
    if (await isNearEaster(today)) return Season.Easter;
    return Season.None;
}
