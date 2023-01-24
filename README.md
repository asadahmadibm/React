# React

npm init react-app projectname

npm start

npm run build

if it not work try

  1- npm config set registry https://registry.npm.taobao.org  or npm config set registry https://registry.npmjs.org/
  
  2-npm install -g create-react-app
  
  3- npm create-react-app my-app
  
 # index.html & index.js
 
 فایل index.js یک فانکشن app.js زا فراخوانی می کند کد درون کامپوننت app.js نوشته می شود
    
 # create functional component

      1- create js file anywhere
 
      2-Add this codes
      
          import react from 'react' //for use jsx in file
          
          function Wellcome()
          
          {
          
          return ();
          
          }
          
          export default Wellcome
          
      3-for use a- import   b- <Wellcome />
          
  
  نکات :
  
  هر فایلی فقط یک default میتواند export کند که نحوه فراخوانی ان به شکل import functionname میباشد و به شکل <Wellcome /> استفاده میشود حرف اول ان بزرگ باشد
      
  اگر قبل هر فانکشن export گذاشته شود نحوه فراخوانی از بیرون باید به شکل import {functionname } باشد

 # prototpe
 
 دو نوع تایپ داریم یا در بین تگ مربوطه متغیر تعریف میکنیم که میتواند رشته یا عدد یا فانکشن باشد 
 
  که برای رشته و عدد مقدار دهی میکنیم و برای تابع همانجا تابع تعریف می کنیم   <Wellcome name='asad' age={25} />
 
 یا تک باز و بسته را جدا کرده درون آن المنت می گذاریم و ورودی ما میشود prop.childeren

      npm install --save prop-types    
      
      import PropTypes from 'prop-types';
      
  می توان برای ورودیها تایپ مشخص کرد در هر کامپوننت در اخر بعد از دستور export default این نوعها را برای ورودی تعریف می کنیم مثال
      
      Wellcome.propTypes = {  //wellcome is functional component
      
        name: PropTypes.string.isRequired,
        
        age:PropTypes.number.isRequired
        
      };
      
# define variable in functional component

		1- import {usestate} from 'react'

		2- const[varname,setvarname]=usestate(defaultvar)

		3- use setvarname(newvalue) to set to new value

		save value input on change to name state
		1- define varable const[name,setname]=usestate('')
		2- <input value={name} onchange={handlechange}

		3- handlechange=(e)=>{
			setname(e.target.value)
			}
			
			
			
# define valiable in class component			
			
		1- this.state.varname

		2- for set varname use this.setstate

		3- use varname in setstate

		example

		constructor ()	

		{

		this.state={

			varname:defualtvalue
			
			}
			
		}

		<button onclick={()=>this.setstate({count:this.state.count+!})}>

		<input name="name" value={this.state.name} onchange={()=>this.setstate({name:e.target.value})}
	      
