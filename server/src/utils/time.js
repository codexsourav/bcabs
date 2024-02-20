export function getFutureTime(minutes) {
    const currentTime = new Date().getTime();
    const durationInMilliseconds = minutes * 60 * 1000; // convert minutes to milliseconds
    const futureTime = new Date(currentTime + durationInMilliseconds);
    return futureTime;
}

export function isFutureTime(timeToVerify) {
    const currentTime = new Date().getTime();
    const givenTime = new Date(timeToVerify).getTime();
    return givenTime > currentTime;
}
