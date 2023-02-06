import react, { useState } from 'react'
import moment from 'jalali-moment';
import AdminGrid from '../../Admin-Grid/AdminGrid';

const ExchangeReport = () => {
    const [paymentType] = useState([{ indexField: 1, valueField: "نقدی " }, { indexField: 2, valueField: "حواله" }]);
    const [transactionType] = useState([{ indexField: 1, valueField: "خرید " }, { indexField: 2, valueField: "فروش" }]);
    const [customerType] = useState([{ indexField: 1, valueField: "حقیقی " }, { indexField: 2, valueField: "حقوقی" }, { indexField: 3, valueField: "تابعه خارجی" }]);
    const [nationalIdValidation] = useState([{ indexField: 0, valueField: "  استعلام نشده " }, { indexField: 1, valueField: "معتبر  " }, { indexField: 2, valueField: " نامعتبر" }, { indexField: 3, valueField: " معتبر" }, { indexField: 4, valueField: " معتبر" }, { indexField: 5, valueField: " معتبر" }, { indexField: 6, valueField: " معتبر" }, { indexField: 255, valueField: "" }]);
    const [statusType] = useState([{ indexField: 0, valueField: "معتبر " }, { indexField: 1, valueField: "استفاده شده" }, { indexField: 2, valueField: "باطل شده" }]);
    const [mobileNumValidation] = useState([{ indexField: 0, valueField: "استعلام نشده " }, { indexField: 1, valueField: " معتبر" }, { indexField: 2, valueField: "نامعتبر" }, { indexField: 3, valueField: "نامشخص" }]);
    const [currencySource] = useState([{ indexField: 1, valueField: "منابع داخلی " }, { indexField: 2, valueField: "منابع بانک مرکزی" }, { indexField: 3, valueField: " از محل خرید از بازار متشکل ارزی ایران" }, { indexField: 4, valueField: " از محل خرید از بازار متشکل ارزی ایران - صادرات" }]);


    const getEnumValue = (code, formattingInfo) => {
        let foundItem = formattingInfo.find(({ indexField }) => indexField === code);
        if (!foundItem) return;
        return foundItem.valueField;
    }


    const [columnDefs] = useState([
        { field: 'id', sortable: true, headerName: "شناسه  ", filter: 'agNumberColumnFilter', width: 120 },
        { field: 'trackingCode', sortable: true, headerName: "شماره رهگیری", filter: 'agTextColumnFilter', width: 138 },
        { field: 'firstName', sortable: true, headerName: "نام ", filter: 'agTextColumnFilter', width: 120 },
        { field: 'lastName', sortable: true, headerName: "نام خانوادگی", filter: 'agTextColumnFilter', width: 130 },
        { field: 'companyName', sortable: true, headerName: "نام شرکت ", filter: 'agTextColumnFilter', width: 200 },
        { field: 'nationalId', sortable: true, headerName: "کد/شناسه ملی ", filter: 'agTextColumnFilter', width: 130 },
        { field: 'shId', sortable: true, headerName: "شماره شناسنامه/ثبت شرکت ", filter: 'agTextColumnFilter', width: 150 },
        { field: 'birthDate', sortable: true, headerName: "تاریخ تولد/ثبت شرکت ", filter: 'agTextColumnFilter', width: 150 },
        { field: 'mobileNumber', sortable: true, headerName: "شماره موبایل ", filter: 'agTextColumnFilter', width: 130 },
        {
            field: 'date', sortable: true, headerName: "تاریخ معامله ", filter: 'agNumberColumnFilter', width: 130,
            valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : "1111"
        },
        { field: 'currencyId', sortable: true, headerName: "کد ارز ", filter: 'agNumberColumnFilter', width: 130 },
        { field: 'currencyName', sortable: true, headerName: "نام ارز ", filter: 'agTextColumnFilter', width: 160 },
        { field: 'amount', sortable: true, headerName: "مقدار ", filter: 'agNumberColumnFilter', width: 150, valueFormatter: params => Number(params.value).toLocaleString() },
        { field: 'rate', sortable: true, headerName: "نرخ ", filter: 'agNumberColumnFilter', width: 130 },
        {
            field: 'paymentType', sortable: true, headerName: "نوع معامله ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, paymentType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, paymentType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(paymentType.map(item => item.indexField)) }
            }
        },
        { field: 'chequeId', sortable: true, headerName: "شماره حواله ", filter: 'agTextColumnFilter', width: 130 },
        {
            field: 'transactionType', sortable: true, headerName: "نوع عملیات ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, transactionType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, transactionType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(transactionType.map(item => item.indexField)) }
            }
        },
        {
            field: 'customerType', sortable: true, headerName: "نوع مشتری ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, customerType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, customerType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(customerType.map(item => item.indexField)) }
            }
        },
        {
            field: 'nationalIdValidation', sortable: true, headerName: "وضعیت احراز هویت  ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, nationalIdValidation),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, nationalIdValidation), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(nationalIdValidation.map(item => item.indexField)) }
            }
        },
        { field: 'sarafiId', sortable: true, headerName: "کد صرافی ", filter: 'agNumberColumnFilter', width: 130 },
        { field: 'username', sortable: true, headerName: "نام کاربری ", filter: 'agTextColumnFilter', width: 170 },
        { field: 'agentNationalId', sortable: true, headerName: "کد ملی نماینده ", filter: 'agTextColumnFilter', width: 170 },
        { field: 'agentShId', sortable: true, headerName: "شماره شناسنامه نماینده ", filter: 'agTextColumnFilter', width: 170 },
        { field: 'agentBirthDate', sortable: true, headerName: "تاریخ تولد نماینده ", filter: 'agTextColumnFilter', width: 170 },
        {
            field: 'agentNationalIdValidation', sortable: true, headerName: "وضعیت احراز هویت نماینده مشتری ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, nationalIdValidation),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, nationalIdValidation), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(nationalIdValidation.map(item => item.indexField)) }
            }
        },
        { field: 'refTrackingCode', sortable: true, headerName: "شناسه رکورد ابطال شده  ", filter: 'agNumberColumnFilter', width: 170 },
        {
            field: 'status', sortable: true, headerName: "وضعیت ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, statusType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, statusType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(statusType.map(item => item.indexField)) }
            }
        },
        { field: 'lastUserModifiedBy', sortable: true, headerName: "اخربن کاربر ویرایش کننده ", filter: 'agTextColumnFilter', width: 170 },
        { field: 'lastModifiedDate', sortable: true, headerName: "اخرین تاریخ ویرایش رکورد ", filter: 'agNumberColumnFilter', width: 170, valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : "" },
        { field: 'currencyCoefficient', sortable: true, headerName: "ضریب ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'currencyUseId', sortable: true, headerName: "سرفصل ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'euroAmount', sortable: true, headerName: "معادل یورو  ", filter: 'agNumberColumnFilter', width: 170, valueFormatter: params => Number(params.value).toLocaleString() },
        {
            field: 'mobileNumValidation', sortable: true, headerName: "وضعیت احراز هویت موبایل مشتری ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, mobileNumValidation),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, mobileNumValidation), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(mobileNumValidation.map(item => item.indexField)) }
            }
        },
        {
            field: 'currencySource', sortable: true, headerName: "منبع ارز ", filter: 'agSetColumnFilter', width: 200,
            valueFormatter: params => getEnumValue(params.value, currencySource),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, currencySource), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(currencySource.map(item => item.indexField)) }
            }
        },
        { field: 'matchingExchangeRow', sortable: true, headerName: "شناسه معامله دو صرافی ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'traderSarafId', sortable: true, headerName: "کد صرافی معامله دو صرافی ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'createDate', sortable: true, headerName: "تاریخ ایجاد رکورد ", filter: 'agNumberColumnFilter', width: 170, valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : "" },
        { field: 'rialAmountCalc', sortable: true, headerName: "معادل ریال ", filter: 'agNumberColumnFilter', width: 200, valueFormatter: params => Number(params.value).toLocaleString() },
        { field: 'dollarAmount', sortable: true, headerName: "معادل دلار ", filter: 'agNumberColumnFilter', width: 170, valueFormatter: params => Number(params.value).toLocaleString() },
        { field: 'nakhodaTrackingCode', sortable: true, headerName: " کد رهگیری ناخدا ", filter: 'agTextColumnFilter', width: 170 },



    ])

    return (
        <AdminGrid columnDefs={columnDefs} title="گزارش خرید و فروش ارز" apiname="Exchanges" pageDetail="ExchangesDetail"/>
    )
}

export default ExchangeReport
