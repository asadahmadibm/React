import react, { useState } from 'react'
import moment from 'jalali-moment';
import AdminGrid from '../Admin-Grid/AdminGrid';

const CompanyReport = () => {
    const [paymentMethod] = useState([{ indexField: 1, valueField: "مناقصه"}, { indexField: 2, valueField: "سفارش به يک صرافی مشخص" }]);
    const [paymentType] = useState([{ indexField: 0, valueField: "مصوب " }, { indexField: 1, valueField:"آزاد"}, { indexField: 2, valueField:"تعیین شده توسط بانک مرکزی" }, { indexField:9, valueField:  "آزاد"}]);
    const [sourceInsertedType] = useState([{ indexField: 1, valueField:"سامانه جامع تجارت " }, { indexField:2, valueField:  "بانک"}]);
    const getEnumValue = (code, formattingInfo) => {
        let foundItem = formattingInfo.find(({ indexField }) => indexField === code);
        if (!foundItem) return;
        return foundItem.valueField;
    }
    const [columnDefs] = useState([
        { field: 'companycode', sortable: true, headerName: "کد شرکت ", filter: 'agNumberColumnFilter', width: 120 },
        { field: 'companyname', sortable: true, headerName: " نام شرکت", filter: 'agNumberColumnFilter', width: 200 },
        {
            field: 'group', sortable: true, headerName: "گروه " , filter: 'agSetColumnFilter', width: 150,
            valueFormatter: params => getEnumValue(params.value, paymentMethod),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, paymentMethod), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(paymentMethod.map(item => item.indexField)) }
            }
        },
        {
            field: 'industry', sortable: true, headerName: "صنعت " , filter: 'agSetColumnFilter', width: 150,
            valueFormatter: params => getEnumValue(params.value, paymentMethod),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, paymentMethod), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(paymentMethod.map(item => item.indexField)) }
            }
        },
        { field: 'address', sortable: true, headerName: "  آدرس", filter: 'agTextColumnFilter', width: 300 },
        {
            field: 'region', sortable: true, headerName: "ناحیه " , filter: 'agSetColumnFilter', width: 150,
            valueFormatter: params => getEnumValue(params.value, paymentMethod),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, paymentMethod), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(paymentMethod.map(item => item.indexField)) }
            }
        },
        { field: 'email', sortable: true, headerName: "  ایمیل", filter: 'agTextColumnFilter', width: 150 },
        { field: 'moaref', sortable: true, headerName: "  معرف", filter: 'agTextColumnFilter', width: 100 },
        { field: 'buyer', sortable: true, headerName: "  خریدار", filter: 'agTextColumnFilter', width: 100 },
        { field: 'registrator', sortable: true, headerName: "  ثبت کننده", filter: 'agTextColumnFilter', width: 200 },
        {
            field: 'registerDate', sortable: true, headerName: "تاریخ ثبت     " , filter: 'agNumberColumnFilter', width: 170,
            valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : ""
        },
      
    ])

    return (
        <AdminGrid columnDefs={columnDefs} title="لیست شرکتها" apiname="CompanyReport" />

    )
}
export default CompanyReport


