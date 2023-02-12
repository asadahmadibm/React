import react, { useState, useMemo, useCallback, useRef } from 'react'
import { useEffect } from 'react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from 'antd';
import axios from 'axios';
import fileDownload from 'js-file-download';

export const ExportToExcel = ({ fileName, serverRowsRequest }) => {

    // const [exceldata, setExceldata] = useState([])
    // const fileType =
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    // const fileExtension = ".xlsx";

    // const exportToCSV = (apiData, fileName) => {
    //     const ws = XLSX.utils.json_to_sheet(apiData);
    //     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    //     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    //     const data = new Blob([excelBuffer], { type: fileType });
    //     FileSaver.saveAs(data, fileName + fileExtension);
    // };


    const onClick = () => {
        console.log("onclick");
       

       

        axios.post("/Export" + fileName, serverRowsRequest, { timeout: 90000 ,responseType: 'blob'})
        .then(res => {

            // params.successCallback(res.data.data.list, res.data.data.totalCount);
            // const customHeadings = res.data.data.list.map(item=>({
            //     "Article Id": item.id,
            //     "Article Title": item.title
            //   }))

            //    setData(customHeadings) 
            // setExceldata(res.data.data.list);
            // exportToCSV(res.data.data.list, fileName)
            const fileExtension = ".xls";
            console.log(res.data);
            FileSaver.saveAs(res.data, fileName + fileExtension);
            //fileDownload(res.data.data, fileName+".xls");


        }).catch(err => {
            // params.successCallback([], 0);
            toast.warn("اشکال در فراخوانی اطلاعات");
        }).finally(() => {
        });

    }

    return (
        <Button type='primary' onClick={onClick}>ارسال به اکسل</Button>
    );
};