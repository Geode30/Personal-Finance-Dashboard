import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from "./components/SignUp";
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

import { MyContext } from './MyContext';
import { useContext, useEffect, useState } from 'react';

function App() {

  const { token } = useContext(MyContext);

  const [isTokenAvailable, setIsTokenAvailable] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      if (token === 'No Token') {
        setIsTokenAvailable(false);
      } else {
        setIsTokenAvailable(true);
      }
    };

    checkToken();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={!isTokenAvailable ? <Home /> : <Navigate to='dashboard' />} />
        <Route path='register' element={!isTokenAvailable ? <SignUp /> : <Navigate to='/dashboard' />} />
        <Route path='login' element={!isTokenAvailable ? <SignIn /> : <Navigate to='/dashboard' />} />
        <Route path='dashboard' element={isTokenAvailable ? <Dashboard /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
