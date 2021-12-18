import React from 'react'
import { Card, Divider, message, InputNumber, Spin, Empty, Space, Button, Tooltip, Icon } from 'antd'
import { QuestionCircleTwoTone  } from '@ant-design/icons';
import { Column } from '@ant-design/charts'
import InteractArea from './interact-area'
import { getColumnConfigs, getInferenceExerciseResult, getInferenceResult } from './logics'
import { getDatasetInfo } from '../../misc/dataset'
import { averageDebounce } from '../../utils'

function parseResult(result) {
    const { length } = result;
    const values = result.gain.value.slice(0, length);
    return values;
}


const ChartArea = React.memo((props) => {
    const {results} = props
    if (!results) return (<Empty description="未提交实验" />)
    // console.log(results)
    const config = getColumnConfigs(results)
    return (
        <Column {...config} />)
})

const RecommendArea = React.memo((props) => {
    const { gainDict } = props;
    const [best, setBest] = React.useState(null);
    const [t, setT] = React.useState(1.0);
    const [beta, setBeta] = React.useState(1.0);

    const updateScore = React.useCallback((b) => {
        gainDict.forEach(item => {
            const score = (1 + b) * (item.prob * item.v) / (b * item.prob + item.v);
            item.score = score;
        });
    }, [gainDict]);

    // Calculate best recommendation candidate;
    React.useEffect(() => {
        if (!gainDict) return;
        updateScore(beta);
        let [temp] = gainDict;
        gainDict.forEach(item => {
            if (item.score > temp.score) temp = item;
        })
        setBest(temp);
    }, [gainDict, best, beta]);
    if (!best) return  (<Empty description="未提交实验" />);

    // console.log(best)

    return <div>
        {/* <Space>
            <InputNumber min={0} value={t} onChange={setT} />
            <Button onClick={() => {
                updateScore(t)
                setBeta(t)
            }}>
                设置Beta
            </Button>
        </Space>
        <Divider /> */}
        <div>
            <b>推荐习题：</b>
            <span>{best.k}</span>
        </div>
        <div>
            <Tooltip title="学生作答正确准确率，表示学生需要付出的努力。">
                <QuestionCircleTwoTone  />
            </Tooltip>
            <b>作答概率预测：</b>
            <span>{best.prob.toFixed(3)}</span>
            <br />
            <Tooltip title="下一次作答学生能够获取的知识增益的期望，表示学生从中的收获。">
                <QuestionCircleTwoTone  />
            </Tooltip>
            <b>知识增益期望：</b>
            {/* <span>{best.v.toFixed(3)}</span> */}
            <span>{best.v.toFixed(3)} = {best.gain[2].toFixed(3)} * {best.prob.toFixed(3)} + {best.gain[1].toFixed(3)} * (1 - {best.prob.toFixed(3)})</span>
            <br />
            <Tooltip title="基于模型两个子任务的预测输出，准确率与知识增益的调和平均数。Beta 用于平衡两个因子，beta 越大，越倾向于推荐知识增益高的候选。">
                <QuestionCircleTwoTone  />
            </Tooltip>
            <b>推荐指标：</b>
            <span>{best.score.toFixed(3)}</span>
        </div>
        <Divider />
        {gainDict.map(item => {
            return (<div key={item.k} className={item.k === best.k ? 'italic' : ''}>
                <b>习题：</b><span>{item.k}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <b>作答概率预测：</b><span>{item.prob.toFixed(3)}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <b>知识增益期望：</b><span>{item.v.toFixed(3)} ({item.gain[2].toFixed(3)} / {item.gain[1].toFixed(3)})</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <b>推荐指标：</b><span>{item.score && item.score.toFixed(3)}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>)
        })}
    </div>
})

const PredictGainPage = (props) => {

    const [n, setN] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [results, setResults] = React.useState(null)
    const [gainDict, setGainDict] = React.useState([]);

    const getResult = React.useCallback((model, dataset, decay, values, debounce) => {
        const datasetInfo = getDatasetInfo(dataset)
        // console.log(datasetInfo)
        if (!model || !dataset) {
            message.error("请填写模型参数")
            return
        }
        setN(datasetInfo.totalExercises)
        setLoading(true)
        getInferenceExerciseResult(model, dataset, decay, values).then(res => {
            console.log(res.data)
            const data = parseResult(res.data)
            setResults(data)
            setGainDict(res.data.gain_dict)
        })
            .catch(() => { })
            .finally(() => { setLoading(false) })
    }, [setN, setLoading])

    return (
        <>
            <InteractArea submit={getResult} />
            <Divider />
            <Spin spinning={loading}>
                <Card title="基于知识增益的习题推荐"  >
                    <RecommendArea gainDict={gainDict} />
                </Card>
            </Spin>
            <Divider />
            <Spin spinning={loading}>
                <Card title="知识增益评估" >
                    <ChartArea results={results} />
                </Card>
            </Spin>
        </>
    )
}

export default PredictGainPage
