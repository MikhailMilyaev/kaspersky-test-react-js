import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import { publicRoutes } from './routes/index';
import Navbar from './components/Navbar/Navbar';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <main>
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
      
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;