import { format } from "date-fns";

export const getTimeLabel = (seconds: number) => 
    format(new Date(seconds * 1000), 'mm:ss');

export const getProgressValue = (position: number, duration: number) => 
    duration === 0 ? 0 : (position / duration) * 100