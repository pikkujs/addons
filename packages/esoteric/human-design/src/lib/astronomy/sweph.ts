import sweph from "sweph";
import { CelestialPositions } from "../types.js";

export const CelestialBodies: Record<string, number> = {
    sun: sweph.constants.SE_SUN,
    moon: sweph.constants.SE_MOON,
    northNode: sweph.constants.SE_TRUE_NODE, // North Node
    mercury: sweph.constants.SE_MERCURY,
    venus: sweph.constants.SE_VENUS,
    mars: sweph.constants.SE_MARS,
    jupiter: sweph.constants.SE_JUPITER,
    saturn: sweph.constants.SE_SATURN,
    uranus: sweph.constants.SE_URANUS,
    neptune: sweph.constants.SE_NEPTUNE,
    pluto: sweph.constants.SE_PLUTO
};

export const getCelestialPositions = (date: Date): CelestialPositions => {
    const hour =
        date.getUTCHours() +
        date.getUTCMinutes() / 60 +
        date.getUTCSeconds() / 3600;
    const jdBirth = sweph.julday(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate(),
        hour,
        sweph.constants.SE_GREG_CAL
    );
    return Object.entries(CelestialBodies).reduce((result, [planet, planetIndex]) => {
        const calc = sweph.calc_ut(jdBirth, planetIndex, sweph.constants.SEFLG_MOSEPH);
        result[planet as keyof CelestialPositions] = calc.data[0];
        return result;
    }, {} as CelestialPositions);
};

/**
 * Find the design date using a binary search approach.
 * Searches between (birthDate - 96 days) and (birthDate - 84 days) for a date
 * where the difference between the Sun's position at birth and at that time is ~88°.
 */
export const getDesignDate = (birthDate: Date): Date | null => {
    const birthHour =
        birthDate.getUTCHours() +
        birthDate.getUTCMinutes() / 60 +
        birthDate.getUTCSeconds() / 3600;
    const jdBirth = sweph.julday(
        birthDate.getUTCFullYear(),
        birthDate.getUTCMonth() + 1,
        birthDate.getUTCDate(),
        birthHour,
        sweph.constants.SE_GREG_CAL
    );
    const birthSun = sweph.calc_ut(jdBirth, sweph.constants.SE_SUN, sweph.constants.SEFLG_MOSEPH);
    const birthSunDegrees = birthSun.data[0];

    const dayMs = 86400000;
    const startDate = new Date(birthDate.getTime() - 96 * dayMs);
    const endDate = new Date(birthDate.getTime() - 84 * dayMs);
    let startTimestamp = startDate.getTime() / 1000;
    let endTimestamp = endDate.getTime() / 1000;
    let maxIterations = 100;
    let designDate: Date | null = null;

    while (!designDate && maxIterations > 0) {
        const midTimestamp = (startTimestamp + endTimestamp) / 2;
        const midDate = new Date(midTimestamp * 1000);
        const midHour =
            midDate.getUTCHours() +
            midDate.getUTCMinutes() / 60 +
            midDate.getUTCSeconds() / 3600;
        const jdMid = sweph.julday(
            midDate.getUTCFullYear(),
            midDate.getUTCMonth() + 1,
            midDate.getUTCDate(),
            midHour,
            sweph.constants.SE_GREG_CAL
        );
        const midSun = sweph.calc_ut(jdMid, sweph.constants.SE_SUN, sweph.constants.SEFLG_MOSEPH);
        const sunDegrees = midSun.data[0];
        let difference = Math.abs(birthSunDegrees - sunDegrees);
        if (difference > 180) {
            difference = 360 - difference;
        }
        if (Math.abs(difference - 88) < 0.01) {
            designDate = new Date(midTimestamp * 1000);
        } else if (difference > 88) {
            startTimestamp = midTimestamp;
        } else {
            endTimestamp = midTimestamp;
        }
        maxIterations--;
    }
    return designDate;
};
