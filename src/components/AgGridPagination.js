import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import '../App.css';

const AgGridPagination = () => {
    const [columnDefs] = useState([
        { field: 'first_name', sortable: true, headerName: "کد", filter: 'agNumberColumnFilter' },
        { field: 'last_name', headerName: "نام لاتین", filter: 'agTextColumnFilter' },
        { field: 'email', headerName: "نام فارسی", filter: 'agTextColumnFilter' },
        { field: 'avatar', headerName: "نام فارسی", filter: 'agTextColumnFilter' },
    ])
    const [gridApi, setGridApi] = useState(null);
    const perPage = 3;

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    useEffect(() => {
        if (gridApi) {
            const dataSource = {
                getRows: (params) => {
                    // Use startRow and endRow for sending pagination to Backend
                    // params.startRow : Start Page
                    // params.endRow : End Page

                    const page = params.endRow / perPage;
                    // fetch(`https://reqres.in/api/users?per_page=${perPage}&page=${page}`)
                    //   .then(resp => resp.json())
                    //   .then(res => {
                    //     params.successCallback(res.data, res.total);
                    //   }).catch(err => {
                    //     params.successCallback([], 0);
                    //   });
                    axios.get(`https://reqres.in/api/users?per_page=${perPage}&page=${page}`)
                        .then(res => {
                            console.log(res);
                            params.successCallback(res.data.data, res.total);
                        }).catch(err => {
                            params.successCallback([], 0);
                        });
                }
            }

            gridApi.setDatasource(dataSource);
        }
    }, [gridApi]);

    // const avatarFormatter = ({ value }) => {
    //   return <img src={value} width="50px" height="50px" />
    // }

    return (
        <div className="App">
            <h2>Server side pagination in the React AG Grid - <a href="https://www.cluemediator.com" target="_blank">Clue Mediator</a></h2>
            <div className="ag-theme-alpine ag-style">
                <AgGridReact
                    pagination={true}
                    rowModelType={'infinite'}
                    paginationPageSize={perPage}
                    cacheBlockSize={perPage}
                    onGridReady={onGridReady}
                    rowHeight={40}
                    defaultColDef={{ flex: 1 }}
                    columnDefs={columnDefs}
                >

                </AgGridReact>
            </div>
        </div>
    );
}

export default AgGridPagination;