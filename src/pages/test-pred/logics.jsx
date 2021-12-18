import Axios from 'axios'
import { stringify } from 'qs'
import { AXIOS } from '../../utils/stringify';

const GetTestsetPredictionAPI = (params) => {
    const ret = Axios.post("pred", params)
    return ret
}

export const getPrediction = (modelName, dataset, gain) => {
    const params = {
        model_name: modelName,
        dataset,
        gain: gain
    }
    const ret = GetTestsetPredictionAPI(params)
    return ret
}

export const GetPredictionAPI = (dataset) => {
    let ret = Axios.get(`inference?dataset=${dataset}&model=KT-MTL`).then(() => {
        ret = {data: AXIOS[dataset]};
        return ret;
    });
    return ret;
    // return Promise.resolve({data: ret});
}