

// import MainLayout from './components/MainLayout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayoutNew from './components/MainLayoutNew';
import { ConfigProvider } from 'antd';
import fa_IR from "antd/lib/locale/fa_IR";
const App = () => {
  return (
    <div>
      <ConfigProvider locale={fa_IR}>
        <MainLayoutNew />
        <ToastContainer position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </ConfigProvider>
    </div>
  );
};
export default App;