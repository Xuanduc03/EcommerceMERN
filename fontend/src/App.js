import { Outlet, useLocation} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common/helper';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Context from './context/contex';

function App() {
  const dispatch = useDispatch(); // Khởi tạo dispatch
  const location = useLocation();

  const isPathAdmin = location.pathname.startsWith('/admin-panel')

  const fetchUserDetail = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data)); // Dispatch để lưu user details vào Redux store
      } else {
        console.error('Failed to fetch user data:', dataApi.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Fetch thông tin người dùng khi component được mount
    fetchUserDetail();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetail,
        }}
      >
        <ToastContainer />
        {!isPathAdmin &&  <Header />}
        <Outlet /> {/* Outlet để hiển thị nội dung của các trang con */}
        {!isPathAdmin && <Footer />}
      </Context.Provider>
    </>
  );
}

export default App;
