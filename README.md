# React

npm init react-app projectname

npm start

npm run build

if it not work try

  1- npm config set registry https://registry.npm.taobao.org
  
  2- npx create-react-app my-app
  
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
	      
