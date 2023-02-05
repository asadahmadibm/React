import react, { useState } from 'react'
import moment from 'jalali-moment';
import AdminGrid from '../Admin-Grid/AdminGrid';

const NimaRequest = () => {
    const [paymentMethod] = useState([{ indexField: 1, valueField: "مناقصه"}, { indexField: 2, valueField: "سفارش به يک صرافی مشخص" }]);
    const [paymentType] = useState([{ indexField: 0, valueField: "مصوب " }, { indexField: 1, valueField:"آزاد"}, { indexField: 2, valueField:"تعیین شده توسط بانک مرکزی" }, { indexField:9, valueField:  "آزاد"}]);
    const [sourceInsertedType] = useState([{ indexField: 1, valueField:"سامانه جامع تجارت " }, { indexField:2, valueField:  "بانک"}]);
    const getEnumValue = (code, formattingInfo) => {
        let foundItem = formattingInfo.find(({ indexField }) => indexField === code);
        if (!foundItem) return;
        return foundItem.valueField;
    }
    const [columnDefs] = useState([
        { field: 'requestCode', sortable: true, headerName: "کد درخواست ", filter: 'agNumberColumnFilter', width: 120 },
        { field: 'sabteSefareshCode', sortable: true, headerName: "کد ثبت سفارش", filter: 'agNumberColumnFilter', width: 138 },
        { field: 'currencyName', sortable: true, headerName: "نام ارز", filter: 'agTextColumnFilter', width: 170 },
        { field: 'amount', sortable: true, headerName: "مبلغ", filter: 'agNumberColumnFilter', width: 130, valueFormatter: params => Number(params.value).toLocaleString() },
        { field: 'destinationCountry', sortable: true, headerName: " کشور مقصد", filter: 'agTextColumnFilter', width: 160 },
        {
            field: 'paymentDeadline', sortable: true, headerName: " مهلت پرداخت  ", filter: 'agNumberColumnFilter', width: 170,
            valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : ""
        },
        {
            field: 'requestValidityDate', sortable: true, headerName: "تاریخ اعتبار درخواست    " , filter: 'agNumberColumnFilter', width: 170,
            valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : ""
        },
        {
            field: 'requestType', sortable: true, headerName: "نوع درخواست" , filter: 'agSetColumnFilter', width: 150,
            valueFormatter: params => getEnumValue(params.value, paymentMethod),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, paymentMethod), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(paymentMethod.map(item => item.indexField)) }
            }
        },
        {
            field: 'currencyRateType', sortable: true, headerName:  "نوع نرخ" , filter: 'agSetColumnFilter', width: 160,
            valueFormatter: params => getEnumValue(params.value, paymentType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, paymentType),//getEnumValue(Number(params.value), paymentType),
                values: (params) => { params.success(paymentType.map(item => item.indexField)) }
            }
        },
        {
            field: 'requestRegistrationDate', sortable: true, headerName: "تاریخ درخواست "  , filter: 'agNumberColumnFilter', width: 170,
            valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : "1111"
        },
        {
            field: 'sourceInserted', sortable: true, headerName: " ثبت کننده درخواست"  , filter: 'agSetColumnFilter', width: 150,
            valueFormatter: params => getEnumValue(params.value, sourceInsertedType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, sourceInsertedType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(sourceInsertedType.map(item => item.indexField)) }
            }
        },
    ])

    return (
        <div style={{ height: 250, width: 1300 }}>
        <AdminGrid columnDefs={columnDefs} title="درخواستهای ارز" apiname="NimaRequest" />
        </div>

    )
}
export default NimaRequest


