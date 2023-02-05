import react, { useState, useMemo, useCallback, useRef } from 'react'
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AutoComplete, Dropdown, Checkbox, Button, Switch, InputNumber, Space, Select, Form, Input, message } from 'antd';
import axios from 'axios';
const ExchangesDetail = () => {
    const [formvalues, setFormvalues] = useState('');
    const [componentDisabled, setComponentDisabled] = useState(true);
    const navigate = useNavigate();
    let params = useLocation();
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const [paymentType, setPaymentType] = useState([
        {
            value: 1,
            label: 'نقدی',
        },
        {
            value: 2,
            label: 'حواله',
        }

    ]);

    useEffect(() => {
        if(params.state !=null) {
        axios.get("/Exchanges?id=" + Number(params.state.id))
            .then(res => {
                setFormvalues(res.data.data[0]);
                form.setFieldsValue(res.data.data[0])
            }).catch(err => {
                toast.warn("اشکال در فراخوانی اتطلاعات");

            }).finally(() => {
            });
        }
    }, []);

    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFinish = (values) => {
        //sarafiid
        console.log(values);
        //    navigate("/RialiPaymentDetail", { state: { transactionId: values.companycode } })
    };

    const onReturn = () => {
        navigate("/ExchangeReport")
    }

    return (
        <Container>
            <h4> جزییات خرید و فروش </h4>

            <Form ref={formRef} form={form} name="basic" onFinish={onFinish} disabled={componentDisabled}>
                {/* <Space size={[8, 45]} wrap> */}
                <Row>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="کد" name="id" className='ant-input-group-addon'
                            rules={[
                                {
                                    // type: 'number',
                                    // min: 0,
                                    // max: 99,

                                    required: true,
                                    message: 'کد ضروری است',
                                },
                            ]}>
                            <InputNumber placeholder=" کد "></InputNumber >

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="شماره رهگیری" name="trackingCode" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: 'شماره رهگیری  ضروری است',
                                },
                            ]}>
                            <Input placeholder=" شماره رهگیری  "></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" نام" name="firstName" className='ant-input-group-addon'>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" نام خانوادگی" name="lastName" className='ant-input-group-addon' >
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" نام شرکت" name="companyName" className='ant-input-group-addon'>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" کد ملی یا شناسه ملی" name="nationalId" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: ' کد ملی یا شناسه ملی  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" شماره شناسنامه یا شماره ثبت شرکت" name="shId" className='ant-input-group-addon' >
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ تولد یا تاریخ ثبت شرکت" name="birthDate" className='ant-input-group-addon'                           >
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" شماره موبایل" name="mobileNumber" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ معامله " name="nationalId" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: ' تاریخ معامله  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  کد ارز " name="nationalId" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '  کد ارز  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" مقدار " name="amount" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '   مقدار  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" نرخ " name="rate" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '   نرخ  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>

                    <Col lg={3} md={6} sm={12} >
                        <Form.Item name="paymentType" label=" نوع معامله " className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: ' نوع معامله  ضروری است',
                                },
                            ]}
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
                                options={paymentType}
                            >
                            </Select>

                        </Form.Item>
                    </Col>

                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" شماره حواله" name="chequeId" className='ant-input-group-addon'                          >
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" نوع عملیات  " name="transactionType" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '   نوع عملیات   ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" نوع مشتری  " name="customerType" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '   نوع مشتری   ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  وضعیت احراز هویت مشتری " name="nationalIdValidation" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    وضعیت احراز هویت مشتری  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  کد صرافی " name="sarafiId" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    کد صرافی  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" نام کاربری  " name="username" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '   نام کاربری ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  کد ملی نماینده" name="agentNationalId" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  شماره شناسنامه نماینده" name="agentShId" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  تاریخ تولد نماینده" name="agentBirthDate" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  وضعیت احراز هویت نماینده مشتری" name="agentNationalIdValidation" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  کد پیگری تراکنش ابطال شده" name="refTrackingCode" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  وضعیت  " name="status" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  ضریب   " name="currencyCoefficient" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    ضریب  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>

                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  سرفصل  " name="currencyUseId" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  معادل یورو   " name="euroAmount" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    معادل یورو  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  وضعیت احراز هویت موبایل مشتری   " name="mobileNumValidation" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    وضعیت احراز هویت موبایل مشتری  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  منبع ارز   " name="currencySource" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    منبع ارز  ضروری است',
                                },
                            ]}>
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="شناسه معمامله دو صرافی" name="matchingExchangeRow" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="کد صرافی معامله دو صرافی" name="traderSarafId" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  تاریخ ایجاد رکورد  " name="createDate" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="معادل ریال" name="rialAmountCalc" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="معادل دلار  " name="dollarAmount" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" کد رهگیری ناخدا" name="nakhodaTrackingCode" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} md={6} sm={12} >
                        <Space wrap>
                            <Button type="primary" htmlType="submit" >ذخیره  </Button>
                        </Space>


                    </Col>

                </Row>
                {/* </Space> */}
            </Form>
            <Space wrap>
                <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}>
                    Form disabled
                </Checkbox>
                <Button htmlType="button" onClick={onReset}>  پاکسازی فرم </Button>
                <Button htmlType="button" onClick={onReturn}>   بازگشت </Button>
            </Space>


        </Container >
    )
}

export default ExchangesDetail
