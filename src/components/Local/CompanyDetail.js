import react, { useState, useMemo, useCallback, useRef } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { AutoComplete, Checkbox, Button, Switch, InputNumber, Space, Select, Form, Input, message, Tabs, TreeSelect } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { DatePicker, ConfigProvider, Card } from "antd";
import { DatePicker as DatePickerJalali, Calendar, JalaliLocaleListener, useJalaliLocaleListener } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import en_US from "antd/lib/locale/en_US";
import dayjs from 'dayjs'
import 'react-toastify/dist/ReactToastify.css';
import moment, { locale } from 'jalali-moment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const DatePickerCustom = ({ value, onChange }) => {
    return <DatePicker showTime allowClear={false} value={value != undefined ? dayjs(value) : ""} onChange={onChange} format="HH:mm:ss YYYY-MM-DD " />
};

const treeData = [{ "value": 1, "parentID": null, "title": "ایران", "children": [{ "value": 101, "parentID": 1, "title": "آذربایجان شرقی", "children": [{ "value": 10101, "parentID": 101, "title": "آذرشهر" }, { "value": 10102, "parentID": 101, "title": "اسکو" }, { "value": 10103, "parentID": 101, "title": "اهر" }, { "value": 10104, "parentID": 101, "title": "بستان‌آباد" }, { "value": 10105, "parentID": 101, "title": "بناب" }, { "value": 10106, "parentID": 101, "title": "تبریز", "children": [{ "value": 1010601, "parentID": 10106, "title": "باسمنج", "children": [{ "value": 2, "parentID": 1010601, "title": "بیلاسیبلسیبلس", "children": [{ "value": 3, "parentID": 2, "title": "فلان جا" }] }] }, { "value": 1010602, "parentID": 10106, "title": "تبریز" }, { "value": 1010603, "parentID": 10106, "title": "خسروشاه" }, { "value": 1010604, "parentID": 10106, "title": "سردرود" }] }, { "value": 10107, "parentID": 101, "title": "جلفا" }, { "value": 10108, "parentID": 101, "title": "چاراویماق" }, { "value": 10109, "parentID": 101, "title": "خداآفرین" }, { "value": 10110, "parentID": 101, "title": "سراب" }, { "value": 10111, "parentID": 101, "title": "شبستر" }, { "value": 10112, "parentID": 101, "title": "عجب شیر" }, { "value": 10113, "parentID": 101, "title": "مراغه" }, { "value": 10114, "parentID": 101, "title": "مرند" }, { "value": 10115, "parentID": 101, "title": "ملکان" }, { "value": 10116, "parentID": 101, "title": "میانه" }, { "value": 10117, "parentID": 101, "title": "هریس" }, { "value": 10118, "parentID": 101, "title": "هشترود" }, { "value": 10119, "parentID": 101, "title": "ورزقان" }, { "value": 10120, "parentID": 101, "title": "کلیبر" }] }, { "value": 102, "parentID": 1, "title": "آذربایجان غربی", "children": [{ "value": 10201, "parentID": 102, "title": "ارومیه" }, { "value": 10202, "parentID": 102, "title": "اشنویه" }, { "value": 10203, "parentID": 102, "title": "بوکان" }, { "value": 10204, "parentID": 102, "title": "پلدشت" }, { "value": 10205, "parentID": 102, "title": "پیرانشهر" }, { "value": 10206, "parentID": 102, "title": "تکاب" }, { "value": 10207, "parentID": 102, "title": "چالدران" }, { "value": 10208, "parentID": 102, "title": "چایپاره" }, { "value": 10209, "parentID": 102, "title": "خوی" }, { "value": 10210, "parentID": 102, "title": "سردشت" }, { "value": 10211, "parentID": 102, "title": "سلماس" }, { "value": 10212, "parentID": 102, "title": "شاهین دژ" }, { "value": 10213, "parentID": 102, "title": "شوط" }, { "value": 10214, "parentID": 102, "title": "ماکو" }, { "value": 10215, "parentID": 102, "title": "مهاباد" }, { "value": 10216, "parentID": 102, "title": "میاندوآب" }, { "value": 10217, "parentID": 102, "title": "نقده" }] }, { "value": 103, "parentID": 1, "title": "اردبیل", "children": [{ "value": 4, "parentID": 103, "title": "لاالبال" }, { "value": 10301, "parentID": 103, "title": "اردبیل" }, { "value": 10302, "parentID": 103, "title": "بیله سوار" }, { "value": 10303, "parentID": 103, "title": "پارس‌آباد" }, { "value": 10304, "parentID": 103, "title": "خلخال" }, { "value": 10305, "parentID": 103, "title": "سرعین" }, { "value": 10306, "parentID": 103, "title": "گرمی" }, { "value": 10307, "parentID": 103, "title": "مشگین شهر" }, { "value": 10308, "parentID": 103, "title": "نمین" }, { "value": 10309, "parentID": 103, "title": "نیر" }, { "value": 10310, "parentID": 103, "title": "کوثر" }] }, { "value": 104, "parentID": 1, "title": "اصفهان", "children": [{ "value": 10401, "parentID": 104, "title": "آران و بیدگل" }, { "value": 10402, "parentID": 104, "title": "اردستان" }, { "value": 10403, "parentID": 104, "title": "اصفهان", "children": [{ "value": 1040301, "parentID": 10403, "title": "اژیه" }, { "value": 1040302, "parentID": 10403, "title": "اصفهان" }, { "value": 1040303, "parentID": 10403, "title": "بهارستان" }] }, { "value": 10404, "parentID": 104, "title": "برخوار" }, { "value": 10405, "parentID": 104, "title": "تیران و کرون" }, { "value": 10406, "parentID": 104, "title": "چادگان" }, { "value": 10407, "parentID": 104, "title": "خمینی شهر" }, { "value": 10408, "parentID": 104, "title": "خوانسار" }, { "value": 10409, "parentID": 104, "title": "خور و بیابانک" }, { "value": 10410, "parentID": 104, "title": "دهاقان" }, { "value": 10411, "parentID": 104, "title": "سمیرم" }, { "value": 10412, "parentID": 104, "title": "شاهین شهر و میمه" }, { "value": 10413, "parentID": 104, "title": "شهرضا" }, { "value": 10414, "parentID": 104, "title": "فریدن" }, { "value": 10415, "parentID": 104, "title": "فریدون‌شهر" }, { "value": 10416, "parentID": 104, "title": "فلاورجان" }, { "value": 10417, "parentID": 104, "title": "گلپایگان" }, { "value": 10418, "parentID": 104, "title": "لنجان" }, { "value": 10419, "parentID": 104, "title": "مبارکه" }, { "value": 10420, "parentID": 104, "title": "نایین" }, { "value": 10421, "parentID": 104, "title": "نجف‌آباد" }, { "value": 10422, "parentID": 104, "title": "نطنز" }, { "value": 10423, "parentID": 104, "title": "کاشان" }] }, { "value": 105, "parentID": 1, "title": "البرز", "children": [{ "value": 10501, "parentID": 105, "title": "ساوجبلاغ" }, { "value": 10502, "parentID": 105, "title": "طالقان" }, { "value": 10503, "parentID": 105, "title": "نظرآباد" }, { "value": 10504, "parentID": 105, "title": "کرج", "children": [{ "value": 1050401, "parentID": 10504, "title": "آسارا" }, { "value": 1050402, "parentID": 10504, "title": "کرج" }, { "value": 1050403, "parentID": 10504, "title": "کمال شهر" }, { "value": 1050404, "parentID": 10504, "title": "گرمدره" }, { "value": 1050405, "parentID": 10504, "title": "ماهدشت" }, { "value": 1050406, "parentID": 10504, "title": "محمد شهر" }, { "value": 1050407, "parentID": 10504, "title": "مشکین دشت" }] }] }, { "value": 106, "parentID": 1, "title": "ایلام", "children": [{ "value": 10601, "parentID": 106, "title": "آبدانان" }, { "value": 10602, "parentID": 106, "title": "ایلام" }, { "value": 10603, "parentID": 106, "title": "ایوان" }, { "value": 10604, "parentID": 106, "title": "دره شهر" }, { "value": 10605, "parentID": 106, "title": "دهلران" }, { "value": 10606, "parentID": 106, "title": "شیروان و چرداول" }, { "value": 10607, "parentID": 106, "title": "ملکشاهی" }, { "value": 10608, "parentID": 106, "title": "مهران" }] }, { "value": 107, "parentID": 1, "title": "بوشهر", "children": [{ "value": 10701, "parentID": 107, "title": "بوشهر" }, { "value": 10702, "parentID": 107, "title": "تنگستان" }, { "value": 10703, "parentID": 107, "title": "جم", "children": [{ "value": 1070301, "parentID": 10703, "title": "انارستان" }, { "value": 1070302, "parentID": 10703, "title": "جم" }, { "value": 1070303, "parentID": 10703, "title": "ریز" }] }, { "value": 10704, "parentID": 107, "title": "دشتستان" }, { "value": 10705, "parentID": 107, "title": "دشتی" }, { "value": 10706, "parentID": 107, "title": "دیر" }, { "value": 10707, "parentID": 107, "title": "دیلم" }, { "value": 10708, "parentID": 107, "title": "گناوه" }, { "value": 10709, "parentID": 107, "title": "کنگان" }, { "value": 10710, "parentID": 107, "title": "عسلویه", "children": [{ "value": 1071001, "parentID": 10710, "title": "عسلویه" }] }] }, { "value": 108, "parentID": 1, "title": "تهران", "children": [{ "value": 10801, "parentID": 108, "title": "اسلامشهر" }, { "value": 10802, "parentID": 108, "title": "بهارستان" }, { "value": 10803, "parentID": 108, "title": "پاکدشت" }, { "value": 10804, "parentID": 108, "title": "پیشوا" }, { "value": 10805, "parentID": 108, "title": "تهران", "children": [{ "value": 1080501, "parentID": 10805, "title": "تهران" }, { "value": 1080502, "parentID": 10805, "title": "پردیس" }, { "value": 1080503, "parentID": 10805, "title": "بومهن" }] }, { "value": 10806, "parentID": 108, "title": "دماوند" }, { "value": 10807, "parentID": 108, "title": "رباط کریم", "children": [{ "value": 1080701, "parentID": 10807, "title": "رباط کریم" }] }, { "value": 10808, "parentID": 108, "title": "ری" }, { "value": 10809, "parentID": 108, "title": "شمیرانات" }, { "value": 10810, "parentID": 108, "title": "شهریار" }, { "value": 10811, "parentID": 108, "title": "فیروزکوه", "children": [{ "value": 1081101, "parentID": 10811, "title": "ارجمند" }, { "value": 1081102, "parentID": 10811, "title": "فیروزکوه" }] }, { "value": 10812, "parentID": 108, "title": "قدس" }, { "value": 10813, "parentID": 108, "title": "ملارد" }, { "value": 10814, "parentID": 108, "title": "ورامین" }] }, { "value": 109, "parentID": 1, "title": "چهارمحال و بختیاری", "children": [{ "value": 10901, "parentID": 109, "title": "اردل" }, { "value": 10902, "parentID": 109, "title": "بروجن" }, { "value": 10903, "parentID": 109, "title": "شهرکرد" }, { "value": 10904, "parentID": 109, "title": "فارسان" }, { "value": 10905, "parentID": 109, "title": "لردگان" }, { "value": 10906, "parentID": 109, "title": "کوهرنگ" }, { "value": 10907, "parentID": 109, "title": "کیار" }] }, { "value": 110, "parentID": 1, "title": "خراسان جنوبی", "children": [{ "value": 11001, "parentID": 110, "title": "بشرویه" }, { "value": 11002, "parentID": 110, "title": "بیرجند" }, { "value": 11003, "parentID": 110, "title": "درمیان" }, { "value": 11004, "parentID": 110, "title": "سرایان" }, { "value": 11005, "parentID": 110, "title": "سربیشه" }, { "value": 11006, "parentID": 110, "title": "فردوس" }, { "value": 11007, "parentID": 110, "title": "قاینات" }, { "value": 11008, "parentID": 110, "title": "نهبندان" }] }, { "value": 111, "parentID": 1, "title": "خراسان رضوی", "children": [{ "value": 11101, "parentID": 111, "title": "باخزر" }, { "value": 11102, "parentID": 111, "title": "بجستان" }, { "value": 11103, "parentID": 111, "title": "بردسکن" }, { "value": 11104, "parentID": 111, "title": "بینالود" }, { "value": 11105, "parentID": 111, "title": "تایباد" }, { "value": 11106, "parentID": 111, "title": "تخت جلگه" }, { "value": 11107, "parentID": 111, "title": "تربت جام" }, { "value": 11108, "parentID": 111, "title": "تربت حیدریه" }, { "value": 11109, "parentID": 111, "title": "جغتای" }, { "value": 11110, "parentID": 111, "title": "جوین" }, { "value": 11111, "parentID": 111, "title": "چناران" }, { "value": 11112, "parentID": 111, "title": "خلیل‌آباد" }, { "value": 11113, "parentID": 111, "title": "خواف" }, { "value": 11114, "parentID": 111, "title": "خوشاب" }, { "value": 11115, "parentID": 111, "title": "درگز" }, { "value": 11116, "parentID": 111, "title": "رشتخوار" }, { "value": 11117, "parentID": 111, "title": "زاوه" }, { "value": 11118, "parentID": 111, "title": "سبزوار" }, { "value": 11119, "parentID": 111, "title": "سرخس" }, { "value": 11120, "parentID": 111, "title": "فریمان" }, { "value": 11121, "parentID": 111, "title": "قوچان" }, { "value": 11122, "parentID": 111, "title": "گناباد" }, { "value": 11123, "parentID": 111, "title": "مشهد", "children": [{ "value": 1112301, "parentID": 11123, "title": "رضویه" }, { "value": 1112302, "parentID": 11123, "title": "مشهد" }, { "value": 1112303, "parentID": 11123, "title": "ملک آباد" }] }, { "value": 11124, "parentID": 111, "title": "مه‌ولات" }, { "value": 11125, "parentID": 111, "title": "نیشابور" }, { "value": 11126, "parentID": 111, "title": "کاشمر" }, { "value": 11127, "parentID": 111, "title": "کلات" }] }, { "value": 112, "parentID": 1, "title": "خراسان شمالی", "children": [{ "value": 11201, "parentID": 112, "title": "اسفراین" }, { "value": 11202, "parentID": 112, "title": "بجنورد" }, { "value": 11203, "parentID": 112, "title": "جاجرم" }, { "value": 11204, "parentID": 112, "title": "شیروان" }, { "value": 11205, "parentID": 112, "title": "فاروج" }, { "value": 11206, "parentID": 112, "title": "گرمه" }, { "value": 11207, "parentID": 112, "title": "مانه و سملقان" }] }, { "value": 113, "parentID": 1, "title": "خوزستان", "children": [{ "value": 11301, "parentID": 113, "title": "آبادان", "children": [{ "value": 1130101, "parentID": 11301, "title": "آبادان" }, { "value": 1130102, "parentID": 11301, "title": "اروند کنار" }, { "value": 1130103, "parentID": 11301, "title": "چوئبده" }] }, { "value": 11302, "parentID": 113, "title": "امیدیه" }, { "value": 11303, "parentID": 113, "title": "اندیمشک" }, { "value": 11304, "parentID": 113, "title": "اندیکا" }, { "value": 11305, "parentID": 113, "title": "اهواز", "children": [{ "value": 1130501, "parentID": 11305, "title": "اهواز" }, { "value": 1130502, "parentID": 11305, "title": "حمیدیه" }] }, { "value": 11306, "parentID": 113, "title": "ایذه" }, { "value": 11307, "parentID": 113, "title": "باغ ملک" }, { "value": 11308, "parentID": 113, "title": "باوی" }, { "value": 11309, "parentID": 113, "title": "بندر ماهشهر", "children": [{ "value": 1130901, "parentID": 11309, "title": "بندر امام خمینی" }, { "value": 1130902, "parentID": 11309, "title": "بندر ماهشهر" }, { "value": 1130903, "parentID": 11309, "title": "چمران" }] }, { "value": 11310, "parentID": 113, "title": "بهبهان" }, { "value": 11311, "parentID": 113, "title": "خرمشهر" }, { "value": 11312, "parentID": 113, "title": "دزفول" }, { "value": 11313, "parentID": 113, "title": "دشت آزادگان" }, { "value": 11314, "parentID": 113, "title": "رامشیر" }, { "value": 11315, "parentID": 113, "title": "رامهرمز" }, { "value": 11316, "parentID": 113, "title": "شادگان" }, { "value": 11317, "parentID": 113, "title": "شوش" }, { "value": 11318, "parentID": 113, "title": "شوشتر" }, { "value": 11319, "parentID": 113, "title": "گتوند" }, { "value": 11320, "parentID": 113, "title": "لالی" }, { "value": 11321, "parentID": 113, "title": "مسجدسلیمان" }, { "value": 11322, "parentID": 113, "title": "هفتگل" }, { "value": 11323, "parentID": 113, "title": "هندیجان" }, { "value": 11324, "parentID": 113, "title": "هویزه" }] }, { "value": 114, "parentID": 1, "title": "زنجان", "children": [{ "value": 11401, "parentID": 114, "title": "ابهر" }, { "value": 11402, "parentID": 114, "title": "ایجرود" }, { "value": 11403, "parentID": 114, "title": "خدابنده" }, { "value": 11404, "parentID": 114, "title": "خرمدره" }, { "value": 11405, "parentID": 114, "title": "زنجان", "children": [{ "value": 1140501, "parentID": 11405, "title": "ارمخانخانه" }, { "value": 1140502, "parentID": 11405, "title": "زنجان" }, { "value": 1140503, "parentID": 11405, "title": "نیک پی" }] }, { "value": 11406, "parentID": 114, "title": "طارم" }, { "value": 11407, "parentID": 114, "title": "ماهنشان" }] }, { "value": 115, "parentID": 1, "title": "سمنان", "children": [{ "value": 11501, "parentID": 115, "title": "دامغان" }, { "value": 11502, "parentID": 115, "title": "سمنان" }, { "value": 11503, "parentID": 115, "title": "شاهرود" }, { "value": 11504, "parentID": 115, "title": "گرمسار" }, { "value": 11505, "parentID": 115, "title": "مهدی‌شهر" }] }, { "value": 116, "parentID": 1, "title": "سیستان و بلوچستان", "children": [{ "value": 11601, "parentID": 116, "title": "ایرانشهر" }, { "value": 11602, "parentID": 116, "title": "چاه‌بهار" }, { "value": 11603, "parentID": 116, "title": "خاش" }, { "value": 11604, "parentID": 116, "title": "دلگان" }, { "value": 11605, "parentID": 116, "title": "زابل" }, { "value": 11606, "parentID": 116, "title": "زاهدان" }, { "value": 11607, "parentID": 116, "title": "زهک" }, { "value": 11608, "parentID": 116, "title": "سراوان" }, { "value": 11609, "parentID": 116, "title": "سرباز" }, { "value": 11610, "parentID": 116, "title": "سیب و سوران" }, { "value": 11611, "parentID": 116, "title": "مهرستان" }, { "value": 11612, "parentID": 116, "title": "نیک شهر" }, { "value": 11613, "parentID": 116, "title": "هیرمند" }, { "value": 11614, "parentID": 116, "title": "کنارک" }] }, { "value": 117, "parentID": 1, "title": "فارس", "children": [{ "value": 11701, "parentID": 117, "title": "آباده" }, { "value": 11702, "parentID": 117, "title": "ارسنجان" }, { "value": 11703, "parentID": 117, "title": "استهبان" }, { "value": 11704, "parentID": 117, "title": "اقلید" }, { "value": 11705, "parentID": 117, "title": "بوانات" }, { "value": 11706, "parentID": 117, "title": "پاسارگاد" }, { "value": 11707, "parentID": 117, "title": "جهرم" }, { "value": 11708, "parentID": 117, "title": "خرامه" }, { "value": 11709, "parentID": 117, "title": "خرم بید" }, { "value": 11710, "parentID": 117, "title": "خنج" }, { "value": 11711, "parentID": 117, "title": "داراب" }, { "value": 11712, "parentID": 117, "title": "رستم" }, { "value": 11713, "parentID": 117, "title": "زرین دشت" }, { "value": 11714, "parentID": 117, "title": "سپیدان" }, { "value": 11715, "parentID": 117, "title": "سروستان" }, { "value": 11716, "parentID": 117, "title": "شیراز", "children": [{ "value": 1171601, "parentID": 11716, "title": "خانه زنیان" }, { "value": 1171602, "parentID": 11716, "title": "داریان" }, { "value": 1171603, "parentID": 11716, "title": "زرقان" }, { "value": 1171604, "parentID": 11716, "title": "شهر جدید صدرا" }, { "value": 1171605, "parentID": 11716, "title": "شیراز" }, { "value": 1171606, "parentID": 11716, "title": "لپوئی" }] }, { "value": 11717, "parentID": 117, "title": "فراشبند" }, { "value": 11718, "parentID": 117, "title": "فسا" }, { "value": 11719, "parentID": 117, "title": "فیروزآباد" }, { "value": 11720, "parentID": 117, "title": "قیروکارزین" }, { "value": 11721, "parentID": 117, "title": "گراش" }, { "value": 11722, "parentID": 117, "title": "لارستان" }, { "value": 11723, "parentID": 117, "title": "لامرد" }, { "value": 11724, "parentID": 117, "title": "مرودشت" }, { "value": 11725, "parentID": 117, "title": "ممسنی" }, { "value": 11726, "parentID": 117, "title": "مهر" }, { "value": 11727, "parentID": 117, "title": "نی ریز" }, { "value": 11728, "parentID": 117, "title": "کازرون" }, { "value": 11729, "parentID": 117, "title": "کوار" }] }, { "value": 118, "parentID": 1, "title": "قزوین", "children": [{ "value": 11801, "parentID": 118, "title": "آبیک" }, { "value": 11802, "parentID": 118, "title": "البرز" }, { "value": 11803, "parentID": 118, "title": "بویین‌زهرا" }, { "value": 11804, "parentID": 118, "title": "تاکستان" }, { "value": 11805, "parentID": 118, "title": "قزوین", "children": [{ "value": 1180501, "parentID": 11805, "title": "اقبالیه" }, { "value": 1180502, "parentID": 11805, "title": "رازمیان" }, { "value": 1180503, "parentID": 11805, "title": "سیردان" }, { "value": 1180504, "parentID": 11805, "title": "قزوین" }, { "value": 1180505, "parentID": 11805, "title": "کوهین" }, { "value": 1180506, "parentID": 11805, "title": "محمود آباد نمونه" }, { "value": 1180507, "parentID": 11805, "title": "معلم کلایه" }] }] }, { "value": 119, "parentID": 1, "title": "قم", "children": [{ "value": 11901, "parentID": 119, "title": "قم" }] }, { "value": 120, "parentID": 1, "title": "گلستان", "children": [{ "value": 12001, "parentID": 120, "title": "آزادشهر" }, { "value": 12002, "parentID": 120, "title": "آق قلا" }, { "value": 12003, "parentID": 120, "title": "بندر گز" }, { "value": 12004, "parentID": 120, "title": "ترکمن" }, { "value": 12005, "parentID": 120, "title": "رامیان" }, { "value": 12006, "parentID": 120, "title": "علی‌آباد" }, { "value": 12007, "parentID": 120, "title": "گالیکش" }, { "value": 12008, "parentID": 120, "title": "گرگان" }, { "value": 12009, "parentID": 120, "title": "گمیشان" }, { "value": 12010, "parentID": 120, "title": "گنبد کاووس" }, { "value": 12011, "parentID": 120, "title": "مراوه تپه" }, { "value": 12012, "parentID": 120, "title": "مینودشت" }, { "value": 12013, "parentID": 120, "title": "کردکوی" }, { "value": 12014, "parentID": 120, "title": "کلاله" }] }, { "value": 121, "parentID": 1, "title": "گیلان", "children": [{ "value": 12101, "parentID": 121, "title": "آستارا" }, { "value": 12102, "parentID": 121, "title": "آستانه اشرفیه" }, { "value": 12103, "parentID": 121, "title": "املش" }, { "value": 12104, "parentID": 121, "title": "بندر انزلی" }, { "value": 12105, "parentID": 121, "title": "تالش" }, { "value": 12106, "parentID": 121, "title": "رشت" }, { "value": 12107, "parentID": 121, "title": "رضوانشهر" }, { "value": 12108, "parentID": 121, "title": "رودبار" }, { "value": 12109, "parentID": 121, "title": "رودسر" }, { "value": 12110, "parentID": 121, "title": "سیاهکل" }, { "value": 12111, "parentID": 121, "title": "شفت" }, { "value": 12112, "parentID": 121, "title": "صومعه سرا" }, { "value": 12113, "parentID": 121, "title": "فومن" }, { "value": 12114, "parentID": 121, "title": "لاهیجان" }, { "value": 12115, "parentID": 121, "title": "لنگرود" }, { "value": 12116, "parentID": 121, "title": "ماسال" }] }, { "value": 122, "parentID": 1, "title": "لرستان", "children": [{ "value": 12201, "parentID": 122, "title": "ازنا" }, { "value": 12202, "parentID": 122, "title": "الیگودرز" }, { "value": 12203, "parentID": 122, "title": "بروجرد" }, { "value": 12204, "parentID": 122, "title": "پلدختر" }, { "value": 12205, "parentID": 122, "title": "خرم‌آباد", "children": [{ "value": 1220501, "parentID": 12205, "title": "بیرانشهر" }, { "value": 1220502, "parentID": 12205, "title": "خرم آباد" }, { "value": 1220503, "parentID": 12205, "title": "زاغه" }, { "value": 1220504, "parentID": 12205, "title": "سپید دشت" }] }, { "value": 12206, "parentID": 122, "title": "دلفان" }, { "value": 12207, "parentID": 122, "title": "دوره" }, { "value": 12208, "parentID": 122, "title": "دورود" }, { "value": 12209, "parentID": 122, "title": "سلسله" }, { "value": 12210, "parentID": 122, "title": "کوهدشت" }] }, { "value": 123, "parentID": 1, "title": "مازندران", "children": [{ "value": 12301, "parentID": 123, "title": "آمل" }, { "value": 12302, "parentID": 123, "title": "بابل" }, { "value": 12303, "parentID": 123, "title": "بابلسر" }, { "value": 12304, "parentID": 123, "title": "بهشهر" }, { "value": 12305, "parentID": 123, "title": "تنکابن" }, { "value": 12306, "parentID": 123, "title": "جویبار" }, { "value": 12307, "parentID": 123, "title": "چالوس" }, { "value": 12308, "parentID": 123, "title": "رامسر" }, { "value": 12309, "parentID": 123, "title": "ساری", "children": [{ "value": 1230901, "parentID": 12309, "title": "ساری" }] }, { "value": 12310, "parentID": 123, "title": "سوادکوه" }, { "value": 12311, "parentID": 123, "title": "عباس آباد" }, { "value": 12312, "parentID": 123, "title": "فریدونکنار" }, { "value": 12313, "parentID": 123, "title": "قائم‌شهر" }, { "value": 12314, "parentID": 123, "title": "گلوگاه" }, { "value": 12315, "parentID": 123, "title": "محمودآباد" }, { "value": 12316, "parentID": 123, "title": "میاندرود" }, { "value": 12317, "parentID": 123, "title": "نور" }, { "value": 12318, "parentID": 123, "title": "نوشهر" }, { "value": 12319, "parentID": 123, "title": "نکا" }] }, { "value": 124, "parentID": 1, "title": "مرکزی", "children": [{ "value": 12401, "parentID": 124, "title": "آشتیان" }, { "value": 12402, "parentID": 124, "title": "اراک", "children": [{ "value": 1240201, "parentID": 12402, "title": "اراک" }] }, { "value": 12403, "parentID": 124, "title": "تفرش" }, { "value": 12404, "parentID": 124, "title": "خمین" }, { "value": 12405, "parentID": 124, "title": "خنداب" }, { "value": 12406, "parentID": 124, "title": "دلیجان" }, { "value": 12407, "parentID": 124, "title": "زرندیه" }, { "value": 12408, "parentID": 124, "title": "ساوه" }, { "value": 12409, "parentID": 124, "title": "شازند" }, { "value": 12410, "parentID": 124, "title": "فراهان" }, { "value": 12411, "parentID": 124, "title": "محلات" }, { "value": 12412, "parentID": 124, "title": "کمیجان" }] }, { "value": 125, "parentID": 1, "title": "هرمزگان", "children": [{ "value": 12501, "parentID": 125, "title": "ابوموسی" }, { "value": 12502, "parentID": 125, "title": "بستک" }, { "value": 12503, "parentID": 125, "title": "بشاگرد" }, { "value": 12504, "parentID": 125, "title": "بندر لنگه" }, { "value": 12505, "parentID": 125, "title": "بندرعباس" }, { "value": 12506, "parentID": 125, "title": "پارسیان" }, { "value": 12507, "parentID": 125, "title": "جاسک" }, { "value": 12508, "parentID": 125, "title": "حاجی‌آباد" }, { "value": 12509, "parentID": 125, "title": "خمیر" }, { "value": 12510, "parentID": 125, "title": "رودان" }, { "value": 12511, "parentID": 125, "title": "سیریک" }, { "value": 12512, "parentID": 125, "title": "قشم" }, { "value": 12513, "parentID": 125, "title": "میناب" }] }, { "value": 126, "parentID": 1, "title": "همدان", "children": [{ "value": 12601, "parentID": 126, "title": "اسدآباد" }, { "value": 12602, "parentID": 126, "title": "بهار" }, { "value": 12603, "parentID": 126, "title": "تویسرکان" }, { "value": 12604, "parentID": 126, "title": "رزن" }, { "value": 12605, "parentID": 126, "title": "فامنین" }, { "value": 12606, "parentID": 126, "title": "ملایر" }, { "value": 12607, "parentID": 126, "title": "نهاوند" }, { "value": 12608, "parentID": 126, "title": "همدان" }, { "value": 12609, "parentID": 126, "title": "کبودرآهنگ" }] }, { "value": 127, "parentID": 1, "title": "کردستان", "children": [{ "value": 12701, "parentID": 127, "title": "بانه" }, { "value": 12702, "parentID": 127, "title": "بیجار" }, { "value": 12703, "parentID": 127, "title": "دهگلان" }, { "value": 12704, "parentID": 127, "title": "دیواندره" }, { "value": 12705, "parentID": 127, "title": "سروآباد" }, { "value": 12706, "parentID": 127, "title": "سقز" }, { "value": 12707, "parentID": 127, "title": "سنندج" }, { "value": 12708, "parentID": 127, "title": "قروه" }, { "value": 12709, "parentID": 127, "title": "مریوان" }, { "value": 12710, "parentID": 127, "title": "کامیاران" }] }, { "value": 128, "parentID": 1, "title": "کرمان", "children": [{ "value": 12801, "parentID": 128, "title": "ارزوئیه" }, { "value": 12802, "parentID": 128, "title": "انار" }, { "value": 12803, "parentID": 128, "title": "بافت" }, { "value": 12804, "parentID": 128, "title": "بردسیر" }, { "value": 12805, "parentID": 128, "title": "بم" }, { "value": 12806, "parentID": 128, "title": "جیرفت" }, { "value": 12807, "parentID": 128, "title": "رابر" }, { "value": 12808, "parentID": 128, "title": "راور" }, { "value": 12809, "parentID": 128, "title": "رفسنجان" }, { "value": 12810, "parentID": 128, "title": "رودبار جنوب" }, { "value": 12811, "parentID": 128, "title": "ریگان" }, { "value": 12812, "parentID": 128, "title": "زرند" }, { "value": 12813, "parentID": 128, "title": "سیرجان" }, { "value": 12814, "parentID": 128, "title": "شهربابک" }, { "value": 12815, "parentID": 128, "title": "عنبرآباد" }, { "value": 12816, "parentID": 128, "title": "فاریاب" }, { "value": 12817, "parentID": 128, "title": "فهرج" }, { "value": 12818, "parentID": 128, "title": "قلعه گنج" }, { "value": 12819, "parentID": 128, "title": "منوجان" }, { "value": 12820, "parentID": 128, "title": "نرماشیر" }, { "value": 12821, "parentID": 128, "title": "کرمان", "children": [{ "value": 1282101, "parentID": 12821, "title": "اختیار آباد" }, { "value": 1282102, "parentID": 12821, "title": "اندوهجرد" }, { "value": 1282103, "parentID": 12821, "title": "باغین" }, { "value": 1282104, "parentID": 12821, "title": "جوپار" }, { "value": 1282105, "parentID": 12821, "title": "چترود" }, { "value": 1282106, "parentID": 12821, "title": "راین" }, { "value": 1282107, "parentID": 12821, "title": "زنگی آباد" }, { "value": 1282108, "parentID": 12821, "title": "شهداد" }, { "value": 1282109, "parentID": 12821, "title": "کاظم آباد" }, { "value": 1282110, "parentID": 12821, "title": "کرمان" }, { "value": 1282111, "parentID": 12821, "title": "گلباف" }, { "value": 1282112, "parentID": 12821, "title": "ماهان" }, { "value": 1282113, "parentID": 12821, "title": "محی آباد" }] }, { "value": 12822, "parentID": 128, "title": "کهنوج" }, { "value": 12823, "parentID": 128, "title": "کوهبنان" }] }, { "value": 129, "parentID": 1, "title": "کرمانشاه", "children": [{ "value": 12901, "parentID": 129, "title": "اسلام‌آباد غرب" }, { "value": 12902, "parentID": 129, "title": "پاوه" }, { "value": 12903, "parentID": 129, "title": "ثلاث باباجانی" }, { "value": 12904, "parentID": 129, "title": "جوانرود" }, { "value": 12905, "parentID": 129, "title": "دالاهو" }, { "value": 12906, "parentID": 129, "title": "روانسر" }, { "value": 12907, "parentID": 129, "title": "سرپل ذهاب" }, { "value": 12908, "parentID": 129, "title": "سنقر" }, { "value": 12909, "parentID": 129, "title": "صحنه" }, { "value": 12910, "parentID": 129, "title": "قصرشیرین" }, { "value": 12911, "parentID": 129, "title": "گیلانغرب" }, { "value": 12912, "parentID": 129, "title": "هرسین" }, { "value": 12913, "parentID": 129, "title": "کرمانشاه" }, { "value": 12914, "parentID": 129, "title": "کنگاور" }] }, { "value": 130, "parentID": 1, "title": "کهگیلویه و بویراحمد", "children": [{ "value": 13001, "parentID": 130, "title": "باشت" }, { "value": 13002, "parentID": 130, "title": "بهمئی" }, { "value": 13003, "parentID": 130, "title": "بویراحمد" }, { "value": 13004, "parentID": 130, "title": "چرام" }, { "value": 13005, "parentID": 130, "title": "دنا" }, { "value": 13006, "parentID": 130, "title": "گچساران" }, { "value": 13007, "parentID": 130, "title": "کهگیلویه" }] }, { "value": 131, "parentID": 1, "title": "یزد", "children": [{ "value": 13101, "parentID": 131, "title": "ابرکوه" }, { "value": 13102, "parentID": 131, "title": "اردکان" }, { "value": 13103, "parentID": 131, "title": "بافق" }, { "value": 13104, "parentID": 131, "title": "بهاباد" }, { "value": 13105, "parentID": 131, "title": "تفت" }, { "value": 13106, "parentID": 131, "title": "خاتم" }, { "value": 13107, "parentID": 131, "title": "صدوق" }, { "value": 13108, "parentID": 131, "title": "طبس" }, { "value": 13109, "parentID": 131, "title": "مهریز" }, { "value": 13110, "parentID": 131, "title": "میبد" }, { "value": 13111, "parentID": 131, "title": "یزد" }] }] }];

