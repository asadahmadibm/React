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
import RialiPaymentDetail from './Sana2/Sana/RialiPaymentDetail';
import CompanyDetail from './Local/CompanyDetail';
import ExchangeReport from './Sana2/Sana/ExchangeReport';
import ExchangesDetail from './Sana2/Sana/ExchangesDetail';
import EmployeeDetail from './Local/EmployeeDetail'
import '../index.css'

import { Layout, Menu, theme, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import NimaRequest from './nima/NimaRequest';
const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [

    // getItem('Option 1', '1'),
    getItem('سنا', 'sub1', "", [
        getItem('لیست ارزها', '3'),
        getItem(' گزارش آماری ', '4'),
        getItem('گزارش از پرداختهای ریالی ', '7'),
        getItem('گزارش خرید و فروش ارز ', '9'),
    ]),
    getItem('نیما', 'sub2', "", [getItem('درحواستهای فعال', '6')]),
    getItem('مدیریت ارتباط با مشتری', 'sub3', "", [
        // getItem('جزییات ', '10'),
        getItem('جزییات شرکت ', '8'),
    ]),
];
const MainLayoutNew = () => {
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
            navigate("/NimaRequest")
        if (e.key === "7")
            navigate("/RialiPaymentReport")
        if (e.key === "8")
            navigate("/CompanyDetail")
        if (e.key === "9")
            navigate("/ExchangeReport")
            if (e.key === "10")
            navigate("/EmployeeDetail")
    };

    const [current, setCurrent] = useState('mail');
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='logo'></div>
                <Menu onClick={onClick}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
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
                        style :{
                            color: 'white',
                        },
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <Space >
                        <Button type="" htmlType="button"
                            style={{
                                color: 'white',
                            }}
                        >ورود به سیستم </Button>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '8px 8px',
                        padding: '15px 20px',
                        minHeight: 650,
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
                        <Route exact path='/RialiPaymentDetail' element={<RialiPaymentDetail />} />
                        <Route exact path='/NimaRequest' element={<NimaRequest />} />
                        <Route exact path='/CompanyDetail' element={<CompanyDetail />} />
                        <Route exact path='/ExchangeReport' element={<ExchangeReport />} />
                        <Route exact path='/ExchangesDetail' element={<ExchangesDetail />} />
                        <Route exact path='/EmployeeDetail' element={<EmployeeDetail />} />

                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayoutNew;