import axios from 'axios';
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1ODQwIiwiVXNlck5hbWUiOiJjb250Yy5haG1hZGl5IiwiVXNlclR5cGUiOiI4IiwicHJvdmluY2VzIjoiIiwiUm9sZXMiOiIiLCJuYmYiOjE2NzM5NTg1ODgsImV4cCI6MTY3Mzk2MjE4OCwiaWF0IjoxNjczOTU4NTg4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDEyIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.YoekJGAPyehi1F0Ac1mugrtaGZGOBWrCdftUFvmD-WM";
const httpcall ={

get:()=>{
    axios.get('https://localhost:7012/Currency', {
        headers: {
            "Authorization": "bearer " + access_token
        }
    })
        .then((res) => {
            console.log(res.data);
            return (res.data);
           
        })
        .catch((error) => {
            return "error";
        });
    }
}
export default httpcall;