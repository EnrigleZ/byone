import React from 'react'
import { Card, Col, Divider, message, Progress, Row, Spin, Empty, Button, InputNumber } from 'antd'
import InteractArea from './interact-area'
import { getPlan } from './logics'
import { getDatasetInfo } from '../../misc/dataset'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { averageDebounce } from '../../utils'

function parseResult(data, length, debounce) {
    const ret = data[length - 1];
    return ret;
    // return data.map(x => x[length - 1])
}

const ProgressArea = (props) => {
    const { results, n } = props
    const [indexDisplay, setIndexDisplay] = React.useState(0)


    if (!results || !results.length) {
        return <Empty description="未提交实验" />
    }
    const invalid = indexDisplay === null || indexDisplay >= results.length || indexDisplay < 0
    const percentage = invalid
        ? 0
        : results[indexDisplay] * 100
    const color = percentage > 50 ? '#52c41a' : '#ff4d4f'

    return (
        <>
            <Row gutter={16}>
                <Col offset={6} span={6}>
                    <Progress format={(x) => {return invalid || Number.isNaN(percentage) ? "-" : `${x}%`}} strokeColor={color} width={200} type="circle" percent={percentage.toFixed(2)} />
                </Col>
                <Col span={12}>
                    <h1>选择题目编号</h1>
                    <Button shape="circle" icon={<MinusOutlined />} onClick={() => setIndexDisplay(c => Math.max(0, c - 1))}/>
                    <InputNumber value={indexDisplay} min={0} max={n - 1} onChange={setIndexDisplay} />
                    <Button shape="circle" icon={<PlusOutlined />} onClick={() => setIndexDisplay(c => Math.min(c + 1, n - 1))}/>
                    {/* <Button onClick={() => { setIndexDisplay(index) }} style={{ marginLeft: '10px', bottom: '1px'}}>确认</Button> */}
                </Col>
            </Row>
        </>
    )
}

const PlanRoutePage = (props) => {

    const [n, setN] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [results, setResults] = React.useState(null)

    const getResult = React.useCallback((model, dataset, decay, values, debounce) => {
        console.log(debounce)
        const datasetInfo = getDatasetInfo(dataset)
        if (!model || !dataset) {
            message.error("请填写模型参数")
            return
        }
        setN(datasetInfo.totalExercises)
        setLoading(true)
        getPlan(model, dataset, values).then(res => {
            console.log(res)
            const data = res.data.kt.value;
            setResults(parseResult(data, res.data.length, debounce));
            // const data = res.data.pred_step
            // setResults(data)
        })
            .catch(() => { })
            .finally(() => { setLoading(false) })
    }, [setN, setLoading])


    return (
        <>
            <InteractArea submit={getResult} />
            <Divider />
            <Spin spinning={loading}>
                <Card title="各题目作答结果预测展示">
                    <ProgressArea results={results} n={n} />
                </Card>
            </Spin>
        </>
    )
}

export default PlanRoutePage