# Routing	

		npm i --save react-router react-router-dom

		import Loginformnew from './component/Loginformnew';
		import Home from './component/home'
		import {BrowserRouter , Route, Routes, Link} from "react-router-dom";

		    <BrowserRouter>
		      <ul>
			  <li ><Link to='/Home'> home</Link></li>
				  <li ><Link to={{pathname:"/Home2",search:"?sort=name",state:{fromDashboard:true}}}> home2</Link></li>
			  <li ><Link to='/Loginformnew'> Loginformnew</Link></li>
		      </ul>
		      <Routes>
			  <Route exact path='/home' element={<Home />} />
			  <Route exact path='/Loginformnew' element={<Loginformnew />} />
		      </Routes>    
		    </BrowserRouter>


		دسترسی به پارامترهای روت اصلی در فرزند استفاده از
		import {  withRouter } from "react-router-dom";

			استفاده از پارامتهای ارسالی از طریق route به فرم

		import React,{useEffect} from 'react';

		const EditStudent = (props)=>{
		    useEffect(()=>{
			console.log(props.match.params);

		},[])


			انتخاب یکی از رویتهایی که مسیر یکی است ولی پارامتر آن متفابت است Switch


			رفتن به روت از طریق دستور
		import {  withRouter } from "react-router-dom";

		props.history.push({pathname:'/student/'+id}); or
		props.history.push('/student/'+id)
		
		or
		
		import { useNavigate  } from "react-router-dom";
		const navigate = useNavigate();
		navigate('/Loginformnew');
		navigate('/Players', {
		      state: {
			userId: id,
		      }
		    });
		    
		Then you can reference props.location.state.userId in the Players page.
		// Players Page
		import { useLocation } from "react-router-dom";
		const location = useLocation();
		// get userId
		let userId = location.state.userId;



			ریدایرکت شدن


		props.history.Replace('/student/'+id)

	

		use lazy

		const AddStudent = React.lazy(()=>import('../src/pages/AddStudent')) ;

		 <Route path="/add-student" exact render={()=>(
			      <Suspense fallback={<p>...loading</p>}>
				<AddStudent />
			      </Suspense>)} 
			    />

# Ag-grid

	npm install --save ag-grid-community
	npm install --save ag-grid-react
	
	import { AgGridReact } from 'ag-grid-react';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';
	Simple Example---------------------------------------
	const App = () => {
	   const [rowData] = useState([
	       {make: "Toyota", model: "Celica", price: 35000},
	       {make: "Ford", model: "Mondeo", price: 32000},
	       {make: "Porsche", model: "Boxster", price: 72000}
	   ]);

	   const [columnDefs] = useState([
	       { field: 'make', sortable: true ,headerName:"کد" , filter: 'agNumberColumnFilter' },
	       { field: 'model',headerName:"نام لاتین", filter: 'agTextColumnFilter' },
	       { field: 'price',headerName:"نام فارسی", filter: 'agTextColumnFilter' }
	   ])

	   return (
	       <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
		   <AgGridReact 
			rowData={rowData}
			columnDefs={columnDefs}>
		    </AgGridReact>
	       </div>
	   );
	};
	service Example---------------------------------------
	import react, { useState } from 'react'
	import { useEffect } from 'react';
	import axios from 'axios';
	import { AgGridReact } from 'ag-grid-react';
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';
	const Currency = () => {
	    const [rowData,setRowData] = useState('');

	    const [columnDefs] = useState([
		{ field: 'currencyId' , sortable: false ,headerName:"کد" , filter: 'agNumberColumnFilter',width: 120},
		{ field: 'englishNm' ,headerName:"نام لاتین", filter: 'agTextColumnFilter',width: 120},
		{ field: 'farsiNm' ,headerName:"نام فارسی", filter: 'agTextColumnFilter',width: 120}
	    ])
	    const [currencyDTO, setCurrencyDTO] = useState('');
	    useEffect(() => {
		console.log("loading");
		axios.get("/Currency")
		    .then(
			response => {
			    setCurrencyDTO(response.data.data.data)
			    setRowData(response.data.data.data);
			    console.log(response.data.data.data);
			})
	    }, []);

	    return (
		<div style={{height: 400, width: 600}}>
		    <h2>لیست ارزها</h2>
		    <AgGridReact 
		    	defaultColDef={{sortable: true, filter: true }}
			pagination="true"
			paginationPageSize="10"
			className="ag-theme-alpine"
			enableRtl="true"
			headerHeight="30"
			rowHeight="30"
			enableRangeSelection="true"
			rowData={rowData}
			columnDefs={columnDefs}>
		    </AgGridReact>
		</div>


	    )
	}
	export default Currency
	-----------------------------------------------------
	
# axios request to server

	npm install axios
	
	add bae url & header to index.js
	axios.defaults.baseURL = 'https://jsonplaceholder.ir'
	axios.defaults.headers.post['Contetnt-Type'] = 'application/json';
	axios.interceptors.request.use(function (config) {
  		config.headers.Authorization =  "Bearer "+token;
  		return config;
	});
	------------------------------------------------------------------
	73-handling-errors-global add this lines to index.js
	axios.interceptor.request.use(request=>{
	return request;}
	,error=>{
	promise.reject(new error("fail"))})
	
	axios.interceptor.response.use(response=>{
	return response;}
	,error=>{
	promise.reject(error)})
	----------------------------------------------------------------
	for use in js file
	import axios from '../axios';
	//GET 
	axios.get('/posts')
        .then(response=>{
          console.log(response.data);
        }).catch(error=>{
          console.log(error)
        });
	
	// POST request using axios with set headers & error handling
	    const article = { title: 'React POST Request Example' };
	    const headers = { 
		'Authorization': 'Bearer my-token',
		'My-Custom-Header': 'foobar'
	    };
	    axios.post('https://reqres.in/api/articles', article, { headers })
		.then(response => this.setState({ articleId: response.data.id }));
		.catch(error => {
		    this.setState({ errorMessage: error.message });
		    console.error('There was an error!', error);
		});
	
	axios.delete(`/posts/${id}`)
          .then(response=>{
            console.log(response)
          })
	--------------------------------------------------------------  
	for use by differente url make js file :
	import axios from 'axios';
	const instance = axios.create({
	    baseURL:'https://jsonplaceholder.ir'
	})
	instance.interceptor.request.use( ....
	export default instance;
	  
	
