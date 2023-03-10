import react, { useState, useMemo, useCallback, useRef } from 'react'
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AutoComplete, Dropdown, Card, Checkbox, Button, Switch, InputNumber, Space, Select, Form, Input, message, DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs'
import moment, { locale } from 'jalali-moment';

const DatePickerCustom = ({ value, onChange }) => {
    return <DatePicker allowClear={false} value={value != undefined ? dayjs(value) : ""} onChange={onChange} format="HH:mm:ss YYYY-MM-DD " />
};

// const DatePickerCustom = ({ value, onChange }) => {
//     return <DatePicker value={value!=undefined ? dayjs(value) : ""} onChange={onChange} format="HH:mm:ss YYYY-MM-DD "/>
//   };

const ExchangesDetail = () => {

    const onchangeDate = (value) => {
        let x = moment(dayjs(value, { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')
        form.setFieldValue("date", x);

    }
    const onchangeCreateDate = (value) => {
        let x = moment(dayjs(value, { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')
        form.setFieldValue("createDate", x);

    }

    const onchangelastModifiedDate = (value) => {
        let x = moment(dayjs(value, { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')
        form.setFieldValue("lastModifiedDate", x);

    }




    dayjs.calendar('jalali');

    const [componentDisabled, setComponentDisabled] = useState(true);
    const navigate = useNavigate();
    let params = useLocation();
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const [paymentType] = useState([{ value: 1, label: '????????', }, { value: 2, label: '??????????', }]);
    const [transactionType] = useState([{ value: 1, label: "???????? " }, { value: 2, label: "????????" }]);
    const [customerType] = useState([{ value: 1, label: "?????????? " }, { value: 2, label: "??????????" }, { value: 3, label: "?????????? ??????????" }]);
    const [nationalIdValidation] = useState([{ value: 0, label: "  ?????????????? ???????? " }, { value: 1, label: "??????????  " }, { value: 2, label: " ??????????????" }, { value: 3, label: " ??????????" }, { value: 4, label: " ??????????" }, { value: 5, label: " ??????????" }, { value: 6, label: " ??????????" }, { value: 255, label: "" }]);
    const [status] = useState([{ value: 0, label: "?????????? " }, { value: 1, label: "?????????????? ??????" }, { value: 2, label: "???????? ??????" }]);
    const [mobileNumValidation] = useState([{ value: 0, label: "?????????????? ???????? " }, { value: 1, label: " ??????????" }, { value: 2, label: "??????????????" }, { value: 3, label: "????????????" }]);
    const [currencySource] = useState([{ value: 1, label: "?????????? ?????????? " }, { value: 2, label: "?????????? ???????? ??????????" }, { value: 3, label: " ???? ?????? ???????? ???? ?????????? ?????????? ???????? ??????????" }, { value: 4, label: " ???? ?????? ???????? ???? ?????????? ?????????? ???????? ?????????? - ????????????" }]);
    const [currencyUse, setCurrencyUse] = useState([]);


    useEffect(() => {
        if (params.state != null) {
            axios.get("/Exchanges?id=" + Number(params.state.id))
                .then(res => {
                    form.setFieldsValue(res.data.data[0]);
                    document.body.classList.remove('loading-indicator');
                }).catch(err => {
                    toast.warn("?????????? ???? ???????????????? ????????????????");

                }).finally(() => {
                });

            axios.post("/CurrencyUse")
                .then(res => {
                    setCurrencyUse(res.data.data.list.map(({ id, title }) => ({ "value": id, "label": title })));

                }).catch(err => {
                    toast.warn("?????????? ???? ???????????????? ?????????????? ???? ??????????");

                }).finally(() => {
                });

            // console.log(date);
        }

    }, []);

    const ddd = () => {
        console.log(form.getFieldValue("date"));
        return dayjs("1392/01/01", { jalali: true })
    }

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
    const onSave = () => {
        console.log(form.getFieldsValue());
    }

    const onEdit = (e) => {
        setComponentDisabled(!componentDisabled)
    }

    return (

        <Card type="inner" title="???????????? ???????? ?? ????????" size="default" extra={
            <Space wrap>
                <Checkbox
                    checked={!componentDisabled}
                    onChange={(e) => setComponentDisabled(!e.target.checked)}>
                    ???????????? ??????
                </Checkbox>
                {/* <Button danger htmlType="submit" onClick={onEdit} >???????????? ??????  </Button> */}
                <Button type="primary" htmlType="submit" onClick={onSave} >??????????  </Button>
                <Button htmlType="button" onClick={onReset}>  ?????????????? ?????? </Button>
                <Button htmlType="button" onClick={onReturn}>   ???????????? </Button>
            </Space>

        }>
            <Form ref={formRef} form={form} name="basic" onFinish={onFinish} disabled={componentDisabled}>
                {/* <Space size={[8, 45]} wrap> */}
                <Row>
                    <Col lg={6} md={12} sm={12} >
                       
                    </Col>
                </Row>
                <Space direction="vertical"
                    size="small">
                        <Space align="start">
                        <Form.Item label="????" name="id" className='ant-input-group-addon'
                            rules={[
                                {
                                    // type: 'number',
                                    // min: 0,
                                    // max: 99,

                                    required: true,
                                    message: '',
                                },
                            ]}>
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >

                        </Form.Item>
                        <Form.Item label="  ???? ?????????? " name="sarafiId" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <InputNumber placeholder=" ???? "
                                        style={{
                                            width: '100%',
                                        }}
                                    ></InputNumber >

                                </Form.Item>
                       
                        </Space>


                    <Card
                        title="?????????????? ????????????"
                        size="small"
                    // bordered={false}
                    // style={{
                    //   width: 300,
                    // }}
                    >
                        <Row>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="?????????? ????????????" name="trackingCode" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????????? ???????????? " name="date" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <DatePickerCustom onChange={onchangeDate} />

                                </Form.Item>

                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????? ????????????  " name="username" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ?????????? ?????????? ???????????? ??????????  " name="lastUserModifiedBy" className='ant-input-group-addon'                          >
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ?????????? ??????????  " name="createDate" className='ant-input-group-addon'                          >
                                    <DatePickerCustom onChange={onchangeCreateDate} />
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="?????????? ?? ???????????? " name="lastModifiedDate" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <DatePickerCustom onChange={onchangelastModifiedDate} />

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ???? ?????????? ???????????? ?????????? ??????" name="refTrackingCode" className='ant-input-group-addon'                          >
                                    <InputNumber
                                        style={{
                                            width: '100%',
                                        }}
                                    ></InputNumber >
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ??????????  " name="status" className='ant-input-group-addon'                          >
                                    <Select
                                        //mode="multiple"
                                        showSearch
                                        allowClear
                                        // style={{
                                        //     width: 200,
                                        // }}
                                        // placeholder="???????? ???????????? ????????????"
                                        options={status}
                                    >
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card
                        title="?????????????? ??????????"
                        size="small"
                    // bordered={false}
                    // style={{
                    //   width: 300,
                    // }}
                    >
                        <Row>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????? ??????????  " name="customerType" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Select
                                        //mode="multiple"
                                        showSearch
                                        allowClear
                                        // style={{
                                        //     width: 200,
                                        // }}
                                        // placeholder="???????? ???????????? ????????????"
                                        options={customerType}
                                    >
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="   ?????????? ???????? ?????????? " name="nationalIdValidation" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Select
                                        //mode="multiple"
                                        showSearch
                                        allowClear
                                        // style={{
                                        //     width: 200,
                                        // }}
                                        // placeholder="???????? ???????????? ????????????"
                                        options={nationalIdValidation}
                                    >
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ??????" name="firstName" className='ant-input-group-addon'>
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????? ????????????????" name="lastName" className='ant-input-group-addon' >
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????? ????????" name="companyName" className='ant-input-group-addon'>
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ???? ?????? ???? ?????????? ??????" name="nationalId" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????????? ???????????????? ???? ?????? ????????" name="shId" className='ant-input-group-addon' >
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????????? ???????? ???? ?????? ????????" name="birthDate" className='ant-input-group-addon'                           >
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????????? ????????????" name="mobileNumber" className='ant-input-group-addon'                          >
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ???? ?????? ??????????????" name="agentNationalId" className='ant-input-group-addon'                          >
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ?????????? ???????????????? ??????????????" name="agentShId" className='ant-input-group-addon'                          >
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ?????????? ???????? ??????????????" name="agentBirthDate" className='ant-input-group-addon'                          >
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="   ?????????? ???????? ?????????????? ??????????" name="agentNationalIdValidation" className='ant-input-group-addon'                          >
                                    <Select
                                        //mode="multiple"
                                        showSearch
                                        allowClear
                                        // style={{
                                        //     width: 200,
                                        // }}
                                        // placeholder="???????? ???????????? ????????????"
                                        options={nationalIdValidation}
                                    >
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ?????????? ???????? ???????????? " name="mobileNumValidation" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Select
                                        //mode="multiple"
                                        showSearch
                                        allowClear
                                        // style={{
                                        //     width: 200,
                                        // }}
                                        // placeholder="???????? ???????????? ????????????"
                                        options={mobileNumValidation}
                                    >
                                    </Select>

                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card
                        title="?????????????? ????????/????????"
                        size="small"
                    // bordered={false}
                    // style={{
                    //   width: 300,
                    // }}
                    >
                        <Row>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????? ????????????  " name="transactionType" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Select
                                        //mode="multiple"
                                        showSearch
                                        allowClear
                                        // style={{
                                        //     width: 200,
                                        // }}
                                        // placeholder="???????? ???????????? ????????????"
                                        options={transactionType}
                                    >
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ???? ?????? " name="nationalId" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Input ></Input>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????????? " name="amount" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <InputNumber placeholder=" ???? " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        style={{
                                            width: '100%',
                                        }}
                                    ></InputNumber >

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????? " name="rate" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <InputNumber placeholder=" ???? " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        style={{
                                            width: '100%',
                                        }}
                                    ></InputNumber >

                                </Form.Item>
                            </Col>

                            <Col lg={3} md={6} sm={12} >
                                <Form.Item name="paymentType" label=" ?????? ???????????? " className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
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
                                        // placeholder="???????? ???????????? ????????????"
                                        options={paymentType}
                                    >
                                    </Select>

                                </Form.Item>
                            </Col>

                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ?????????? ??????????" name="chequeId" className='ant-input-group-addon'                          >
                                    <Input ></Input>

                                </Form.Item>
                            </Col>

                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ????????   " name="currencyCoefficient" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <InputNumber
                                        style={{
                                            width: '100%',
                                        }}
                                    ></InputNumber >

                                </Form.Item>
                            </Col>

                            <Col lg={6} md={9} sm={12} >
                                <Form.Item label="  ??????????  " name="currencyUseId" className='ant-input-group-addon'                          >
                                    <Select
                                        //mode="multiple"
                                        showSearch
                                        allowClear
                                        // style={{
                                        //     width: 200,
                                        // }}
                                        // placeholder="???????? ???????????? ????????????"
                                        options={currencyUse}
                                    >
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ?????????? ????????   " name="euroAmount" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <InputNumber placeholder=" ???? " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        style={{
                                            width: '100%',
                                        }}
                                    ></InputNumber >

                                </Form.Item>
                            </Col>

                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="  ???????? ??????   " name="currencySource" className='ant-input-group-addon'
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}>
                                    <Select
                                        //mode="multiple"
                                        showSearch
                                        allowClear
                                        // style={{
                                        //     width: 200,
                                        // }}
                                        // placeholder="???????? ???????????? ????????????"
                                        options={currencySource}
                                    >
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="?????????? ???????????? ???? ??????????" name="matchingExchangeRow" className='ant-input-group-addon'                          >
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="???? ?????????? ???????????? ???? ??????????" name="traderSarafId" className='ant-input-group-addon'                          >
                                    <Input ></Input>
                                </Form.Item>
                            </Col>

                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="?????????? ????????" name="rialAmountCalc" className='ant-input-group-addon'                          >
                                    <InputNumber placeholder=" ???? " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        style={{
                                            width: '100%',
                                        }}
                                    ></InputNumber >
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label="?????????? ????????  " name="dollarAmount" className='ant-input-group-addon'                          >
                                    <InputNumber placeholder=" ???? " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        style={{
                                            width: '100%',
                                        }}
                                    ></InputNumber >
                                </Form.Item>
                            </Col>
                            <Col lg={3} md={6} sm={12} >
                                <Form.Item label=" ???? ???????????? ??????????" name="nakhodaTrackingCode" className='ant-input-group-addon'                          >
                                    <Input ></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Space>



                {/* </Space> */}
            </Form>
        </Card >

    )
}

export default ExchangesDetail
