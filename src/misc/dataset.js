const DEFAULT_CASE = [
    {id: 1, answer: false},
    {id: 1, answer: false},
    {id: 2, answer: false},
    {id: 3, answer: false},
    {id: 4, answer: true},
    {id: 5, answer: true},
    {id: 2, answer: true},
    {id: 3, answer: true},
    {id: 4, answer: false},
    {id: 1, answer: false},
    {id: 10, answer: false},
]

export const DATASETS = [
    { key: "assist2009", name: "ASSIST2009", cases: DEFAULT_CASE, totalExercises: 124 },
    { key: "assist2015", name: "ASSIST2015", cases: DEFAULT_CASE, totalExercises: 100 },
    { key: "statics", name: "Statics2011", cases: DEFAULT_CASE, totalExercises: 1224 },
    { key: "synthetic", name: "Simulated-5", cases: DEFAULT_CASE, totalExercises: 51 },
    { key: "2018_s", name: "FCS-2018S", cases: DEFAULT_CASE, totalExercises: 61 },
    { key: "2018_w", name: "FCS-2018A", cases: DEFAULT_CASE, totalExercises: 83 },
    { key: "2019_s", name: "FCS-2019S", cases: DEFAULT_CASE, totalExercises: 74 },
    { key: "2019_w", name: "FCS-2019A", cases: DEFAULT_CASE, totalExercises: 114 }
]

export function getDatasetInfo(key) {
    const [dataset] = DATASETS.filter(x => x.key === key)
    if (!dataset) return null
    return {...dataset}
}