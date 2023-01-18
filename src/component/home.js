import { useNavigate  } from "react-router-dom";
const home = (props) => {
  const navigate = useNavigate();
  function clickmee() {
    alert("hello");
    navigate('/Loginformnew');

  }
  return (


    <div>
      <h2>hello</h2>
      <a onClick={clickmee} >cliclme</a>
    </div>
  );
}
export default home