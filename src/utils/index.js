export function averageDebounce(list, n = 3) {
    const ret = []
    for (let i = 0; i < list.length; ++ i) {
        const start = Math.max(0, i - n + 1);
        const part = list.slice(start, i + 1);
        ret.push(part.reduce((last, current) => last + current, 0) / part.length)
    }
    return ret
}