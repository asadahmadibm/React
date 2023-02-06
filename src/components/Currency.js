import react, { useState } from 'react'
import moment from 'jalali-moment';
import AdminGrid from './Admin-Grid/AdminGrid';
const Currency = () => {

    const [columnDefs] = useState([
        { field: 'currencyId' , sortable: true ,headerName:"کد" , filter: 'agNumberColumnFilter'},
        { field: 'englishNm' ,headerName:"نام لاتین", filter: 'agTextColumnFilter'},
        { field: 'farsiNm' ,headerName:"نام فارسی", filter: 'agTextColumnFilter'}
    ])

    return (
        <AdminGrid columnDefs={columnDefs} title=" لیست ارزها" apiname="Currency" />
    )
}
export default Currency