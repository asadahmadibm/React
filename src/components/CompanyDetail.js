import react, { useState, useMemo, useCallback, useRef } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { AutoComplete, Checkbox, Button, Switch, InputNumber, Space, Select, Form, Input, message } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { DatePicker, ConfigProvider, Card } from "antd";
import { DatePicker as DatePickerJalali, Calendar, JalaliLocaleListener, useJalaliLocaleListener } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import en_US from "antd/lib/locale/en_US";
import dayjs from 'dayjs'
import 'react-toastify/dist/ReactToastify.css';
import moment, { locale } from 'jalali-moment';

const DatePickerCustom = ({ value, onChange }) => {
    return <DatePicker showTime allowClear={false} value={value != undefined ? dayjs(value) : ""} onChange={onChange} format="HH:mm:ss YYYY-MM-DD " />
};


const CompanyDetail = () => {

    const onchangeDate = (value) => {
        let x = moment(dayjs(value, { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')
        form.setFieldValue("registerDate", x);
        console.log(x);

    }

    dayjs.calendar('jalali');
    const dateFormat = 'YYYY/MM/DD';
    const [componentDisabled, setComponentDisabled] = useState(true);
    const navigate = useNavigate();
    let params = useLocation();
    const formRef = useRef(null);
    const [form] = Form.useForm();
    const [optionsSelect, setOptionsSelect] = useState([]);
    const [sarafi, setSarafi] = useState([
        {
            value: 1,
            label: 'گروه 1',
        },
        {
            value: 2,
            label: 'گروه 2',
        },
        {
            value: 3,
            label: 'گروه 3',
        },
        {
            value: 4,
            label: 'گروه 4',
            //   disabled: true,
        },
    ]);

    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };
    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFinish = (values) => {
        //sarafiid
        console.log(values);
        //    navigate("/RialiPaymentDetail", { state: { transactionId: values.companycode } })
    };

    const onSave = () => {
        console.log(form.getFieldsValue());
    }

    const onFill = () => {


        form.setFieldsValue({
            companycode: 40,
            companyname: 'شرکت تستی ',
            address: "ادرس شرکت",
            group: 1,
            chkcustomer: true,
            chkDontSendEmail: true,
            email: "asad@yahoo.com",
            region: "ناحیه",
            industry: 4,
            description: "شرح",
            moaref: "معرف",
            selectivegroup: "گروه های انتخابی",
            buyer: "خریدار",
            registrator: "اسعد احمدی",
            registerDate :moment(dayjs( new Date(), { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')

        });
    };


    return (
        <Card type="inner" title="جزییات  شرکت" size="default" extra={
            <Space wrap>
                <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                >
                    Form disabled
                </Checkbox>
                <Button type="primary" htmlType="submit"  onClick={onSave}>ذخیره  </Button>
                <Button type="primary" danger htmlType="button" onClick={onFill}>پر نمودن فرم </Button>
                <Button htmlType="button" onClick={onReset}>  پاکسازی فرم </Button>
            </Space>

        }>

            <Form ref={formRef} form={form} name="basic" onFinish={onFinish} disabled={componentDisabled}>
                {/* <Space size={[8, 45]} wrap> */}
                <Row>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="کد" name="companycode" className='ant-input-group-addon'
                            rules={[
                                {
                                    // type: 'number',
                                    // min: 0,
                                    // max: 99,

                                    required: true,
                                    message: 'کد ضروری است',
                                },
                            ]}>
                            <InputNumber placeholder=" کد شرکت "></InputNumber >

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Space.Compact block size="small">

                            <Form.Item name="chkcustomer" valuePropName="checked">
                                <Checkbox>مشتری</Checkbox>
                            </Form.Item>


                            <Form.Item name="chkActive" valuePropName="checked">
                                <Checkbox>فعال</Checkbox>
                            </Form.Item>


                            <Form.Item name="chkDontSendEmail" valuePropName="checked">
                                <Checkbox>عدم ارسال ایمیل</Checkbox>
                            </Form.Item>
                        </Space.Compact>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="نام" name="companyname" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: 'نام شرکت ضروری است',
                                },
                            ]}>
                            <Input placeholder=" نام شرکت "></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item name="group" label="  گروه " className='ant-input-group-addon'
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: ' گروه ضروری است',
                        //     },
                        // ]}
                        >
                            {/* <Input  /> */}
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 100,
                                // }}
                                placeholder="لطفا انتخاب نمایید"
                                options={sarafi}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="آدرس" name="address" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: ' آدرس ضروری است',
                                },
                            ]}>
                            <Input placeholder="  آدرس "
                            //  style={{ width: 300 }}
                            ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item name="industry" label="  صنعت " className='ant-input-group-addon'
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: ' صنعت ضروری است',
                        //     },
                        // ]}
                        >
                            {/* <Input  /> */}
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                placeholder="لطفا انتخاب نمایید"
                                options={sarafi}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="ایمیل" name="email" className='ant-input-group-addon'>
                            <Input placeholder="  ایمیل "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="ناحیه" name="region" className='ant-input-group-addon'>
                            <Input placeholder="  ناحیه "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="توضیحات" name="description" className='ant-input-group-addon'>
                            <Input placeholder="  توضیحات "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="معرف" name="moaref" className='ant-input-group-addon'>
                            <Input placeholder="  معرف "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="گروه انتخابی" name="selectivegroup" className='ant-input-group-addon'>
                            <Input placeholder="  گروه انتخابی "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="خریدار" name="buyer" className='ant-input-group-addon'>
                            <Input placeholder="  خریدار "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="ثبت کننده" name="registrator" className='ant-input-group-addon' >
                            <Input placeholder="  ثبت کننده " disabled={true}></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ ثبت" name="registerDate">
                        <DatePickerCustom onChange={onchangeDate} />
                          
                        </Form.Item>
                    </Col>
                </Row>
                {/* </Space> */}
            </Form>


        </Card>


    )
}

export default CompanyDetail

