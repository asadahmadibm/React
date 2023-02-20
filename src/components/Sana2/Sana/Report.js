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
import { AutoComplete, Dropdown, Card, Checkbox, Button, Switch, InputNumber, Space, Select, Form, Input, message } from 'antd';
//import AG_GRID_LOCALE_FA from '../../Aggrid/Local.fa';
const Report = () => {
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
  // const [pageindex, setPageindex] = useState(1);
  // const [totalRows, setTotalRows] = useState(0);
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
  const [gridApi, setGridApi] = useState(null);
  const perPage = 20;

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

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

          axios.post("/ReportList", serverRowsRequest)
            .then(res => {
              // console.log(res);
              params.successCallback(res.data.data.list, res.data.data.totalCount);
              document.body.classList.remove('loading-indicator');
            }).catch(err => {
              params.successCallback([], 0);
            });
        }
      }

      gridApi.setDatasource(dataSource);
    }
  }, [gridApi]);


  return (
    <Card type="inner" title="گزارش آماری" size="default" className='padding0'
      
    >
      <div style={{ height: "76vh", width: "100%" }}>
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
          // defaultColDef={{ flex: 1 }}
          // sortChanged={onSortChanged}
          columnDefs={columnDefs}
        >
        </AgGridReact>

      </div>
    </Card>

  )
}
export default Report