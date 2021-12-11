import Axios from 'axios'
import { stringify } from 'qs'

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
