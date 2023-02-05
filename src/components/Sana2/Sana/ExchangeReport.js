import react, { useState, useMemo, useCallback, useRef } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import moment from 'jalali-moment';
import AdminGrid from '../../Admin-Grid/AdminGrid';

const ExchangeReport=() =>{
    const localeText = useMemo(() => {
        return {
            "selectAll": "(انتخاب همه)",
            "selectAllSearchResults": "(انتخاب همه نتایج جستجو)",
            "searchOoo": "جستجو ...",
            "blanks": "(خالی)",
            "blank": "خالی",
            "notBlank": "خالی نیست",
            "noMatches": "مطابقتی ندارد",
            "filterOoo": "فیلتر ...",
            "equals": "برابر با",
            "notEqual": "برابر نیست با",
            "empty": "انتخاب یکی",
            "lessThan": "کوچکتر از",
            "greaterThan": "بزرگتر از",
            "lessThanOrEqual": "کوچکتر یا مساوی با",
            "greaterThanOrEqual": "بزرگتر یا مساوی با",
            "inRange": "در محدوده",
            "inRangeStart": "از",
            "inRangeEnd": "تا",
            "contains": "شامل",
            "notContains": "شامل نمی شود",
            "startsWith": "شروع می شود با",
            "endsWith": "به پایان می رسد با",
            "dateFormatOoo": "yyyy-mm-dd",
            "andCondition": "و",
            "orCondition": "یا",
            "applyFilter": "اعمال",
            "resetFilter": "تنظیم مجدد",
            "clearFilter": "پاک کردن",
            "cancelFilter": "لغو",
            "textFilter": "فیلتر متن",
            "numberFilter": "فیلتر عدد",
            "dateFilter": "فیلتر تاریخ",
            "setFilter": "تنظیم فیلتر",
            "columns": "ستون‌ها",
            "filters": "فیلترها",
            "pivotMode": "حالت محوری",
            "groups": "گروه‌های ردیف",
            "rowGroupColumnsEmptyMessage": "برای تنظیم گروه های ردیف اینجا را بکشید",
            "values": "مقادیر",
            "valueColumnsEmptyMessage": "برای جمع آوری اینجا را بکشید",
            "pivots": "برچسب‌های ستون",
            "pivotColumnsEmptyMessage": "برای تنظیم برچسب های ستون، اینجا را بکشید",
            "group": "گروه",
            "loadingOoo": "در حال بارگذاری داده‌ها ...",
            "noRowsToShow": "محتوایی برای نمایش وجود ندارد",
            "enabled": "فعال شد",
            "pinColumn": "سنجاق ستون",
            "pinLeft": "سنجاق سمت  چپ",
            "pinRight": "سنجاق سمت راست",
            "noPin": "بدون سنجاق",
            "valueAggregation": "جمع مقادیر",
            "autosizeThiscolumn": "اندازه خودکار این ستون",
            "autosizeAllColumns": "اندازه خودکار همه ستون‌ها",
            "groupBy": "دسته‌بندی براساس",
            "ungroupBy": "لغو گروه‌بندی توسط",
            "resetColumns": "تنظیم مجدد ستون‌ها",
            "expandAll": "باز کردن همه",
            "collapseAll": "بستن همه",
            "copy": "کپی",
            "ctrlC": "Ctrl+C",
            "copyWithHeaders": "کپی با هدر",
            "paste": "پیست",
            "ctrlV": "Ctrl+V",
            "export": "خروجی",
            "csvExport": "خروجی CSV",
            "excelExport": "خروجی Excel",
            "sum": "جمع",
            "min": "کمترین",
            "max": "بیشترین",
            "none": "هیچ یک",
            "count": "تعداد",
            "avg": "میانگین",
            "filteredRows": "فیلتر شده",
            "selectedRows": "انتخاب شده",
            "totalRows": "تعداد ردیف‌ها",
            "totalAndFilteredRows": "ردیف‌ها",
            "more": "بیشتر",
            "to": "تا",
            "of": "از",
            "page": "صفحه",
            "nextPage": "صفحه بعدی",
            "lastPage": "آخرین صفحه",
            "firstPage": "اولین صفحه",
            "previousPage": "صفحه قبلی",
            "pivotColumnGroupTotals": "جمع",
            "pivotChartAndPivotMode": "نمودار محوری و حالت محوری",
            "pivotChart": "نمودار محوری",
            "chartRange": "نمودار این محدوده",
            "columnChart": "ستونی",
            "groupedColumn": "گروه بندی شده",
            "stackedColumn": "انباشته شده",
            "normalizedColumn": "۱۰۰٪ انباشته شده",
            "barChart": "نمودار میله‌ای",
            "groupedBar": "گروه بندی شده",
            "stackedBar": "انباشته شده",
            "normalizedBar": "۱۰۰٪ انباشته شده",
            "pieChart": "نمودار دایره‌ای",
            "pie": "نمودار دایره‌ای",
            "doughnut": "نمودار دونات",
            "line": "نمودار خطی",
            "xyChart": "X Y (پراکنده)",
            "scatter": "پراکنده کردن",
            "bubble": "حباب",
            "areaChart": "منطقه",
            "area": "منطقه",
            "stackedArea": "انباشته شده",
            "normalizedArea": "۱۰۰٪ انباشته شده",
            "histogramChart": "هیستوگرام",
            "pivotChartTitle": "نمودار محوری",
            "rangeChartTitle": "نمودار محدوده",
            "settings": "تنظیمات",
            "data": "داده",
            "format": "فرمت",
            "categories": "دسته‌بندی‌ها",
            "defaultCategory": "(خالی)",
            "series": "سری",
            "xyValues": "مقادیر X Y",
            "paired": "حالت جفت شده",
            "axis": "محور",
            "navigator": "ناوبر",
            "color": "رنگ",
            "thickness": "ضخامت",
            "xType": "نوع X",
            "automatic": "خودکار",
            "category": "دسته‌بندی",
            "number": "عدد",
            "time": "زمان",
            "xRotation": "X چرخش محور",
            "yRotation": "Y چرخش محور",
            "ticks": "کنه‌ها",
            "width": "عرض",
            "height": "ارتفاع",
            "length": "طول",
            "padding": "فاصله درونی",
            "spacing": "فاصله گذاری",
            "chart": "نمودار",
            "title": "عنوان",
            "titlePlaceholder": "عنوان نمودار - برای ویرایش دوبار کلیک کنید",
            "background": "پس‌زمینه",
            "font": "فونت",
            "top": "بالا",
            "right": "راست",
            "bottom": "پایین",
            "left": "چپ",
            "labels": "عنوان",
            "size": "سایز",
            "minSize": "حداقل اندازه",
            "maxSize": "حداکثر اندازه",
            "legend": "افسانه",
            "position": "موقعیت",
            "markerSize": "اندازه نشانگر",
            "markerStroke": "نشانگر سکته",
            "markerPadding": "فاصله درونی نشانگر",
            "itemSpacing": "فاصله مورد",
            "itemPaddingX": "فاصله درونی عرضی",
            "itemPaddingY": "فاصلی درونی افقی",
            "layoutHorizontalSpacing": "فاصله افقی",
            "layoutVerticalSpacing": "فاصله عمودی",
            "strokeWidth": "عرض ضربه",
            "offset": "انحراف",
            "offsets": "انحراف‌ها",
            "tooltips": "عنوان کمکی",
            "callout": "فراخوانی",
            "markers": "نشانگرها",
            "shadow": "سایه",
            "blur": "تاری",
            "xOffset": "انحراف عرضی",
            "yOffset": "انحراف افقی",
            "lineWidth": "عرض خط",
            "normal": "معمولی",
            "bold": "پررنگ",
            "italic": "کج",
            "boldItalic": "پررنگ و کج",
            "predefined": "از پیش تعریف شده",
            "fillOpacity": "پر کردن شفافیت",
            "strokeOpacity": "شفافیت خط",
            "histogramBinCount": "سطل شمارش",
            "columnGroup": "ستون",
            "barGroup": "میله‌ای",
            "pieGroup": "دایره‌ای",
            "lineGroup": "خطی",
            "scatterGroup": "X Y (پراکنده)",
            "areaGroup": "منطقه",
            "histogramGroup": "هیستوگرام",
            "groupedColumnTooltip": "گروه‌بندی شده",
            "stackedColumnTooltip": "انباشه شده",
            "normalizedColumnTooltip": "۱۰۰٪ انباشته شده",
            "groupedBarTooltip": "گروه‌بندی شده",
            "stackedBarTooltip": "انباشته شده",
            "normalizedBarTooltip": "۱۰۰٪ انباشته شده",
            "pieTooltip": "دایره‌ای",
            "doughnutTooltip": "دونات",
            "lineTooltip": "خطی",
            "groupedAreaTooltip": "منطقه",
            "stackedAreaTooltip": "انباشته شده",
            "normalizedAreaTooltip": "۱۰۰٪ انباشته شده",
            "scatterTooltip": "پراکنده کردن",
            "bubbleTooltip": "حباب",
            "histogramTooltip": "هیستوگرام",
            "noDataToChart": "هیچ داده ای برای ترسیم نمودار موجود نیست.",
            "pivotChartRequiresPivotMode": "نمودار محوری باید حالت محوری فعال باشد.",
            "chartSettingsToolbarTooltip": "منو",
            "chartLinkToolbarTooltip": "متصل کردن به جدول",
            "chartUnlinkToolbarTooltip": "لغو اتصال به جدول",
            "chartDownloadToolbarTooltip": "دانلود نمودار",
            "ariaHidden": "مخفی",
            "ariaVisible": "قابل رویت",
            "ariaChecked": "بررسی شده",
            "ariaUnchecked": "بررسی نشده",
            "ariaIndeterminate": "نامشخص",
            "ariaDefaultListName": "لیست",
            "ariaColumnSelectAll": "گزینه انتخاب همه ستون‌ها را تغییر دهید",
            "ariaInputEditor": "ویرایشگر ورودی",
            "ariaDateFilterInput": "ورودی فیلتر تاریخ",
            "ariaFilterList": "لیست فیلتر",
            "ariaFilterInput": "ورودی فیلتر",
            "ariaFilterColumnsInput": "فیلتر ورودی ستون‌ها",
            "ariaFilterValue": "فیلتر مقادیر",
            "ariaFilterFromValue": "فیلتر از مقدار",
            "ariaFilterToValue": "فیلتر تا مقدار",
            "ariaFilteringOperator": "عملیات فیلترینگ",
            "ariaColumn": "ستون",
            "ariaColumnList": "لیست ستون",
            "ariaColumnGroup": "گروه ستون",
            "ariaRowSelect": "برای انتخاب این ردیف، SPACE را فشار دهید",
            "ariaRowDeselect": "برای لغو انتخاب این ردیف، SPACE را فشار دهید",
            "ariaRowToggleSelection": "برای تغییر وضعیت انتخاب ردیف، Space را فشار دهید",
            "ariaRowSelectAll": "Space را فشار دهید تا انتخاب همه ردیف‌ها تغییر کند",
            "ariaToggleVisibility": "برای تغییر حالت دید، SPACE را فشار دهید",
            "ariaSearch": "جستجو",
            "ariaSearchFilterValues": "جستجوی مقادیر فیلتر",
            "ariaLabelColumnMenu": "منو ستون",
            "ariaLabelCellEditor": "ویرایشگر سلول",
            "ariaLabelDialog": "گفتگو",
            "ariaLabelSelectField": "انتخب فیلد",
            "ariaLabelTooltip": "عنوان کمکی",
            "ariaLabelContextMenu": "منوی زمینه",
            "ariaLabelSubMenu": "زیر منو",
            "ariaLabelAggregationFunction": "تابع جمع"
        };
    }, []);
    const [paymentType] = useState([{ indexField: 1, valueField: "نقدی " }, { indexField: 2, valueField:"حواله"}]);
    const [transactionType] = useState([{ indexField: 1, valueField: "خرید " }, { indexField: 2, valueField:"فروش"}]);
    const [customerType] = useState([{ indexField: 1, valueField: "حقیقی " }, { indexField: 2, valueField:"حقوقی"}, { indexField: 3, valueField:"تابعه خارجی"}]);
    const [nationalIdValidation] = useState([{ indexField: 0, valueField: "  استعلام نشده " },{ indexField: 1, valueField: "معتبر  " }, { indexField: 2, valueField:" نامعتبر"}, { indexField: 3, valueField:" معتبر"}, { indexField: 4, valueField:" معتبر"}, { indexField: 5, valueField:" معتبر"}, { indexField: 6, valueField:" معتبر"}, { indexField: 255, valueField:""}]);
    const [status] = useState([{ indexField: 0, valueField: "معتبر " }, { indexField: 1, valueField:"استفاده شده"}, { indexField: 2, valueField:"باطل شده"}]);
    const [mobileNumValidation] = useState([{ indexField: 0, valueField: "استعلام نشده " }, { indexField: 1, valueField:" معتبر"}, { indexField: 2, valueField:"نامعتبر"}], { indexField: 3, valueField:"نامشخص"});
    const [currencySource] = useState([{ indexField: 1, valueField: "منابع داخلی " }, { indexField: 2, valueField:"منابع بانک مرکزی"}, { indexField: 3, valueField:" از محل خرید از بازار متشکل ارزی ایران"}, { indexField: 4, valueField:" از محل خرید از بازار متشکل ارزی ایران - صادرات"}]);
    
    
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
        { field: 'date', sortable: true, headerName: "تاریخ معامله ", filter: 'agNumberColumnFilter', width: 130 ,
            valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : "1111" },
        { field: 'currencyId', sortable: true, headerName: "کد ارز ", filter: 'agNumberColumnFilter', width: 130 },
        { field: 'currencyName', sortable: true, headerName: "نام ارز ", filter: 'agTextColumnFilter', width: 160 },
        { field: 'amount', sortable: true, headerName: "مقدار ", filter: 'agNumberColumnFilter', width: 150 ,valueFormatter: params => Number(params.value).toLocaleString()},
        { field: 'rate', sortable: true, headerName: "نرخ ", filter: 'agNumberColumnFilter', width: 130 },
        { field: 'paymentType', sortable: true, headerName: "نوع معامله ", filter: 'agSetColumnFilter', width: 130 ,
            valueFormatter: params => getEnumValue(params.value, paymentType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, paymentType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(paymentType.map(item => item.indexField)) }
            }
        },
        { field: 'chequeId', sortable: true, headerName: "شماره حواله ", filter: 'agTextColumnFilter', width: 130 },
        { field: 'transactionType', sortable: true, headerName: "نوع عملیات ", filter: 'agSetColumnFilter', width: 130 ,
            valueFormatter: params => getEnumValue(params.value, transactionType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, transactionType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(transactionType.map(item => item.indexField)) }
            }
        },
        { field: 'customerType', sortable: true, headerName: "نوع مشتری ", filter: 'agSetColumnFilter', width: 130 ,
            valueFormatter: params => getEnumValue(params.value, customerType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, customerType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(customerType.map(item => item.indexField)) }
            }
        },
        { field: 'nationalIdValidation', sortable: true, headerName: "وضعیت احراز هویت  ", filter: 'agSetColumnFilter', width: 130 ,
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
        { field: 'agentNationalIdValidation', sortable: true, headerName: "وضعیت احراز هویت نماینده مشتری ", filter: 'agSetColumnFilter', width: 130 ,
            valueFormatter: params => getEnumValue(params.value, nationalIdValidation),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, nationalIdValidation), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(nationalIdValidation.map(item => item.indexField)) }
            }
        },
        { field: 'refTrackingCode', sortable: true, headerName: "شناسه رکورد ابطال شده  ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'status', sortable: true, headerName: "وضعیت ", filter:  'agSetColumnFilter', width: 130 ,
            valueFormatter: params => getEnumValue(params.value, status),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, status), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(status.map(item => item.indexField)) }
            }
        },
        { field: 'lastUserModifiedBy', sortable: true, headerName: "اخربن کاربر ویرایش کننده ", filter: 'agTextColumnFilter', width: 170 },
        { field: 'lastModifiedDate', sortable: true, headerName: "اخرین تاریخ ویرایش رکورد ", filter: 'agNumberColumnFilter', width: 170 ,valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : ""},
        { field: 'currencyCoefficient', sortable: true, headerName: "ضریب ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'currencyUseId', sortable: true, headerName: "سرفصل ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'euroAmount', sortable: true, headerName: "معادل یورو  ", filter: 'agNumberColumnFilter', width: 170 ,valueFormatter: params => Number(params.value).toLocaleString()},
        { field: 'mobileNumValidation', sortable: true, headerName: "وضعیت احراز هویت موبایل مشتری ", filter:  'agSetColumnFilter', width: 130 ,
            valueFormatter: params => getEnumValue(params.value, mobileNumValidation),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, mobileNumValidation), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(mobileNumValidation.map(item => item.indexField)) }
            }
        },
        { field: 'currencySource', sortable: true, headerName: "منبع ارز ", filter: 'agSetColumnFilter', width: 200 ,
            valueFormatter: params => getEnumValue(params.value, currencySource),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, currencySource), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(currencySource.map(item => item.indexField)) }
            }
        },
        { field: 'matchingExchangeRow', sortable: true, headerName: "شناسه معامله دو صرافی ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'traderSarafId', sortable: true, headerName: "کد صرافی معامله دو صرافی ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'createDate', sortable: true, headerName: "تاریخ ایجاد رکورد ", filter: 'agNumberColumnFilter', width: 170 ,valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : ""},
        { field: 'rialAmountCalc', sortable: true, headerName: "معادل ریال ", filter: 'agNumberColumnFilter', width: 200 ,valueFormatter: params => Number(params.value).toLocaleString()},
        { field: 'dollarAmount', sortable: true, headerName: "معادل دلار ", filter: 'agNumberColumnFilter', width: 170 ,valueFormatter: params => Number(params.value).toLocaleString()},
        { field: 'nakhodaTrackingCode', sortable: true, headerName: " کد رهگیری ناخدا ", filter: 'agTextColumnFilter', width: 170 },



    ])
    const [serverRowsRequest, setServerRowsRequest] = useState({
        PageIndex: 1,
        PageSize: 20,
        SortModels: [{
            ColId: "id",
            Sort: "asc"
        }]
    });
    const [gridApi, setGridApi] = useState(null);
    const perPage = 20;

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const defaultColDef = useMemo(() => {
        return {
            // flex: 1,
            filter: true,
            sortable: true,
            floatingFilter: true,
            resizable: true,
        };
    }, []);
    useEffect(() => {
        if (gridApi) {

            const dataSource = {
                getRows: (params) => {
                    setServerRowsRequest(current => {
                        // 👇️ get copy of nested object
                        current.SortModels = params.sortModel;
                        let filteredFields = params.filterModel;
                        let mappedFilters = [];
                        for (let filteredField in filteredFields) {

                            let filterObject;
                            if (filteredFields[filteredField].condition1) {
                                filterObject = {
                                    Field: filteredField,
                                    Condition1: filteredFields[filteredField].condition1,
                                }
                                if (filterObject.Condition1.filterType != "set") {
                                    filterObject.Condition1.filter = filterObject.Condition1.filter.toString();
                                }
                                if (filteredFields[filteredField].operator) filterObject.FilterOperator = filteredFields[filteredField].operator;
                                if (filteredFields[filteredField].condition2) {
                                    filterObject.Condition2 = filteredFields[filteredField].condition2;
                                    if (filterObject.Condition2.filterType != "set") {
                                        filterObject.Condition2.filter = filterObject.Condition2.filter.toString();
                                    }

                                }
                            } else {
                                filterObject = {
                                    Field: filteredField,
                                    Condition1: filteredFields[filteredField]
                                }
                                if (filterObject.Condition1.filterType != "set") {
                                    filterObject.Condition1.filter = filterObject.Condition1.filter.toString();
                                }

                            }
                            mappedFilters.push(filterObject)


                        }
                        current.filterModels = mappedFilters;
                        current.PageIndex = (params.startRow / perPage) + 1;
                        return current;
                    });

                    const page = params.endRow / perPage;

                    axios.post("/Exchanges", serverRowsRequest)
                        .then(res => {

                            params.successCallback(res.data.data.list, res.data.data.totalCount);

                        }).catch(err => {
                            params.successCallback([], 0);
                        }).finally(() => {
                        });
                }
            }

            gridApi.setDatasource(dataSource);
        }
    }, [gridApi]);

    return (
       
        <div style={{ height: 600, width: 1300 }}>
            <AdminGrid />
        <h4>گزارش خرید و فروش ارز</h4>
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
            localeText={localeText}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
        >
        </AgGridReact>

    </div>
    )
}

export default ExchangeReport
