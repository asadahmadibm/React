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

const EmployeeDetail = () => {

    const onchangeDate = (value) => {
        let x = moment(dayjs(value, { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')
        form.setFieldValue("birth", x);
        console.log(x);

    }


    dayjs.calendar('jalali');

    const [componentDisabled, setComponentDisabled] = useState(false);
    const navigate = useNavigate();
    let params = useLocation();
    const [form] = Form.useForm();
    const formRef = useRef(null);
    // const inputref = useRef();
    // const inputref1 = useRef();
    // const [aa, setAa] = useState(dayjs("1401/11/01", { jalali: true }));



    useEffect(() => {
        //  if (params.state != null) {

        axios.get("/LocalEmployee?id=" + Number("2"))
            .then((res) => {
                // console.log(res.data.data[0]);
                form.setFieldsValue(res.data.data[0]);
                // inputref.current.datepicker.value = moment('2020-06-09T12:40:14+0000')//dayjs("1392/03/05", { jalali: true });
                // inputref1.current.input.value = dayjs("1392/03/05", { jalali: true });


                // console.log(aa);
            }).catch(err => {
                toast.warn("اشکال در فراخوانی اتطلاعات");

            }).finally(() => {
            });

        //  }

    }, []);

    // const [sss] = useState(dayjs("1392/01/01", { jalali: true }))
    // const ddd = () => {
    //     console.log(form.getFieldValue("birth"));
    //     return dayjs("1392/01/01", { jalali: true })
    // }

    const onReset = () => {
        formRef.current?.resetFields();
        // console.log(inputref.current.defaultValue);
        // inputref1.current.input.value = "";
        // inputref.current.value = "";
        // inputref.current.defaultValue = "";

        // // inputref.current.input.value="";
        // inputref.current.selected = "";

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

    // const onchange = (value) => {
    //     console.log(value.target.value);
    //     setAa(dayjs("1355/05/21", { jalali: true }))
    // }
    return (

        <Card type="inner" title="جزییات  " size="default" extra={
            <Space wrap>
                <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}>
                    Form disabled
                </Checkbox>

                <Button type="primary" htmlType="submit" onClick={onSave} >ذخیره  </Button>
                <Button htmlType="button" onClick={onReset}>  پاکسازی فرم </Button>
                <Button htmlType="button" onClick={onReturn}>   بازگشت </Button>
            </Space>

        }>
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
                            <InputNumber controls={false} 
                                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >

                        </Form.Item>
                    </Col>

                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ تولد " name="birth" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: ' تاریخ تولد  ضروری است',
                                },
                            ]}>
                            {/* <DatePicker onChange={onchange} locale={locale} format="YYYY/MM/DD"></DatePicker> */}
                            <DatePickerCustom onChange={onchangeDate} />

                        </Form.Item>

                    </Col>
                    {/* <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ تولد" className='ant-input-group-addon'                          >
                            <DatePicker
                                // defaultValue={} 
                                onChange={onchangeDate}
                                // format="YYYY-MM-DD HH:mm:ss" 
                                ref={inputref} />
                            <Input
                                // defaultValue="11" 
                                onChange={onchangeDate} ref={inputref1} />
                           
                        </Form.Item>
                    </Col> */}




                </Row>

                {/* </Space> */}
            </Form>
        </Card>

    )
}

export default EmployeeDetail
