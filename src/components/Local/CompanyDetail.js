import react, { useState, useMemo, useCallback, useRef } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { AutoComplete, Checkbox, Button, Switch, InputNumber, Space, Select, Form, Input, message, Tabs } from 'antd';
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
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const DatePickerCustom = ({ value, onChange }) => {
    return <DatePicker showTime allowClear={false} value={value != undefined ? dayjs(value) : ""} onChange={onChange} format="HH:mm:ss YYYY-MM-DD " />
};


const CompanyDetail = () => {

    const localeText = useMemo(() => {
        return {
            "selectAll": "(انتخاب همه)",
            "selectAllSearchResults": "(انتخاب همه نتایج جستجو)",
            "searchOoo": "جستجو ...",
            "blanks": "(خالی)",
            "blank": "خالی",
            "notBlank": "خالی نیست",
            "noMatches": "مطابقتی ندارد",
            "filterOoo": "فیلتر ...",
            "equals": "برابر با",
            "notEqual": "برابر نیست با",
            "empty": "انتخاب یکی",
            "lessThan": "کوچکتر از",
            "greaterThan": "بزرگتر از",
            "lessThanOrEqual": "کوچکتر یا مساوی با",
            "greaterThanOrEqual": "بزرگتر یا مساوی با",
            "inRange": "در محدوده",
            "inRangeStart": "از",
            "inRangeEnd": "تا",
            "contains": "شامل",
            "notContains": "شامل نمی شود",
            "startsWith": "شروع می شود با",
            "endsWith": "به پایان می رسد با",
            "dateFormatOoo": "yyyy-mm-dd",
            "andCondition": "و",
            "orCondition": "یا",
            "applyFilter": "اعمال",
            "resetFilter": "تنظیم مجدد",
            "clearFilter": "پاک کردن",
            "cancelFilter": "لغو",
            "textFilter": "فیلتر متن",
            "numberFilter": "فیلتر عدد",
            "dateFilter": "فیلتر تاریخ",
            "setFilter": "تنظیم فیلتر",
            "columns": "ستون‌ها",
            "filters": "فیلترها",
            "pivotMode": "حالت محوری",
            "groups": "گروه‌های ردیف",
            "rowGroupColumnsEmptyMessage": "برای تنظیم گروه های ردیف اینجا را بکشید",
            "values": "مقادیر",
            "valueColumnsEmptyMessage": "برای جمع آوری اینجا را بکشید",
            "pivots": "برچسب‌های ستون",
            "pivotColumnsEmptyMessage": "برای تنظیم برچسب های ستون، اینجا را بکشید",
            "group": "گروه",
            "loadingOoo": "در حال بارگذاری داده‌ها ...",
            "noRowsToShow": "محتوایی برای نمایش وجود ندارد",
            "enabled": "فعال شد",
            "pinColumn": "سنجاق ستون",
            "pinLeft": "سنجاق سمت  چپ",
            "pinRight": "سنجاق سمت راست",
            "noPin": "بدون سنجاق",
            "valueAggregation": "جمع مقادیر",
            "autosizeThiscolumn": "اندازه خودکار این ستون",
            "autosizeAllColumns": "اندازه خودکار همه ستون‌ها",
            "groupBy": "دسته‌بندی براساس",
            "ungroupBy": "لغو گروه‌بندی توسط",
            "resetColumns": "تنظیم مجدد ستون‌ها",
            "expandAll": "باز کردن همه",
            "collapseAll": "بستن همه",
            "copy": "کپی",
            "ctrlC": "Ctrl+C",
            "copyWithHeaders": "کپی با هدر",
            "paste": "پیست",
            "ctrlV": "Ctrl+V",
            "export": "خروجی",
            "csvExport": "خروجی CSV",
            "excelExport": "خروجی Excel",
            "sum": "جمع",
            "min": "کمترین",
            "max": "بیشترین",
            "none": "هیچ یک",
            "count": "تعداد",
            "avg": "میانگین",
            "filteredRows": "فیلتر شده",
            "selectedRows": "انتخاب شده",
            "totalRows": "تعداد ردیف‌ها",
            "totalAndFilteredRows": "ردیف‌ها",
            "more": "بیشتر",
            "to": "تا",
            "of": "از",
            "page": "صفحه",
            "nextPage": "صفحه بعدی",
            "lastPage": "آخرین صفحه",
            "firstPage": "اولین صفحه",
            "previousPage": "صفحه قبلی",
            "pivotColumnGroupTotals": "جمع",
            "pivotChartAndPivotMode": "نمودار محوری و حالت محوری",
            "pivotChart": "نمودار محوری",
            "chartRange": "نمودار این محدوده",
            "columnChart": "ستونی",
            "groupedColumn": "گروه بندی شده",
            "stackedColumn": "انباشته شده",
            "normalizedColumn": "۱۰۰٪ انباشته شده",
            "barChart": "نمودار میله‌ای",
            "groupedBar": "گروه بندی شده",
            "stackedBar": "انباشته شده",
            "normalizedBar": "۱۰۰٪ انباشته شده",
            "pieChart": "نمودار دایره‌ای",
            "pie": "نمودار دایره‌ای",
            "doughnut": "نمودار دونات",
            "line": "نمودار خطی",
            "xyChart": "X Y (پراکنده)",
            "scatter": "پراکنده کردن",
            "bubble": "حباب",
            "areaChart": "منطقه",
            "area": "منطقه",
            "stackedArea": "انباشته شده",
            "normalizedArea": "۱۰۰٪ انباشته شده",
            "histogramChart": "هیستوگرام",
            "pivotChartTitle": "نمودار محوری",
            "rangeChartTitle": "نمودار محدوده",
            "settings": "تنظیمات",
            "data": "داده",
            "format": "فرمت",
            "categories": "دسته‌بندی‌ها",
            "defaultCategory": "(خالی)",
            "series": "سری",
            "xyValues": "مقادیر X Y",
            "paired": "حالت جفت شده",
            "axis": "محور",
            "navigator": "ناوبر",
            "color": "رنگ",
            "thickness": "ضخامت",
            "xType": "نوع X",
            "automatic": "خودکار",
            "category": "دسته‌بندی",
            "number": "عدد",
            "time": "زمان",
            "xRotation": "X چرخش محور",
            "yRotation": "Y چرخش محور",
            "ticks": "کنه‌ها",
            "width": "عرض",
            "height": "ارتفاع",
            "length": "طول",
            "padding": "فاصله درونی",
            "spacing": "فاصله گذاری",
            "chart": "نمودار",
            "title": "عنوان",
            "titlePlaceholder": "عنوان نمودار - برای ویرایش دوبار کلیک کنید",
            "background": "پس‌زمینه",
            "font": "فونت",
            "top": "بالا",
            "right": "راست",
            "bottom": "پایین",
            "left": "چپ",
            "labels": "عنوان",
            "size": "سایز",
            "minSize": "حداقل اندازه",
            "maxSize": "حداکثر اندازه",
            "legend": "افسانه",
            "position": "موقعیت",
            "markerSize": "اندازه نشانگر",
            "markerStroke": "نشانگر سکته",
            "markerPadding": "فاصله درونی نشانگر",
            "itemSpacing": "فاصله مورد",
            "itemPaddingX": "فاصله درونی عرضی",
            "itemPaddingY": "فاصلی درونی افقی",
            "layoutHorizontalSpacing": "فاصله افقی",
            "layoutVerticalSpacing": "فاصله عمودی",
            "strokeWidth": "عرض ضربه",
            "offset": "انحراف",
            "offsets": "انحراف‌ها",
            "tooltips": "عنوان کمکی",
            "callout": "فراخوانی",
            "markers": "نشانگرها",
            "shadow": "سایه",
            "blur": "تاری",
            "xOffset": "انحراف عرضی",
            "yOffset": "انحراف افقی",
            "lineWidth": "عرض خط",
            "normal": "معمولی",
            "bold": "پررنگ",
            "italic": "کج",
            "boldItalic": "پررنگ و کج",
            "predefined": "از پیش تعریف شده",
            "fillOpacity": "پر کردن شفافیت",
            "strokeOpacity": "شفافیت خط",
            "histogramBinCount": "سطل شمارش",
            "columnGroup": "ستون",
            "barGroup": "میله‌ای",
            "pieGroup": "دایره‌ای",
            "lineGroup": "خطی",
            "scatterGroup": "X Y (پراکنده)",
            "areaGroup": "منطقه",
            "histogramGroup": "هیستوگرام",
            "groupedColumnTooltip": "گروه‌بندی شده",
            "stackedColumnTooltip": "انباشه شده",
            "normalizedColumnTooltip": "۱۰۰٪ انباشته شده",
            "groupedBarTooltip": "گروه‌بندی شده",
            "stackedBarTooltip": "انباشته شده",
            "normalizedBarTooltip": "۱۰۰٪ انباشته شده",
            "pieTooltip": "دایره‌ای",
            "doughnutTooltip": "دونات",
            "lineTooltip": "خطی",
            "groupedAreaTooltip": "منطقه",
            "stackedAreaTooltip": "انباشته شده",
            "normalizedAreaTooltip": "۱۰۰٪ انباشته شده",
            "scatterTooltip": "پراکنده کردن",
            "bubbleTooltip": "حباب",
            "histogramTooltip": "هیستوگرام",
            "noDataToChart": "هیچ داده ای برای ترسیم نمودار موجود نیست.",
            "pivotChartRequiresPivotMode": "نمودار محوری باید حالت محوری فعال باشد.",
            "chartSettingsToolbarTooltip": "منو",
            "chartLinkToolbarTooltip": "متصل کردن به جدول",
            "chartUnlinkToolbarTooltip": "لغو اتصال به جدول",
            "chartDownloadToolbarTooltip": "دانلود نمودار",
            "ariaHidden": "مخفی",
            "ariaVisible": "قابل رویت",
            "ariaChecked": "بررسی شده",
            "ariaUnchecked": "بررسی نشده",
            "ariaIndeterminate": "نامشخص",
            "ariaDefaultListName": "لیست",
            "ariaColumnSelectAll": "گزینه انتخاب همه ستون‌ها را تغییر دهید",
            "ariaInputEditor": "ویرایشگر ورودی",
            "ariaDateFilterInput": "ورودی فیلتر تاریخ",
            "ariaFilterList": "لیست فیلتر",
            "ariaFilterInput": "ورودی فیلتر",
            "ariaFilterColumnsInput": "فیلتر ورودی ستون‌ها",
            "ariaFilterValue": "فیلتر مقادیر",
            "ariaFilterFromValue": "فیلتر از مقدار",
            "ariaFilterToValue": "فیلتر تا مقدار",
            "ariaFilteringOperator": "عملیات فیلترینگ",
            "ariaColumn": "ستون",
            "ariaColumnList": "لیست ستون",
            "ariaColumnGroup": "گروه ستون",
            "ariaRowSelect": "برای انتخاب این ردیف، SPACE را فشار دهید",
            "ariaRowDeselect": "برای لغو انتخاب این ردیف، SPACE را فشار دهید",
            "ariaRowToggleSelection": "برای تغییر وضعیت انتخاب ردیف، Space را فشار دهید",
            "ariaRowSelectAll": "Space را فشار دهید تا انتخاب همه ردیف‌ها تغییر کند",
            "ariaToggleVisibility": "برای تغییر حالت دید، SPACE را فشار دهید",
            "ariaSearch": "جستجو",
            "ariaSearchFilterValues": "جستجوی مقادیر فیلتر",
            "ariaLabelColumnMenu": "منو ستون",
            "ariaLabelCellEditor": "ویرایشگر سلول",
            "ariaLabelDialog": "گفتگو",
            "ariaLabelSelectField": "انتخب فیلد",
            "ariaLabelTooltip": "عنوان کمکی",
            "ariaLabelContextMenu": "منوی زمینه",
            "ariaLabelSubMenu": "زیر منو",
            "ariaLabelAggregationFunction": "تابع جمع"
        };
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            // flex: 1,
            filter: false,
            sortable: true,
            floatingFilter: false,
            resizable: true,
        };
    }, []);

    const [columnDefsProduct] = useState([
        { field: 'id', sortable: true, headerName: "ردبف  ", filter: 'agNumberColumnFilter', width: 100 },
        { field: 'product', sortable: true, headerName: " محصول", filter: 'agTextColumnFilter', width: 138 },
        { field: 'count', sortable: true, headerName: "تعداد ", filter: 'agTextColumnFilter', width: 100 },
        { field: 'desc', sortable: true, headerName: " توضیحات", filter: 'agTextColumnFilter', width: 300 },
    ]);

    const [columnDefsTel] = useState([
        { field: 'id', sortable: true, headerName: "ردبف", filter: 'agNumberColumnFilter', width: 100 },
        { field: 'tel', sortable: true, headerName: " تلفن", filter: 'agTextColumnFilter', width: 138 },
        { field: 'type', sortable: true, headerName: "نوع ", filter: 'agTextColumnFilter', width: 100 },
        { field: 'desc', sortable: true, headerName: " توضیحات", filter: 'agTextColumnFilter', width: 300 },
    ]);

    const [columnDefsConnection] = useState([
        { field: 'id', sortable: true, headerName: "ردبف", filter: 'agNumberColumnFilter', width: 100 },
        { field: 'namefamily', sortable: true, headerName: " نام و نام خانوادگی", filter: 'agTextColumnFilter', width: 200 },
        { field: 'semat', sortable: true, headerName: "سمت ", filter: 'agTextColumnFilter', width: 100 },
        { field: 'tel', sortable: true, headerName: " تلفن", filter: 'agTextColumnFilter', width: 100 },
        { field: 'email', sortable: true, headerName: " ایمیل", filter: 'agTextColumnFilter', width: 200 },
        { field: 'active', sortable: true, headerName: " فعال", filter: 'agTextColumnFilter', width: 100 },
        { field: 'sendemail', sortable: true, headerName: " عدم ارسال ایمیل", filter: 'agTextColumnFilter', width: 200 },
        { field: 'desc', sortable: true, headerName: " توضیحات", filter: 'agTextColumnFilter', width: 300 },

    ]);

    const [rowDataProduct, setRowDataProduct] = useState([]);
    const [rowDataTel, setRowDataTel] = useState([]);
    const [rowDataConnection, setRowDataConnection] = useState([]);




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

    const { TextArea } = Input;

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
            description: "شرح شرکتی که در این تاریخ ثبت شده است",
            moaref: "معرف",
            selectivegroup: "گروه های انتخابی",
            buyer: "خریدار",
            registrator: "اسعد احمدی",
            registerDate: moment(dayjs(new Date(), { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')

        });
        setRowDataProduct([
            { id: "1", product: "محصول اول", count: 12, desc: "شرح محصول اول" },
        ]);

        setRowDataTel([
            { id: "1", tel: "021-664952128", type: "نوع اول", desc: "شرح تلفن اول" },
            { id: "2", tel: "021-9454545", type: "نوع دوم", desc: "شرح تلفن دوم" },
            { id: "3", tel: "021-55664", type: "نوع سوم", desc: "شرح تلفن سوم" },
            { id: "4", tel: "021-8788", type: "نوع چهارم", desc: "شرح تلفن چهارم" },
        ])


        setRowDataConnection([
            { id: "1", namefamily: "اسعد احمدی", semat: 12, tel: "021956654654" , email: "asad.ahmadi@gmail.com", active: true, sendemail: false, desc: "شرح ارتباطات اول" },
        ]);
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
                <Button type="primary" htmlType="submit" onClick={onSave}>ذخیره  </Button>
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

                    </Col>
                    <Col lg={6} md={12} sm={12} >
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
                    <Col lg={6} md={12} sm={12} >
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
                        <Form.Item label="ناحیه" name="region" className='ant-input-group-addon'>
                            <Input placeholder="  ناحیه "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="ایمیل" name="email" className='ant-input-group-addon'>
                            <Input placeholder="  ایمیل "></Input>
                        </Form.Item>
                    </Col>

                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="معرف" name="moaref" className='ant-input-group-addon'>
                            <Input placeholder="  معرف "></Input>
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
                        <Form.Item label="توضیحات" rows={4} name="description" className='ant-input-group-addon'>
                            {/* <Input rows={4} placeholder="  توضیحات "></Input> */}
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col lg={6} md={12} sm={12} >
                        <Form.Item label="گروه انتخابی" name="selectivegroup" className='ant-input-group-addon'>
                            <Input placeholder="  گروه انتخابی "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ ثبت" name="registerDate">
                            <DatePickerCustom onChange={onchangeDate} />

                        </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={12} >
                        <Tabs type='card' defaultActiveKey="1" items={
                            [
                                {
                                    key: '1',
                                    label: `محصولات`,
                                    children:
                                        <Col lg={6} md={12} sm={12} >
                                            <div style={{ height: "300px", width: "100%" }}>
                                                <AgGridReact
                                                    // onGridReady={onGridReady}
                                                    className="ag-theme-alpine"
                                                    enableRtl="true"
                                                    headerHeight="30"
                                                    rowHeight="30"
                                                    rowSelection={"single"}
                                                    localeText={localeText}
                                                    defaultColDef={defaultColDef}
                                                    columnDefs={columnDefsProduct}
                                                    rowData={rowDataProduct}

                                                >
                                                </AgGridReact>
                                            </div>
                                        </Col>
                                    ,
                                },
                                {
                                    key: '2',
                                    label: `شماره تماس`,
                                    children:
                                        <Col lg={6} md={12} sm={12} >
                                            <div style={{ height: "300px", width: "100%" }}>
                                                <AgGridReact
                                                    // onGridReady={onGridReady}
                                                    className="ag-theme-alpine"
                                                    enableRtl="true"
                                                    headerHeight="30"
                                                    rowHeight="30"
                                                    rowSelection={"single"}
                                                    localeText={localeText}
                                                    defaultColDef={defaultColDef}
                                                    columnDefs={columnDefsTel}
                                                    rowData={rowDataTel}

                                                >
                                                </AgGridReact>
                                            </div>
                                        </Col>,
                                },
                                {
                                    key: '3',
                                    label: `رابط ها`,
                                    children: 
                                    <Col lg={12} md={12} sm={12} >
                                    <div style={{ height: "300px", width: "100%" }}>
                                        <AgGridReact
                                            // onGridReady={onGridReady}
                                            className="ag-theme-alpine"
                                            enableRtl="true"
                                            headerHeight="30"
                                            rowHeight="30"
                                            rowSelection={"single"}
                                            localeText={localeText}
                                            defaultColDef={defaultColDef}
                                            columnDefs={columnDefsConnection}
                                            rowData={rowDataConnection}

                                        >
                                        </AgGridReact>
                                    </div>
                                </Col>,
                                },
                            ]
                        } />
                    </Col>

                </Row>

                {/* </Space> */}
            </Form>


        </Card>


    )
}

export default CompanyDetail

