import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RialiPaymentDetail = () => {
    let params = useLocation();
    const[detail,setDetail]=useState(null)

    useEffect(() => {
        axios.get("/RialiPaymentReport?transactionId=" + Number(params.state.transactionId))
        .then(res => {
            //setDetail(res.data.data);
            console.log(res.data.data);

        }).catch(err => {
            toast.warn("اشکال در فراخوانی اتطلاعات");

        }).finally(() => {
        });
    }, []);
   

    return (
        <div>
            <h2>جزییات </h2>
            
        </div>
    )
}

export default RialiPaymentDetail

