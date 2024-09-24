import { type ClassValue, clsx } from "clsx";
import { fromUnixTime, isBefore } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isJwtTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token);
    const expiration = fromUnixTime(decodedToken.exp!);

    const isExpired = isBefore(expiration, new Date());

    return isExpired;
};
