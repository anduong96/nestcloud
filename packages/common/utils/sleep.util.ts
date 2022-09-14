export function sleep(time: number = 2000) {
    return new Promise<void>(resolve => {
        setTimeout(() => resolve(), time);
    });
}
