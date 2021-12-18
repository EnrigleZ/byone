import Axios from 'axios'
import { stringify } from 'qs'

export const PostInferenceStep = (data) => {
    const ret = Axios.post("inference/step/", data)
    return ret
}

const PostInferenceExercise = (data) => {
    const ret = Axios.get(`test?${stringify(data)}`)
    return ret
}

const PostRoutePlan = (data) => {
    const ret = Axios.get(`plan?${stringify(data)}`)
    return ret
}

export const getInferenceResult = (model, dataset, decay, values) => {
    const data = {
        // model_name: model,
        // dataset,
        questions: values.map(x => String(x.id)).join(','),
        answers: values.map(x => x.answer ? "1" : "0").join(','),
        // weight_decay: decay,
        // step: "49"
    }

    const ret = PostInferenceExercise(data)
    return ret
}

export const getInferenceExerciseResult = (model, dataset, decay, values, exercise) => {
    const data = {
        questions: values.map(x => String(x.id)).join(','),
        answers: values.map(x => String(x.answer ? '1' : '0')).join(','),
        // model_name: model,
        // dataset,
        // exercise_list: values.map(x => String(x.id)),
        // label_list: values.map(x => x.answer ? "1" : "0"),
        // weight_decay: decay,
        // exercise
    }

    const ret = PostInferenceExercise(data)
    return ret
}

export const getPlan = (model, dataset, values) => {
    const data = {
        questions: values.map(x => String(x.id)).join(','),
        answers: values.map(x => String(x.answer ? '1' : '0')).join(','),
    }

    const ret = PostRoutePlan(data)
    return ret
}


export function getConfigs(results) {
    console.log(results)
    const data = results.map((value, index) => {
        return {
            index,
            value
        }
    })
    const config = {
        data,
        height: 400,
        xField: 'index',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
            formatter: ({ value }) => { return parseFloat(value).toFixed(3) },
            autoEllipsis: true,
            autoHide: true,
            rotate: -0.618
        },
    }
    return config
}

export function getColumnConfigs(results, values) {
    const data = results.map((value, index) => ({
        value,
        index,
    }));

    console.log(data);

    return {
        data,
        height: 400,
        xField: 'index',
        yField: 'value',
    }
}