

// import MainLayout from './components/MainLayout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayoutNew from './components/MainLayoutNew';
const App = () => {
  return (
    <div>
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
      </div>
  );
};
export default App;