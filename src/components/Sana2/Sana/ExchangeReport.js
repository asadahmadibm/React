import react, { useState } from 'react'
import moment from 'jalali-moment';
import AdminGrid from '../../Admin-Grid/AdminGrid';
import { useEffect } from 'react';
import axios from 'axios';
const ExchangeReport = () => {
    const [paymentType] = useState([{ indexField: 1, valueField: "نقدی " }, { indexField: 2, valueField: "حواله" }]);
    const [transactionType] = useState([{ indexField: 1, valueField: "خرید " }, { indexField: 2, valueField: "فروش" }]);
    const [customerType] = useState([{ indexField: 1, valueField: "حقیقی " }, { indexField: 2, valueField: "حقوقی" }, { indexField: 3, valueField: "تابعه خارجی" }]);
    const [nationalIdValidation] = useState([{ indexField: 0, valueField: "  استعلام نشده " }, { indexField: 1, valueField: "معتبر  " }, { indexField: 2, valueField: " نامعتبر" }, { indexField: 3, valueField: " معتبر" }, { indexField: 4, valueField: " معتبر" }, { indexField: 5, valueField: " معتبر" }, { indexField: 6, valueField: " معتبر" }, { indexField: 255, valueField: "" }]);
    const [statusType] = useState([{ indexField: 0, valueField: "معتبر " }, { indexField: 1, valueField: "استفاده شده" }, { indexField: 2, valueField: "باطل شده" }]);
    const [mobileNumValidation] = useState([{ indexField: 0, valueField: "استعلام نشده " }, { indexField: 1, valueField: " معتبر" }, { indexField: 2, valueField: "نامعتبر" }, { indexField: 3, valueField: "نامشخص" }]);
    const [currencySource] = useState([{ indexField: 1, valueField: "منابع داخلی " }, { indexField: 2, valueField: "منابع بانک مرکزی" }, { indexField: 3, valueField: " از محل خرید از بازار متشکل ارزی ایران" }, { indexField: 4, valueField: " از محل خرید از بازار متشکل ارزی ایران - صادرات" }]);
    const [currencyUse, setCurrencyUse] = useState([{ indexField : 0, valueField : 'نامشخص'},
    { indexField : 1, valueField : 'مسافرتی (بانک‌ها و صرافی‌ها)' },
    { indexField : 2, valueField : 'درمانی (بانک‌ها و صرافی‌ها)' },
    { indexField : 3, valueField : 'دانشجویی (بانک‌ها و صرافی‌ها)' },
    { indexField : 4, valueField : 'هزینه شرکت‌های هواپیمایی ایرانی (بانک‌ها و صرافی‌ها)' },
    { indexField : 5, valueField : 'هزینه‌های شرکت‌های بیمه ایرانی (بانک‌ها و صرافی‌ها)' },
    { indexField : 6, valueField : 'هزینه شرکت‌ در نمایشگاه‌های خارج از کشور (بانک‌ها و صرافی‌ها)' },
    { indexField : 7, valueField : 'هزینه حقوق و مزایای کارکنان تبعه خارجی شاغل در ایران (بانک‌ها و صرافی‌ها)' },
    { indexField : 8, valueField : 'بابت رانندگان حمل و نقل بین‌المللی و ترانزیت (بانک‌ها و صرافی‌ها)' },
    { indexField : 9, valueField : 'هزینه برگزاری همایش‌های بین‌المللی و اعطای جوایز جشنواره‌ها و مسابقات (بانک‌ها و صرافی‌ها)' },
    { indexField : 10, valueField : 'هزینه انجام آزمایش‌های علمی و فنی، انتشار آگهی در …ور و دریافت گواهی بین‌المللی (بانک‌ها و صرافی‌ها)' },
    { indexField : 11, valueField : 'هزینه خرید امتیاز پخش فیلم (بانک‌ها و صرافی‌ها)' },
    { indexField : 12, valueField : 'فرصت مطالعاتی (بانک‌ها و صرافی‌ها)' },
    { indexField : 13, valueField : 'حق عضویت و حق ثبت‌نام در سازمان‌ها و مجامع بین‌الم…علمی و هزینه چاپ مقالات علمی (بانک‌ها و صرافی‌ها)' },
    { indexField : 14, valueField : 'هزینه‌های شرکت‌های اعزام‌کننده زائرین به عتبات عالیات کشور عراق (بانک‌ها و صرافی‌ها)' },
    { indexField : 15, valueField : 'ثبت‌نام در آزمون‌های بین‌المللی(GRE,IELTS,TOEFL، ...) (بانک‌ها و صرافی‌ها)' },
    { indexField : 16, valueField : 'حق الوکاله دعاوی خارجی (بانک‌ها و صرافی‌ها)' },
    { indexField : 17, valueField : 'هزینه اجاره و اشتراک شبکه‌های اطلاعاتی (بانک‌ها و صرافی‌ها)' },
    { indexField : 18, valueField : 'شرکت‌ در دوره‌های آموزشی و پژوهشی خارج از کشور (بانک‌ها و صرافی‌ها)' },
    { indexField : 19, valueField : 'ثبت‌نام و شرکت در امتحانات علمی و تخصصی خارج از کشور (بانک‌ها و صرافی‌ها)' },
    { indexField : 20, valueField : 'هزینه خدمات کنسولی سفارت‌خانه‌های خارجی، از جمله خدمات اخذ روادید و کنسولی (بانک‌ها و صرافی‌ها)' },
    { indexField : 21, valueField : 'هزینه‌های ارزی شرکت‌های مسافرتی و گردشگری (بانک‌ها و صرافی‌ها)' },
    { indexField : 22, valueField : 'هزینه‌های حمل، ترانزیت و توزیع محموله‌های پستی بین‌المللی برای شرکت‌های پستی (بانک‌ها و صرافی‌ها)' },
    { indexField : 23, valueField : 'بابت تبدیل مانده ریالی ناشی از خرید ارز اتباع خارجی (بانک‌ها و صرافی‌ها)' },
    { indexField : 24, valueField : 'سایر' },
    { indexField : 25, valueField : 'از محل نيما' },
    { indexField : 26, valueField : 'به / از بانک و صرافی ديگر' },
    { indexField : 27, valueField : 'درآمد خالص ريالي کنسولی سفارتخانه‌هاي خارجي داخل ک… نمايندگي‌هاي ديپلماتيک مقيم ايران (صرفا بانک‌ها)' },
    { indexField : 28, valueField : 'درآمدهای ریالی شرکت‌های هواپیمایی خارجي (صرفا بانک‌ها)' },
    { indexField : 29, valueField : 'مطالبه وجه ضمانت‌نامه‌های ارزی (صرفا بانک‌ها)' },
    { indexField : 30, valueField : 'بابت حمل جنازه و هزينه‌هاي وابسته به آن به داخل کشور جهت اتباع ايراني مقیم ایران (صرفا بانک‌ها)' },
    { indexField : 31, valueField : 'شرکت راه آهن جمهوري اسلامي ايران و ساير شرکت‌هاي ريلي بابت حق استفاده از واگن‌ها (صرفا بانک‌ها)' },
    { indexField : 32, valueField : 'بابت تبدیل دارایی‌های ریالی مأمورین نمایندگی‌های خ…‌هاي کشورهاي خارجي در ايران به ارز (صرفا بانک‌ها)' },
    { indexField : 33, valueField : 'اصل، سود و تمامي عوايد حاصل از سرمايه‌گذاري خارجي در کشور (صرفا بانک‌ها)' },
    { indexField : 34, valueField : 'بابت کارمزد کارگزاران  (صرفا بانک‌ها)' },
    { indexField : 35, valueField : 'بازپرداخت تسهيلات اعطايي به تسهيلات گيرندگان از محل منابع بانک‌ها و صندوق توسعه ملي (صرفا بانک‌ها)' },
    { indexField : 36, valueField : 'بازپرداخت تسهيلات اعطايي از محل منابع حساب ذخيره ارزي  (صرفا بانک‌ها)' },
    { indexField : 37, valueField : 'سهم‌الشرکه  و بازپرداخت تسهيلات ريفاينانس (صرفا بانک‌ها)' },
    { indexField : 38, valueField : 'تسهيلات اعطايي از محل منابع جزء (د) بند (6) قانون بودجه سال 1388 کل کشور (صرفا بانک‌ها)' },
    { indexField : 39, valueField : 'سهم‌الشرکه متقاضي مرتبط با تسهيلات اعطايي از محل م…وسعه و تجارت اکو و صندوق توسعه ملي (صرفا بانک‌ها)' },
    { indexField : 40, valueField : 'سهم‌الشرکه متقاضي و بازپرداخت تسهيلات اعطايي از مح…منابع بانک‌ها در مناطق آزاد و ويژه (صرفا بانک‌ها)' },
    { indexField : 41, valueField : 'سهم‌الشرکه متقاضي مرتبط با تسهيلات اعطايي از محل م…اني (W.B) و بانک توسعه اسلامي(indexField : B) (صرفا بانک‌ها)' },
    { indexField : 42, valueField : 'آورده متقاضي، پرداخت اقساط و هزينه‌هاي تبعي اعتبارات اسنادي فاينانس خودگردان (صرفا بانک‌ها)' },
    { indexField : 43, valueField : 'پرداخت اقساط اعتبارات اسنادي فاينانس غيرخودگردان (صرفا بانک‌ها)' },
    { indexField : 44, valueField : 'از محل صادرات (بانک‌ها و صرافی‌ها)' },
    { indexField : 46, valueField : 'خرید ارز از سرمایه گذاران خارجی' },
    { indexField : 47, valueField : 'معامله از طريق بازار متشکل' },
    { indexField : 48, valueField : 'فروش ارز مأموريتی (بانک‌ها و صرافی‌ها)' },
    { indexField : 49, valueField : 'خرید/فروش با بانک مرکزی' },
    { indexField : 50, valueField : 'ارز زيارتی اربعین' },
    { indexField : 51, valueField : 'مسافرتی برای کشورهای با ویزا (هوایی)' },
    { indexField : 52, valueField : 'مسافرتی برای کشورهای بدون ویزا (هوایی)' },
    { indexField : 53, valueField : 'مسافرتی (زمینی ـ ریلی ـ دریایی)' },
    { indexField : 54, valueField : 'فروش ارز به بازرگانان (صرفاً بانک‌های منتخب)' },
    { indexField : 55, valueField : 'هزینه دفاتر خارج از کشور (صرفاً بانک‌ها)' },
    { indexField : 56, valueField : 'تأمین نیازهای ضروری' },
    { indexField : 57, valueField : 'مازاد وضعیت باز ارزی صرافی‌ها ' }]);

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
        {
            field: 'date', sortable: true, headerName: "تاریخ معامله ", filter: 'agNumberColumnFilter', width: 130,
            valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : "1111"
        },
        { field: 'currencyId', sortable: true, headerName: "کد ارز ", filter: 'agNumberColumnFilter', width: 130 },
        { field: 'currencyName', sortable: true, headerName: "نام ارز ", filter: 'agTextColumnFilter', width: 160 },
        { field: 'amount', sortable: true, headerName: "مقدار ", filter: 'agNumberColumnFilter', width: 150, valueFormatter: params => Number(params.value).toLocaleString() },
        { field: 'rate', sortable: true, headerName: "نرخ ", filter: 'agNumberColumnFilter', width: 130 },
        {
            field: 'paymentType', sortable: true, headerName: "نوع معامله ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, paymentType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, paymentType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(paymentType.map(item => item.indexField)) }
            }
        },
        { field: 'chequeId', sortable: true, headerName: "شماره حواله ", filter: 'agTextColumnFilter', width: 130 },
        {
            field: 'transactionType', sortable: true, headerName: "نوع عملیات ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, transactionType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, transactionType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(transactionType.map(item => item.indexField)) }
            }
        },
        {
            field: 'customerType', sortable: true, headerName: "نوع مشتری ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, customerType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, customerType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(customerType.map(item => item.indexField)) }
            }
        },
        {
            field: 'nationalIdValidation', sortable: true, headerName: "وضعیت احراز هویت  ", filter: 'agSetColumnFilter', width: 130,
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
        {
            field: 'agentNationalIdValidation', sortable: true, headerName: "وضعیت احراز هویت نماینده مشتری ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, nationalIdValidation),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, nationalIdValidation), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(nationalIdValidation.map(item => item.indexField)) }
            }
        },
        { field: 'refTrackingCode', sortable: true, headerName: "شناسه رکورد ابطال شده  ", filter: 'agNumberColumnFilter', width: 170 },
        {
            field: 'status', sortable: true, headerName: "وضعیت ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, statusType),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, statusType), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(statusType.map(item => item.indexField)) }
            }
        },
        { field: 'lastUserModifiedBy', sortable: true, headerName: "اخربن کاربر ویرایش کننده ", filter: 'agTextColumnFilter', width: 170 },
        { field: 'lastModifiedDate', sortable: true, headerName: "اخرین تاریخ ویرایش  ", filter: 'agNumberColumnFilter', width: 170, valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : "" },
        { field: 'currencyCoefficient', sortable: true, headerName: "ضریب ", filter: 'agNumberColumnFilter', width: 170 },
        {
            field: 'currencyUseId', sortable: true, headerName: "سرفصل ", filter: 'agSetColumnFilter', width: 200,
            valueFormatter: params => getEnumValue(params.value, currencyUse),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, currencyUse), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(currencyUse.map(item => item.indexField)) }
            }
        },
        { field: 'euroAmount', sortable: true, headerName: "معادل یورو  ", filter: 'agNumberColumnFilter', width: 170, valueFormatter: params => Number(params.value).toLocaleString() },
        {
            field: 'mobileNumValidation', sortable: true, headerName: "وضعیت احراز هویت موبایل  ", filter: 'agSetColumnFilter', width: 130,
            valueFormatter: params => getEnumValue(params.value, mobileNumValidation),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, mobileNumValidation), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(mobileNumValidation.map(item => item.indexField)) }
            }
        },
        {
            field: 'currencySource', sortable: true, headerName: "منبع ارز ", filter: 'agSetColumnFilter', width: 200,
            valueFormatter: params => getEnumValue(params.value, currencySource),
            filterParams: {
                valueFormatter: params => getEnumValue(params.value, currencySource), //getEnumValue(Number(params.value), paymentMethod),
                values: (params) => { params.success(currencySource.map(item => item.indexField)) }
            }
        },
        { field: 'matchingExchangeRow', sortable: true, headerName: "شناسه معامله دو صرافی ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'traderSarafId', sortable: true, headerName: "کد صرافی معامله دو صرافی ", filter: 'agNumberColumnFilter', width: 170 },
        { field: 'createDate', sortable: true, headerName: "تاریخ ایجاد رکورد ", filter: 'agNumberColumnFilter', width: 170, valueFormatter: params => moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').isValid() == true ? moment(new Date(params.value).toLocaleDateString('en-US'), 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD') : "" },
        { field: 'rialAmountCalc', sortable: true, headerName: "معادل ریال ", filter: 'agNumberColumnFilter', width: 220, valueFormatter: params => Number(params.value).toLocaleString() },
        { field: 'dollarAmount', sortable: true, headerName: "معادل دلار ", filter: 'agNumberColumnFilter', width: 170, valueFormatter: params => Number(params.value).toLocaleString() },
        { field: 'nakhodaTrackingCode', sortable: true, headerName: " کد رهگیری ناخدا ", filter: 'agTextColumnFilter', width: 170 },



    ]);

    // useEffect(() => {
    //     let xx = [];
    //     axios.post("/CurrencyUse")
    //         .then(res => {
    //             xx = res.data.data.list.map(({ id, title }) => ({ "indexField": id, "valueField": title }))
    //             console.log(res);
    //             // setCurrencyUse(res.data.data.list.map(({ id, title }) => ({ "indexField": id, "valueField": title })));
    //             // console.log(currencyUse);
    //         }).catch(err => {
    //             toast.warn("اشکال در فراخوانی اطلاعات سر فصلها");

    //         }).finally(() => {
    //         });
    //     setCurrencyUse(xx);
    //     console.log(currencyUse);


    // }, []);


    return (
        <AdminGrid columnDefs={columnDefs} title="گزارش خرید و فروش ارز" apiname="Exchanges" pageDetail="ExchangesDetail" />
    )
}

export default ExchangeReport
