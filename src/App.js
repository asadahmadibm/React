import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import Loginformnew from './component/Loginformnew';
import Home from './component/home'
import Students from './component/students/students'
import { BrowserRouter, Route, Routes, Switch, Link, withRouter } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const App = (props) => {
const[student,setStudent] =useState([
  {id:1,namefamily:"asad ahmadi",class:1,email:"asad@gmail.com"},
  {id:2,namefamily:"milad yaghoobi",class:2,email:"milad@yahoo.com"}
])
  return (
   <div >
    <Students  student={student}/>
   </div>
  );
};
export default App;