const CompanyDetail = () => {

    const [value, setValue] = useState();
    const onChange = (newValue) => {
        setValue(newValue);
    };

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

    const defaultColDef = useMemo(() => {
        return {
            // flex: 1,
            filter: false,
            sortable: true,
            floatingFilter: false,
            resizable: true,
        };
    }, []);

    const [columnDefsProduct] = useState([
        { field: 'id', sortable: true, headerName: "ردبف  ", filter: 'agNumberColumnFilter', width: 100 },
        { field: 'product', sortable: true, headerName: " محصول", filter: 'agTextColumnFilter', width: 138 },
        { field: 'count', sortable: true, headerName: "تعداد ", filter: 'agTextColumnFilter', width: 100 },
        { field: 'desc', sortable: true, headerName: " توضیحات", filter: 'agTextColumnFilter', width: 300 },
    ]);

    const [columnDefsTel] = useState([
        { field: 'id', sortable: true, headerName: "ردبف", filter: 'agNumberColumnFilter', width: 100 },
        { field: 'tel', sortable: true, headerName: " تلفن", filter: 'agTextColumnFilter', width: 138 },
        { field: 'type', sortable: true, headerName: "نوع ", filter: 'agTextColumnFilter', width: 100 },
        { field: 'desc', sortable: true, headerName: " توضیحات", filter: 'agTextColumnFilter', width: 300 },
    ]);

    const [columnDefsConnection] = useState([
        { field: 'id', sortable: true, headerName: "ردبف", filter: 'agNumberColumnFilter', width: 100 },
        { field: 'namefamily', sortable: true, headerName: " نام و نام خانوادگی", filter: 'agTextColumnFilter', width: 200 },
        { field: 'semat', sortable: true, headerName: "سمت ", filter: 'agTextColumnFilter', width: 100 },
        { field: 'tel', sortable: true, headerName: " تلفن", filter: 'agTextColumnFilter', width: 100 },
        { field: 'email', sortable: true, headerName: " ایمیل", filter: 'agTextColumnFilter', width: 200 },
        { field: 'active', sortable: true, headerName: " فعال", filter: 'agTextColumnFilter', width: 100 },
        { field: 'sendemail', sortable: true, headerName: " عدم ارسال ایمیل", filter: 'agTextColumnFilter', width: 200 },
        { field: 'desc', sortable: true, headerName: " توضیحات", filter: 'agTextColumnFilter', width: 300 },

    ]);

    const [rowDataProduct, setRowDataProduct] = useState([]);
    const [rowDataTel, setRowDataTel] = useState([]);
    const [rowDataConnection, setRowDataConnection] = useState([]);




    const onchangeDate = (value) => {
        let x = moment(dayjs(value, { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')
        form.setFieldValue("registerDate", x);
        console.log(x);

    }

    dayjs.calendar('jalali');
    const dateFormat = 'YYYY/MM/DD';
    const [componentDisabled, setComponentDisabled] = useState(true);
    const navigate = useNavigate();
    let params = useLocation();
    const formRef = useRef(null);
    const [form] = Form.useForm();
    const [optionsSelect, setOptionsSelect] = useState([]);
    const [sarafi, setSarafi] = useState([
        {
            value: 1,
            label: 'گروه 1',
        },
        {
            value: 2,
            label: 'گروه 2',
        },
        {
            value: 3,
            label: 'گروه 3',
        },
        {
            value: 4,
            label: 'گروه 4',
            //   disabled: true,
        },
    ]);

    const { TextArea } = Input;

    const onFormLayoutChange = ({ disabled }) => {
        setComponentDisabled(disabled);
    };
    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFinish = (values) => {
        //sarafiid
        console.log(values);
        //    navigate("/RialiPaymentDetail", { state: { transactionId: values.companycode } })
    };

    const onSave = () => {
        console.log(form.getFieldsValue());
    }





    const onFill = () => {


        form.setFieldsValue({
            companycode: 40,
            companyname: 'شرکت تستی ',
            address: "ادرس شرکت",
            group: 1,
            chkcustomer: true,
            chkDontSendEmail: true,
            email: "asad@yahoo.com",
            region:10401,
            industry: 4,
            description: "شرح شرکتی که در این تاریخ ثبت شده است",
            moaref: "معرف",
            selectivegroup: "گروه های انتخابی",
            buyer: "خریدار",
            registrator: "اسعد احمدی",
            registerDate: moment(dayjs(new Date(), { jalali: true }).format('YYYY-MM-DD hh:mm:ss'), 'jYYYY/jMM/jDD hh:mm:ss').locale('en').format('YYYY-MM-DD hh:mm:ss')

        });
        setRowDataProduct([
            { id: "1", product: "محصول اول", count: 12, desc: "شرح محصول اول" },
        ]);

        setRowDataTel([
            { id: "1", tel: "021-664952128", type: "نوع اول", desc: "شرح تلفن اول" },
            { id: "2", tel: "021-9454545", type: "نوع دوم", desc: "شرح تلفن دوم" },
            { id: "3", tel: "021-55664", type: "نوع سوم", desc: "شرح تلفن سوم" },
            { id: "4", tel: "021-8788", type: "نوع چهارم", desc: "شرح تلفن چهارم" },
        ])


        setRowDataConnection([
            { id: "1", namefamily: "اسعد احمدی", semat: 12, tel: "021956654654", email: "asad.ahmadi@gmail.com", active: true, sendemail: false, desc: "شرح ارتباطات اول" },
        ]);
    };


    useEffect(() => {
        axios.post("/CRM_Region")
            .then(res => {
                //    form.setFieldsValue(res.data.data[0]);
                console.log(res.data.data.list);
                document.body.classList.remove('loading-indicator');
            }).catch(err => {
                toast.warn("اشکال در فراخوانی اتطلاعات");
                document.body.classList.remove('loading-indicator');

            }).finally(() => {
            });

    }, []);




    return (
        <Card type="inner" title="جزییات  شرکت" size="default" extra={
            <Space wrap>
                <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                >
                    Form disabled
                </Checkbox>
                <Button type="primary" htmlType="submit" onClick={onSave}>ذخیره  </Button>
                <Button type="primary" danger htmlType="button" onClick={onFill}>پر نمودن فرم </Button>
                <Button htmlType="button" onClick={onReset}>  پاکسازی فرم </Button>
            </Space>

        }>

            <Form ref={formRef} form={form} name="basic" onFinish={onFinish} disabled={componentDisabled}>
                {/* <Space size={[8, 45]} wrap> */}
                <Row>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="کد" name="companycode" className='ant-input-group-addon'
                            rules={[
                                {
                                    // type: 'number',
                                    // min: 0,
                                    // max: 99,

                                    required: true,
                                    message: 'کد ضروری است',
                                },
                            ]}>
                            <InputNumber placeholder=" کد شرکت "></InputNumber >

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Space.Compact block size="small">

                            <Form.Item name="chkcustomer" valuePropName="checked">
                                <Checkbox>مشتری</Checkbox>
                            </Form.Item>


                            <Form.Item name="chkActive" valuePropName="checked">
                                <Checkbox>فعال</Checkbox>
                            </Form.Item>


                            <Form.Item name="chkDontSendEmail" valuePropName="checked">
                                <Checkbox>عدم ارسال ایمیل</Checkbox>
                            </Form.Item>
                        </Space.Compact>
                    </Col>
                    <Col lg={3} md={6} sm={12} >

                    </Col>
                    <Col lg={6} md={12} sm={12} >
                        <Form.Item label="نام" name="companyname" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: 'نام شرکت ضروری است',
                                },
                            ]}>
                            <Input placeholder=" نام شرکت "></Input>

                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item name="group" label="  گروه " className='ant-input-group-addon'
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: ' گروه ضروری است',
                        //     },
                        // ]}
                        >
                            {/* <Input  /> */}
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 100,
                                // }}
                                placeholder="لطفا انتخاب نمایید"
                                options={sarafi}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item name="industry" label="  صنعت " className='ant-input-group-addon'
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: ' صنعت ضروری است',
                        //     },
                        // ]}
                        >
                            {/* <Input  /> */}
                            <Select
                                //mode="multiple"
                                showSearch
                                allowClear
                                // style={{
                                //     width: 200,
                                // }}
                                placeholder="لطفا انتخاب نمایید"
                                options={sarafi}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={6} md={12} sm={12} >
                        <Form.Item label="آدرس" name="address" className='ant-input-group-addon'
                            rules={[
                                {
                                    required: true,
                                    message: ' آدرس ضروری است',
                                },
                            ]}>
                            <Input placeholder="  آدرس "
                            //  style={{ width: 300 }}
                            ></Input>

                        </Form.Item>
                    </Col>

                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="ناحیه" name="region" className='ant-input-group-addon'>
                            {/* <Input placeholder="  ناحیه "></Input> */}
                            <TreeSelect
                                showSearch
                                bordered={true}
                                treeLine={true}
                                showIcon={false}
                                // virtual={false}
                                style={{
                                    width: '100%',
                                }}
                                value={value}
                                dropdownStyle={{
                                    maxHeight: 400,
                                    overflow: 'auto',
                                }}
                                placeholder="Please select"
                                allowClear
                                treeDefaultExpandAll
                                onChange={onChange}
                                treeData={treeData}
                                treeNodeFilterProp='title'
                                filterTreeNode={(search, item) => {
                                    return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                                  }}
                            />
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="ایمیل" name="email" className='ant-input-group-addon'>
                            <Input placeholder="  ایمیل "></Input>
                        </Form.Item>
                    </Col>

                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="معرف" name="moaref" className='ant-input-group-addon'>
                            <Input placeholder="  معرف "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="خریدار" name="buyer" className='ant-input-group-addon'>
                            <Input placeholder="  خریدار "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="ثبت کننده" name="registrator" className='ant-input-group-addon' >
                            <Input placeholder="  ثبت کننده " disabled={true}></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label="توضیحات" rows={4} name="description" className='ant-input-group-addon'>
                            {/* <Input rows={4} placeholder="  توضیحات "></Input> */}
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col lg={6} md={12} sm={12} >
                        <Form.Item label="گروه انتخابی" name="selectivegroup" className='ant-input-group-addon'>
                            <Input placeholder="  گروه انتخابی "></Input>
                        </Form.Item>
                    </Col>
                    <Col lg={3} md={6} sm={12} >
                        <Form.Item label=" تاریخ ثبت" name="registerDate">
                            <DatePickerCustom onChange={onchangeDate} />

                        </Form.Item>
                    </Col>
                    <Col lg={12} md={12} sm={12} >
                        <Tabs type='card' defaultActiveKey="1" items={
                            [
                                {
                                    key: '1',
                                    label: `محصولات`,
                                    children:
                                        <Col lg={6} md={12} sm={12} >
                                            <div style={{ height: "300px", width: "100%" }}>
                                                <AgGridReact
                                                    // onGridReady={onGridReady}
                                                    className="ag-theme-alpine"
                                                    enableRtl="true"
                                                    headerHeight="30"
                                                    rowHeight="30"
                                                    rowSelection={"single"}
                                                    localeText={localeText}
                                                    defaultColDef={defaultColDef}
                                                    columnDefs={columnDefsProduct}
                                                    rowData={rowDataProduct}

                                                >
                                                </AgGridReact>
                                            </div>
                                        </Col>
                                    ,
                                },
                                {
                                    key: '2',
                                    label: `شماره تماس`,
                                    children:
                                        <Col lg={6} md={12} sm={12} >
                                            <div style={{ height: "300px", width: "100%" }}>
                                                <AgGridReact
                                                    // onGridReady={onGridReady}
                                                    className="ag-theme-alpine"
                                                    enableRtl="true"
                                                    headerHeight="30"
                                                    rowHeight="30"
                                                    rowSelection={"single"}
                                                    localeText={localeText}
                                                    defaultColDef={defaultColDef}
                                                    columnDefs={columnDefsTel}
                                                    rowData={rowDataTel}

                                                >
                                                </AgGridReact>
                                            </div>
                                        </Col>,
                                },
                                {
                                    key: '3',
                                    label: `رابط ها`,
                                    children:
                                        <Col lg={12} md={12} sm={12} >
                                            <div style={{ height: "300px", width: "100%" }}>
                                                <AgGridReact
                                                    // onGridReady={onGridReady}
                                                    className="ag-theme-alpine"
                                                    enableRtl="true"
                                                    headerHeight="30"
                                                    rowHeight="30"
                                                    rowSelection={"single"}
                                                    localeText={localeText}
                                                    defaultColDef={defaultColDef}
                                                    columnDefs={columnDefsConnection}
                                                    rowData={rowDataConnection}

                                                >
                                                </AgGridReact>
                                            </div>
                                        </Col>,
                                },
                            ]
                        } />
                    </Col>

                </Row>

                {/* </Space> */}
            </Form>


        </Card>


    )
}

export default CompanyDetail

