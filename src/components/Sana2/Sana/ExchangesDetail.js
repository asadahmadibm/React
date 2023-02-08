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
import moment from 'jalali-moment';

// const DatePickerCustom = ({ value, onChange }) => {
//     return <DatePicker value={value!=undefined ? dayjs(value) : ""} onChange={onChange} format="HH:mm:ss YYYY-MM-DD "/>
//   };

const ExchangesDetail = () => {

    const onchangeDate=(value)=>{
        let x= moment(dayjs(value,{jalali:true}).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')
        form.setFieldValue("date",x);

    }
    const onchangeCreateDate=(value)=>{
        let x= moment(dayjs(value,{jalali:true}).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')
        form.setFieldValue("createDate",x);

    }

    dayjs.calendar('jalali');

    const [componentDisabled, setComponentDisabled] = useState(false);
    const navigate = useNavigate();
    let params = useLocation();
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const [paymentType] = useState([{ value: 1, label: 'نقدی', }, { value: 2, label: 'حواله', }]);
    const [transactionType] = useState([{ value: 1, label: "خرید " }, { value: 2, label: "فروش" }]);
    const [customerType] = useState([{ value: 1, label: "حقیقی " }, { value: 2, label: "حقوقی" }, { value: 3, label: "تابعه خارجی" }]);
    const [nationalIdValidation] = useState([{ value: 0, label: "  استعلام نشده " }, { value: 1, label: "معتبر  " }, { value: 2, label: " نامعتبر" }, { value: 3, label: " معتبر" }, { value: 4, label: " معتبر" }, { value: 5, label: " معتبر" }, { value: 6, label: " معتبر" }, { value: 255, label: "" }]);
    const [status] = useState([{ value: 0, label: "معتبر " }, { value: 1, label: "استفاده شده" }, { value: 2, label: "باطل شده" }]);
    const [mobileNumValidation] = useState([{ value: 0, label: "استعلام نشده " }, { value: 1, label: " معتبر" }, { value: 2, label: "نامعتبر" }, { value: 3, label: "نامشخص" }]);
    const [currencySource] = useState([{ value: 1, label: "منابع داخلی " }, { value: 2, label: "منابع بانک مرکزی" }, { value: 3, label: " از محل خرید از بازار متشکل ارزی ایران" }, { value: 4, label: " از محل خرید از بازار متشکل ارزی ایران - صادرات" }]);
    const [currencyUse, setCurrencyUse] = useState([]);
    
    
    useEffect(() => {
         if (params.state != null) {
            axios.get("/Exchanges?id=" + Number(params.state.id))
                .then(res => {
                    form.setFieldsValue(res.data.data[0]);
                }).catch(err => {
                    toast.warn("اشکال در فراخوانی اتطلاعات");

                }).finally(() => {
                });

            axios.post("/CurrencyUse")
                .then(res => {
                    setCurrencyUse(res.data.data.list.map(({ id, title }) => ({ "value": id, "label": title })));

                }).catch(err => {
                    toast.warn("اشکال در فراخوانی اطلاعات سر فصلها");

                }).finally(() => {
                });
      
        // console.log(date);
         }

    }, []);

    const ddd=()=>{
        console.log(form.getFieldValue("date"));
        return dayjs("1392/01/01", {jalali:true})
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
    const onSave=()=>{
        console.log(form.getFieldsValue());
    }

    return (

        <Card type="inner" title="جزییات خرید و فروش" size="default" extra={
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
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >

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
                            <Input ></Input>

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
                        <Form.Item label=" شماره شناسنامه یا ثبت شرکت" name="shId" className='ant-input-group-addon' >
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ تولد یا ثبت شرکت" name="birthDate" className='ant-input-group-addon'                           >
                            <Input ></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" شماره موبایل" name="mobileNumber" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} hidden={true}>
                        <Form.Item label=" تاریخ معامله " name="date" className='ant-input-group-addon' hidden={true}
                            rules={[
                                {
                                    required: true,
                                    message: ' تاریخ معامله  ضروری است',
                                },
                            ]}>
                            <Input  ></Input>

                        </Form.Item>
                        
                    </Col>
                     <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ معامله"  className='ant-input-group-addon'                          >
                            <DatePicker defaultValue={ddd} onChange={onchangeDate} format="YYYY-MM-DD HH:mm:ss"/>
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
                            <InputNumber placeholder=" کد " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >

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
                            <InputNumber placeholder=" کد " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >

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
                                // placeholder="لطفا انتخاب نمایید"
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
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                // placeholder="لطفا انتخاب نمایید"
                                options={transactionType}
                            >
                            </Select>

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
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                // placeholder="لطفا انتخاب نمایید"
                                options={customerType}
                            >
                            </Select>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="   احراز هویت مشتری " name="nationalIdValidation" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    وضعیت احراز هویت مشتری  ضروری است',
                                },
                            ]}>
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                // placeholder="لطفا انتخاب نمایید"
                                options={nationalIdValidation}
                            >
                            </Select>

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
                            <InputNumber placeholder=" کد "
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >

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
                        <Form.Item label="   احراز هویت نماینده مشتری" name="agentNationalIdValidation" className='ant-input-group-addon'                          >
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                // placeholder="لطفا انتخاب نمایید"
                                options={nationalIdValidation}
                            >
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  کد پیگری تراکنش ابطال شده" name="refTrackingCode" className='ant-input-group-addon'                          >
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  وضعیت  " name="status" className='ant-input-group-addon'                          >
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                // placeholder="لطفا انتخاب نمایید"
                                options={status}
                            >
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  اخربن کاربر ویرایش کننده  " name="lastUserModifiedBy" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="اخرین تاریخ ویرایش " name="lastModifiedDate" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    اخرین تاریخ ویرایش  ضروری است',
                                },
                            ]}>
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
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >

                        </Form.Item>
                    </Col>

                    <Col lg={6} md={9} sm={12} >
                        <Form.Item label="  سرفصل  " name="currencyUseId" className='ant-input-group-addon'                          >
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                // placeholder="لطفا انتخاب نمایید"
                                options={currencyUse}
                            >
                            </Select>
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
                            <InputNumber placeholder=" کد " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  احراز هویت موبایل " name="mobileNumValidation" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: '    وضعیت احراز هویت موبایل مشتری  ضروری است',
                                },
                            ]}>
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                // placeholder="لطفا انتخاب نمایید"
                                options={mobileNumValidation}
                            >
                            </Select>

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
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                // placeholder="لطفا انتخاب نمایید"
                                options={currencySource}
                            >
                            </Select>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="شناسه معامله دو صرافی" name="matchingExchangeRow" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="کد صرافی معامله دو صرافی" name="traderSarafId" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="  تاریخ ایجاد  " name="createDate" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="معادل ریال" name="rialAmountCalc" className='ant-input-group-addon'                          >
                            <InputNumber placeholder=" کد " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="معادل دلار  " name="dollarAmount" className='ant-input-group-addon'                          >
                            <InputNumber placeholder=" کد " formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{
                                    width: '100%',
                                }}
                            ></InputNumber >
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" کد رهگیری ناخدا" name="nakhodaTrackingCode" className='ant-input-group-addon'                          >
                            <Input ></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ ایجاد" className='ant-input-group-addon'                          >
                            {/* <DatePicker 
                            //   defaultValue={dayjs("1402/01/01", {jalali:true})}
                            //  defaultValue={dayjs(form.getFieldValue("createDate"))}
                              //defaultValue={dayjs(form.getFieldValue("birthDate"), {jalali:true})}
                              defaultValue={()=>{
                                console.log(form.getFieldValue("birthDate"));
                                const date = dayjs("1400-11-11", { jalali: true });
                                return date;
                              }}
                            ></DatePicker> */}
                            {/* <DatePickerCustom /> */}
                            <DatePicker showTime defaultValue={dayjs("1402/01/01", {jalali:true})} onChange={onchangeCreateDate} format="YYYY-MM-DD HH:mm:ss"/>
                        </Form.Item>
                    </Col>
                   
                </Row>

                {/* </Space> */}
            </Form>
        </Card>

    )
}

export default ExchangesDetail
