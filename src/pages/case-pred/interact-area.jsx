import React from 'react'
import { Col, Row, Button, Card, Divider, Statistic } from 'antd'

import ConfigModal from '../../component/modal'
import { getDatasetInfo } from '../../misc/dataset'
import ExerciseList from './exercise-list'
import SimpleModal from '../../component/simple-modal'

const InteractArea = (props) => {
    const { submit, needDebounce } = props

    const [display, setDisplay] = React.useState(false)
    const [dataset, setDataset] = React.useState(getDatasetInfo('assist2009'))
    const [model, setModel] = React.useState('PAKT')
    const [decay, setDecay] = React.useState(false)
    const [values, setValues] = React.useState(getDatasetInfo('assist2009').cases.map(x => ({ ...x })))
    const [n, setN] = React.useState(getDatasetInfo('assist2009').totalExercises)
    const [len, setLen] = React.useState(20)
    const [debounce, setDebounce] = React.useState(true)

    function update(l, de, m, d, dec) {
        console.log(l)
        setLen(l)
        setDebounce(de)
        // setModel(m)
        // setDecay(dec)

        // const datasetInfo = getDatasetInfo(d)
        // if (datasetInfo) {
        //     setDataset(datasetInfo)
        //     const { cases, totalExercises } = datasetInfo
        //     setValues(cases.map(x => ({ ...x })))
        //     setN(totalExercises)
        // }
    }

    const statisticArea = dataset && (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="数据集" value={dataset.name} />
                </Col>
                <Col span={12}>
                    <Statistic title="题号范围" value={dataset && `${dataset.base} - ${dataset.base + n - 1}`} />
                </Col>
            </Row>
            <Divider />
        </>)

    return (
        <Card
            title="样例设置"
            extra={(<Button type="primary" onClick={() => { setDisplay(true) }}>配置实验参数</Button>)}
        >
            <ExerciseList values={values} totalExercises={n} length={len} />
            {/* <ConfigModal
                display={display}
                setDisplay={setDisplay}
                update={update}
                acceptModels={['UTKT']}
                modelName="UTKT"
            /> */}
            <SimpleModal
                display={display}
                setDisplay={setDisplay}
                update={update}
                needDebounce={needDebounce}
            />
            <Divider />
            { statisticArea }
            <Button hidden={!dataset} type="primary" onClick={() => { submit(model, dataset.key, decay, values.slice(0, len), debounce) }}>开始</Button>
        </Card>
    )
}

export default InteractArea
