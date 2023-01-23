import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import Home from './Home'
import About from './About'
import Currency from './Currency'
import { Route, Routes ,useNavigate} from "react-router-dom";

import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClick = (e) => {
        console.log('click', e);
        if (e.key === "1")
            navigate("/Home")
        if (e.key === "2")
            navigate("/About")
        if (e.key === "3")
            navigate("/Currency")

        };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu onClick={onClick}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                            
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'لیست ارزها',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        height: 50,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        margin: '8px 8px',
                        padding: '0 20px',
                        minHeight: 580,
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route exact path='/home' element={<Home />} />
                        <Route exact path='/About' element={<About />} />
                        <Route exact path='/Currency' element={<Currency />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;