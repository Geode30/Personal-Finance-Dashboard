import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from "./pages/SignUp";
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AddIncomeForm from './pages/AddIncomeForm';
import AddExpenseForm from './pages/AddExpenseForm';
import History from './pages/History';

import { MyContext } from './MyContext';
import { useContext, useEffect, useState } from 'react';

function App() {

  const { token } = useContext(MyContext);

  const [isTokenAvailable, setIsTokenAvailable] = useState(true);

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

  const ProtectedRoute = ({ element, isTokenAvailable }) => {
    return isTokenAvailable ? element : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={!isTokenAvailable ? <Home /> : <Navigate to='dashboard' />} />
        <Route path='register' element={!isTokenAvailable ? <SignUp /> : <Navigate to='/dashboard' />} />
        <Route path='login' element={!isTokenAvailable ? <SignIn /> : <Navigate to='/dashboard' />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isTokenAvailable={isTokenAvailable} />} />
        <Route path="/income/add" element={<ProtectedRoute element={<AddIncomeForm />} isTokenAvailable={isTokenAvailable} />} />
        <Route path="/expense/add" element={<ProtectedRoute element={<AddExpenseForm />} isTokenAvailable={isTokenAvailable} />} />
        <Route path="/entry/history" element={<ProtectedRoute element={<History />} isTokenAvailable={isTokenAvailable} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
