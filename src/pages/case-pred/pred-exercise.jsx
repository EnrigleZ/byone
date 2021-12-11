import React from 'react'
import { Card, Col, Divider, message, Progress, Row, Spin, Empty, Button, InputNumber } from 'antd'
import { Line } from '@ant-design/charts'
import InteractArea from './interact-area'
import { getConfigs, getInferenceExerciseResult, getInferenceResult } from './logics'
import { getDatasetInfo } from '../../misc/dataset'
import { averageDebounce } from '../../utils'

function parseResult(result, id, debounce) {
    const { length } = result;
    console.log(length)
    const values = result.kt.value.slice(0, length);
    const ret = values.map(x => x[id])
    return debounce ? averageDebounce(ret) : ret;
}


const ChartArea = React.memo((props) => {
    const {results} = props
    if (!results) return (<Empty description="未提交实验" />)
    // console.log(results)
    const config = getConfigs(results)
    return (
        <Line {...config} />)
})

const PredictExercisePage = (props) => {

    const [n, setN] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [results, setResults] = React.useState(null)
    const [exercise, setExercise] = React.useState(null)

    const getResult = React.useCallback((model, dataset, decay, values, debounce) => {
        console.log(model, dataset, decay, values, exercise)
        const datasetInfo = getDatasetInfo(dataset)
        console.log(datasetInfo)
        if (!model || !dataset) {
            message.error("请填写模型参数")
            return
        }
        if (exercise === undefined || exercise === null ) {
            message.error("请填写题号")
            return
        }
        if (exercise >= datasetInfo.totalExercises + datasetInfo.base || exercise < datasetInfo.base) {
            message.error(`题号"${exercise}"不合法`)
            return
        }
        setN(datasetInfo.totalExercises)
        setLoading(true)
        getInferenceExerciseResult(model, dataset, decay, values, exercise).then(res => {
            console.log(res)
            const data = parseResult(res.data, exercise, debounce)
            console.log(data)
            // const data = res.data.pred_exercise
            setResults(data)
        })
            .catch(() => { })
            .finally(() => { setLoading(false) })
    }, [setN, setLoading, exercise])

    console.log(n)
    return (
        <>
            <InteractArea submit={getResult} needDebounce />
            <Divider />
            <Spin spinning={loading}>
                <Card title="指定题目掌握情况变化" extra={(<>
                    <b style={{}}>题号选择: </b>
                    <InputNumber min={0} onChange={setExercise}/>
                </>)}>
                    <ChartArea results={results} />
                </Card>
            </Spin>
        </>
    )
}

export default PredictExercisePage
