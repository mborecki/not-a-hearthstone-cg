let time: number;

export function reset() {
    time = Date.now();
}

export function getTime() : number {
    return Date.now() - time;
}

export default {
    reset,
    getTime
}