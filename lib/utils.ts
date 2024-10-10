import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";
import {
    fromUnixTime,
    isBefore,
    differenceInSeconds,
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
    differenceInWeeks,
    differenceInMonths,
    differenceInYears,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isJwtTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token);
    const expiration = fromUnixTime(decodedToken.exp!);

    const isExpired = isBefore(expiration, new Date());

    return isExpired;
};

export function formatShortTimeAgo(date: Date): string {
    const now = new Date();

    const seconds = differenceInSeconds(now, date);
    if (seconds < 60) {
        return `${seconds}s`;
    }

    const minutes = differenceInMinutes(now, date);
    if (minutes < 60) {
        return `${minutes}min`;
    }

    const hours = differenceInHours(now, date);
    if (hours < 24) {
        return `${hours}h`;
    }

    const days = differenceInDays(now, date);
    if (days < 7) {
        return `${days}d`;
    }

    const weeks = differenceInWeeks(now, date);
    if (weeks < 4) {
        return `${weeks}w`;
    }

    const months = differenceInMonths(now, date);
    if (months < 12) {
        return `${months}m`;
    }

    const years = differenceInYears(now, date);
    return `${years}y`;
}
