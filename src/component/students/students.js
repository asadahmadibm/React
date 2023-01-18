import React from "react";
import Studentrow from './studentsrow'
const students=(props)=>{
return(
    props.student.map((ss)=>
    <Studentrow key={ss.id} student={ss}/>
    )
    
);
}
export default students