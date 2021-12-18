import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'

import ConfigModal from './modal'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const MyLayout = (props) => {
    const { modelName } = props

    const [modalDisplay, setModalDisplay] = React.useState(false)

    return (
        <Layout className="my-layout">
            <Header className="my-header">
                <Link style={{color: "#FFF"}} to="/">基于知识追踪的个性化学习系统</Link></Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {/* <Menu.Item key="config" onClick={() => { setModalDisplay(true) }}>设置参数</Menu.Item> */}
                        <Menu.Item key="test-pred">
                            <Link to="/test-pred">预测表现评估</Link>
                        </Menu.Item>
                        <Menu.Item key="pred-exercise">
                            <Link to="/pred-exercise">题目掌握变化曲线</Link>
                        </Menu.Item>
                        <Menu.Item key="pred-step">
                            <Link to="/pred-step">各题目作答预测</Link>
                        </Menu.Item>
                        <Menu.Item key="pred-gain">
                            <Link to="/pred-gain">知识增益评估与应用</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="pred-route">
                            <Link to="/pred-route">学习路径规划</Link>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
            <ConfigModal display={modalDisplay} setDisplay={setModalDisplay} />
        </Layout>
    )
}

export default MyLayout
