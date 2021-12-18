import React from 'react'
import { connect } from 'react-redux'
import { Divider, message, Card, Modal, Form, Button, Select, Spin } from 'antd'

import { mapStateToProps } from '../../redux'
import ConfigModal from '../../component/modal'
import { getPrediction, GetPredictionAPI } from './logics'
import StaticCard from './static-card'

import TableImage from '../../misc/table.png';

const defaultResult = {}

const TestsetPredictionPage = (props) => {
    // const { modelName, dataset, weightDecay } = props
    const [spinning1, setSpinning1] = React.useState(false)
    const [spinning2, setSpinning2] = React.useState(false)

    const [result1, setResult1] = React.useState(defaultResult)
    const [result2, setResult2] = React.useState(defaultResult)

    const [display1, setDisplay1] = React.useState(false)
    const [display2, setDisplay2] = React.useState(false)

    const [dataset, setDataset] = React.useState('assist2009')
    const [predition, setPrediction] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const callback = (setResult, setSpinning, modelName, dataset, gain) => {
        if (!modelName || !dataset) {
            message.error("请填写模型类型与测试数据集")
            return
        }
        // setSpinning(true)
        getPrediction(modelName, dataset, gain)
            .then(res => {
                setResult(res.data)
            })
            .finally(() => { setSpinning(false) })
    }

    const onPredict = React.useCallback(() => {
        setLoading(true);
        GetPredictionAPI(dataset).then(res => {
            console.log(res);
            setPrediction(res);
            Modal.info({
                title: "预测指标",
                content: (<Form>
                    <Form.Item ><b style={{fontSize: 16}}>AUC: </b>{res.data.auc.toFixed(4)}</Form.Item>
                    <Form.Item ><b style={{fontSize: 16}}>F1: </b>{res.data.f1.toFixed(4)}</Form.Item>
                </Form>)
            })
        }).finally(() => {
            setLoading(false);
        })
    }, [dataset])

    return (
        <>
            <StaticCard title="测试配置一" result={result1} loading={spinning1} setDisplay={setDisplay1} compare={result2} />
            <Divider />
            <StaticCard title="测试配置二" result={result2} loading={spinning2} setDisplay={setDisplay2} compare={result1} />

            <Divider />
            <Card title="测试KT-MTL预测指标" >
                <Spin spinning={loading}>
                    <Form>
                        <Form.Item label="数据集">
                            <Select onChange={value => {
                                console.log(value);
                                setDataset(value);
                            }}>
                                <Select.Option key="assist2009" value="assist2009">ASSISTments2009</Select.Option>
                                <Select.Option key="assist2015" value="assist2015">ASSISTments2015</Select.Option>
                                <Select.Option key="assist2017" value="assist2017">ASSISTments2017</Select.Option>
                            </Select>
                        </Form.Item>
                        <Button type="primary" disabled={loading} onClick={onPredict}>开始</Button>
                    </Form>
                </Spin>
            </Card>
            <Divider />
            <Card title="实验性能指标" >
                <img src={TableImage} style={{ width: '100%' }} />
            </Card>
            <ConfigModal display={display1} setDisplay={setDisplay1} update={callback.bind(null, setResult1, setSpinning1)} />
            <ConfigModal display={display2} setDisplay={setDisplay2} update={callback.bind(null, setResult2, setSpinning2)} />
        </>
    )
}

export default connect(mapStateToProps)(TestsetPredictionPage)
