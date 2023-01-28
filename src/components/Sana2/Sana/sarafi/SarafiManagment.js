import axios from "axios";
import React, { useState, useEffect } from "react";

const SarafiManagment = () => {

    const [currentPage, SetCurrentPage] = useState(0);
    const [pageSize, SetPageSize] = useState(10);

    useEffect(() => {
        const requestData = {
            SarafiData: '',
            accessToSecondRate: '',
            currentPage: currentPage,
            pageSize: pageSize
        };
        console.log(requestData);
        const headers = { 
            'Authorization': 'Bearer '+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI0NTI1IiwidW5pcXVlX25hbWUiOiJjb250LmFobWFkaXkiLCJmdWxsTmFtZSI6Itin2LPYudivINin2K3Zhdiv24wiLCJwZXJtaXNzaW9uIjoiU3lzQWRtaW4iLCJsYXN0TG9naW5nRGF0ZSI6Itux27TbsNuxL9ux27Ev27DbtSDbsduwOtu127MiLCJuYmYiOjE2NzQ2NDMxMjgsImV4cCI6MTY3NDY1MzkyOCwiaWF0IjoxNjc0NjQzMTI4fQ.zIpHPIXW2c1V6eHsuFohy5paVnAGdz6Izw2xaLrJ_vM",
            "Content-Type": 'application/json',
            };
            axios.post('http://sana2ap.cbi.net/api/SarafiManagment/PostSarafiList', requestData, { headers })
            .then(response => 
                {
                    console.log(response.data);
                })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <div>
            SarafiManagment
        </div>
    )
}
export default SarafiManagment