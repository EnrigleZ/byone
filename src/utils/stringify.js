export function toPercentage(num, digits = 2) {
    let n = parseFloat(num)
    if (Number.isNaN(n)) return '-'
    n = (n * 100).toFixed(digits)
    return `${n}%`
}

export const AXIOS = {
    assist2009: {f1: 0.884121551, auc: 0.9075513702},
    assist2015: {f1: 0.869150335, auc: 0.8762310900008},
    assist2017: {f1: 0.66229951, auc: 0.847521150},
}