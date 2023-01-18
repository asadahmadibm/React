import React ,{useState} from "react";

const studentrow=(props)=>{
    const [namefamily,setNamefamily]=useState('');
console.log(props);
setNamefamily(props.student.namefamily)
function changenamefamily()
{

}
    return(
        <div>
    <h2>hello studens</h2>
    <label>شماره دانشجویی {props.student.id}</label>
    <br></br>
    <label>نام و نام خانوادگی</label>
    <input type="text" value={namefamily} onChange="changenamefamily"></input>
    {/* <br></br>
    <label>کلاس</label>
    <input type="text" value={props.student.class}></input>
    <br></br>
    <label>شماره تلفن</label>
    <input type="number"></input>
    <br></br>
    <label>ایمسل </label>
    <input type="email" value={props.student.email}></input> */}

</div>

    );
}
export default studentrow;