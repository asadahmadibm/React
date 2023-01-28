import react, { useState, useMemo ,useCallback } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Pagination from '../../Pagination';
import { Alert } from 'antd';
import '../../Pagination.css'
// import 'ag-grid-enterprise';
const Report = () => {
	const [rowData, setRowData] = useState('');
	const [pageindex, setPageindex] = useState(1);
	const [totalRows, setTotalRows] = useState(0);
	const [columnDefs] = useState([
		{ field: 'id', sortable: true, headerName: "کد صرافی", filter: 'agNumberColumnFilter', width: 120 },
		{ field: 'sarName', sortable: true, headerName: "نام صرافی", filter: 'agTextColumnFilter', width: 250 },
		{ field: 'bizName', sortable: true, headerName: "نام تجاری", filter: 'agTextColumnFilter', width: 200 },
		{ field: 'sarType', sortable: true, headerName: "نوع صرافی", filter: 'agTextColumnFilter', width: 120 },
		{ field: 'totalTransCount', sortable: true, headerName: "تعداد رکورد ثبت شده", filter: 'agTextColumnFilter', width: 160 },
		{ field: 'cancelCount', sortable: true, headerName: " تعداد ابطال شده", filter: 'agTextColumnFilter', width: 150 },
		{ field: 'usedCount', sortable: true, headerName: "تعداد استفاده شده ", filter: 'agTextColumnFilter', width: 150 },
		{ field: 'licenseSTName', sortable: true, headerName: "وضعیت مجوز", filter: 'agTextColumnFilter', width: 200 },
		{ field: 'lastLicenseTypeName', sortable: true, headerName: "آخرین وضعیت مجوز", filter: 'agTextColumnFilter', width: 200 },
		{ field: 'addr', sortable: true, headerName: "آدرس", filter: 'agTextColumnFilter', width: 500 },
		{ field: 'cDate', sortable: true, headerName: "تاریخ", filter: 'agTextColumnFilter', width: 120 },
		{ field: 'wTel', sortable: true, headerName: "تلفن", filter: 'agTextColumnFilter', width: 250 }
	])
	const [serverRowsRequest, setServerRowsRequest] = useState({
		PageIndex: 1,
		PageSize: 20,
		SortModels: [{
			ColId: "id",
			Sort: "asc"
		}]
	});

	useEffect(() => {
		console.log("loading");
		axios.post("/ReportList", serverRowsRequest)
			.then(
				response => {
					console.log(response.data.data.list);
					setRowData(response.data.data.list);
					setTotalRows(response.data.data.totalCount)

				})
	}, []);
	// const onGridReady = useCallback((params) => {
	// 	console.log("params");

	//   }, []);
	// const onSortChanged=useCallback((params)=>{
	// 	console.log(params);
	// }, []);
	function getreportlist(){
		let ss = {
			PageIndex: pageindex,
			PageSize: 20,
			SortModels: [{
				ColId: "id",
				Sort: "asc"
			}]
		}
		axios.post("/ReportList", ss)
			.then(
				response => {
					console.log(response.data.data.list);
					setRowData(response.data.data.list);
					setTotalRows(response.data.data.totalCount)
				});
	}
	const firstpage = useCallback((params) => {
		console.log(pageindex);
		setPageindex(1);
		getreportlist();
		console.log(pageindex);
		
		console.log("firstpage");

	}, [pageindex]);
	const nextpage = useCallback((params) => {
		console.log(pageindex);
		setPageindex(pageindex + 1);
		console.log(pageindex);
		getreportlist();
		console.log("nextpage");
	}, [pageindex]);
	const prevpage = useCallback((params) => {
		console.log(pageindex);
		setPageindex(pageindex - 1);
		console.log(pageindex);
		getreportlist();
		console.log("prevpage");
	}, [pageindex]);
	const lastpage = useCallback((params) => {
		
		let pagecount=totalRows/20;
		pagecount=Math.Trunc(pagecount);
		setPageindex(pagecount);
		console.log(pageindex);
		getreportlist();
		console.log("lastpage");
	}, [pageindex]);

	return (
		<div style={{ height: 500, width: 1200 }}>
			<h2>گزارش </h2>
			<AgGridReact
				pagination="true"
				paginationPageSize="20"
				className="ag-theme-alpine"
				enableRtl="true"
				headerHeight="30"
				rowHeight="30"
				enableRangeSelection="true"
				// sortChanged={onSortChanged}
				rowData={rowData}
				columnDefs={columnDefs}
			// rowModelType={'serverSide'}

			>

			</AgGridReact>
			<nav className="d-flex flex-column-reverse flex-md-row justify-content-between px-2 py-1" aria-label="Page navigation">
            <ul class="pagination pagination-sm d-flex justify-content-center justify-content-md-end flex-wrap list-unstyled mb-0">
            <li class="item">
            <button onClick={firstpage} className="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z" />
                </svg>
            </button>
            </li>
            <li class="item">
            <button onClick={prevpage}  className="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
            </li>
            <li class="item">
            <button onClick={nextpage}  className="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                </svg>
            </button>
            </li>
            <li class="item">
            <button onClick={lastpage}  className="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z" />
                </svg>
            </button>
            </li>
            </ul>
            </nav>
			{/* <Pagination firstpage={firstpage} nextpage={nextpage} prevpage={prevpage} lastpage={lastpage} /> */}
		</div>


	)
}
export default Report