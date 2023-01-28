import react, { useState, useMemo, useCallback } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Pagination from '../../Pagination';
import { Alert } from 'antd';
import '../../Pagination.css'
import 'ag-grid-enterprise';
import { Spin } from 'antd';
const RialiPaymentReport = () => {
    // const [pageindex, setPageindex] = useState(1);
    // const [totalRows, setTotalRows] = useState(0);
    const [isloading, setIsloading] = useState(false);
    const [columnDefs] = useState([
        { field: 'sarafiId', sortable: true, headerName: "کد صرافی", filter: 'agNumberColumnFilter', width: 128 },
        { field: 'trackingCode', sortable: true, headerName: "شماره پيگيری ", filter: 'agTextColumnFilter', width: 128 },
        { field: 'currencyName', sortable: true, headerName: "نام ارز", filter: 'agTextColumnFilter', width: 256 },
        { field: 'amountArz', sortable: true, headerName: "مقدار ارز ", filter: 'agNumberColumnFilter', width: 130 },
        { field: 'firstName', sortable: true, headerName: " نام مشتری", filter: 'agTextColumnFilter', width: 170 },
        { field: 'amountPayment', sortable: true, headerName: " مبلغ تراکنش ریالی  ", filter: 'agNumberColumnFilter', width: 150 },
        { field: 'bankName', sortable: true, headerName: "بانک صرافی   ", filter: 'agTextColumnFilter', width: 150 },
        { field: 'paymentDateStr', sortable: true, headerName: " تاريخ دریافت/پرداخت", filter: 'agTextColumnFilter', width: 200 },
        { field: 'paymentMethod', sortable: true, headerName: "  روش دریافت/پرداخت", filter: 'agTextColumnFilter', width: 200 },
        { field: 'paymentType', sortable: true, headerName: "ابزار دریافت/پرداخت", filter: 'agTextColumnFilter', width: 160 },
        { field: 'posTrackingCode', sortable: true, headerName: " کد مرجع POS", filter: 'agTextColumnFilter', width: 250 },
        { field: 'shebaSarafi', sortable: true, headerName: "شماره شبای مشتری ", filter: 'agTextColumnFilter', width: 250 },
        { field: 'payaTrackingCode', sortable: true, headerName: " کد رهگیری پایا", filter: 'agTextColumnFilter', width: 250 },
        { field: 'paymentValidity', sortable: true, headerName: "نتیجه صحت پرداخت ", filter: 'agTextColumnFilter', width: 250 },
        { field: 'paymentStatus', sortable: true, headerName: " نتیجه تطبیق اطلاعات پرداخت کننده", filter: 'agTextColumnFilter', width: 250 },
    ])
    const [serverRowsRequest, setServerRowsRequest] = useState({
        PageIndex: 1,
        PageSize: 20,
        fromDate: new Date(2022, 1, 1),
        toDate: new Date(),
        paymentRialiStatus: 0,
        paymentRialiValidity: 0,
        sanaSarafi: 0,
        SortModels: [{
            ColId: "sarafiId",
            Sort: "asc"
        }]
    });
    const [gridApi, setGridApi] = useState(null);
    const perPage = 20;

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    // useEffect(() => {
    // 	console.log("loading");
    // 	axios.post("/ReportList", serverRowsRequest)
    // 		.then(
    // 			response => {
    // 				console.log(response.data.data.list);
    // 				setRowData(response.data.data.list);
    // 				setTotalRows(response.data.data.totalCount)

    // 			})
    // }, []);
    useEffect(() => {
        if (gridApi) {
            const dataSource = {
                getRows: (params) => {
                    console.log(params);
                    setServerRowsRequest(current => {
                        // 👇️ get copy of nested object
                        current.SortModels = params.sortModel;
                        // current.filterModels= params.filterModel;
                        let filteredFields = params.filterModel;
                        let mappedFilters = [];
                        for (let filteredField in filteredFields) {
                            let filterObject;
                            if (filteredFields[filteredField].condition1) {
                                filterObject = {
                                    Field: filteredField,
                                    Condition1: filteredFields[filteredField].condition1,
                                }
                                filterObject.Condition1.filter = filterObject.Condition1.filter.toString();
                                if (filteredFields[filteredField].operator) filterObject.FilterOperator = filteredFields[filteredField].operator;
                                if (filteredFields[filteredField].condition2) filterObject.Condition2 = filteredFields[filteredField].condition2;
                            } else {
                                filterObject = {
                                    Field: filteredField,
                                    Condition1: filteredFields[filteredField]
                                }
                                filterObject.Condition1.filter = filterObject.Condition1.filter.toString();
                            }
                            mappedFilters.push(filterObject)


                        }
                        current.filterModels = mappedFilters;
                        current.PageIndex = (params.startRow / perPage) + 1;
                        return current;
                    });

                    const page = params.endRow / perPage;
                    setIsloading(true);
                    axios.post("/RialiPaymentReport", serverRowsRequest)
                        .then(res => {
                            // console.log(res);
                            params.successCallback(res.data.data.list, res.data.data.totalCount);
                        }).catch(err => {
                            params.successCallback([], 0);
                        });
                    setIsloading(false)
                }
            }

            gridApi.setDatasource(dataSource);
        }
    }, [gridApi]);


    return (
        <div style={{ height: 500, width: 1200 }}>
            <h2>گزارش </h2>
            <AgGridReact
                pagination="true"
                rowModelType={'infinite'}
                paginationPageSize={perPage}
                cacheBlockSize={perPage}
                onGridReady={onGridReady}
                className="ag-theme-alpine"
                enableRtl="true"
                headerHeight="30"
                rowHeight="30"
                enableRangeSelection="true"
                // defaultColDef={{ flex: 1 }}
                // sortChanged={onSortChanged}
                columnDefs={columnDefs}
            // rowModelType={'serverSide'}

            >

            </AgGridReact>
            <Spin tip="در حال بارگزاری...">
                <Alert
                    message="لطفا صبر نمایید"
                    description="سیستم در حال واکشی اطلاعات میباشد"
                    type="info"
                />
            </Spin>
            {/* <nav className="d-flex flex-column-reverse flex-md-row justify-content-between px-2 py-1" aria-label="Page navigation">
				<ul class="pagination pagination-sm d-flex justify-content-center justify-content-md-end flex-wrap list-unstyled mb-0">
					<li class="item">
						<button onClick={firstpage} className="action-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-right" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z" />
							</svg>
						</button>
					</li>
					<li class="item">
						<button onClick={prevpage} className="action-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</button>
					</li>
					<li class="item">
						<button onClick={nextpage} className="action-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
							</svg>
						</button>
					</li>
					<li class="item">
						<button onClick={lastpage} className="action-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-left" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z" />
							</svg>
						</button>
					</li>
				</ul>
			</nav> */}
            {/* <Pagination firstpage={firstpage} nextpage={nextpage} prevpage={prevpage} lastpage={lastpage} /> */}
        </div>


    )
}
export default RialiPaymentReport