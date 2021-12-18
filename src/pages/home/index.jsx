import React from 'react'
import { Link } from 'react-router-dom'
import { Empty } from 'antd'

const HomePage = () => {
    return (
        <Empty className="empty-desc" description={(
            <div>
                <div style={{color: "#999"}}>请在左侧边栏选取一个功能</div>
                <div style={{color: "#999"}}>比如试试<Link to="/test-pred">预测表现评估</Link> : )</div>
            </div>
        )} />
    )
}

export default HomePage
