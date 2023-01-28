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
import Report from './Sana2/Sana/Report'
import SarafiManagment from './Sana2/Sana/sarafi/SarafiManagment';
import { Route, Routes, useNavigate } from "react-router-dom";
import AgGridPagination from './AgGridPagination'
import RialiPaymentReport from './Sana2/Sana/RialiPaymentReport';


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
        if (e.key === "4")
            navigate("/Report")
        if (e.key === "5")
            navigate("/SarafiManagment")
        if (e.key === "6")
            navigate("/AgGridPagination")
        if (e.key === "7")
            navigate("/RialiPaymentReport")
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
                        {
                            key: '4',
                            icon: <UploadOutlined />,
                            label: ' گزارش ',

                        },
                        {
                            key: '5',
                            icon: <UploadOutlined />,
                            label: ' صرافی ها',

                        },
                        {
                            key: '6',
                            icon: <UploadOutlined />,

                            label: 'صفحه بندی گرید  ',

                        },
                        {
                            key: '7',
                            icon: <UploadOutlined />,

                            label: 'گزارش از پرداختهای ریالی ',

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
                        <Route exact path='/Report' element={<Report />} />
                        <Route exact path='/SarafiManagment' element={<SarafiManagment />} />
                        <Route exact path='/AgGridPagination' element={<AgGridPagination />} />
                        <Route exact path='/RialiPaymentReport' element={<RialiPaymentReport />} />
                        
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;