import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from "./pages/SignUp";
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AddIncomeForm from './pages/AddIncomeForm';
import AddExpenseForm from './pages/AddExpenseForm';
import SetSavingsGoals from './pages/SetSavingsGoals';
import SetBudgets from './pages/SetBudgets';
import History from './pages/History';

import { MyContext } from './MyContext';
import { useContext, useEffect, useState } from 'react';

function App() {

  const { token } = useContext(MyContext);

  const [isTokenAvailableInitialTrue, setIsTokenAvailableTrue] = useState(true);
  const [isTokenAvailableInitialFalse, setIsTokenAvailableFalse] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      if (token === 'No Token') {
        setIsTokenAvailableTrue(false);
        setIsTokenAvailableFalse(false);
      } else {
        setIsTokenAvailableTrue(true);
        setIsTokenAvailableFalse(true);
      }
    };

    checkToken();
  }, [token]);

  const ProtectedRoute = ({ element }) => {
    return isTokenAvailableInitialTrue ? element : <Navigate to="/" />;
  };

  const RedirectIfLoggedIn = ({ element }) => { 
    return isTokenAvailableInitialFalse ? <Navigate to="/dashboard" /> : element;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RedirectIfLoggedIn element={<Home />} />} />
        <Route path='register' element={<RedirectIfLoggedIn element={<SignUp />} />} />
        <Route path='login' element={<RedirectIfLoggedIn element={<SignIn />} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/income/add" element={<ProtectedRoute element={<AddIncomeForm />} />} />
        <Route path="/expense/add" element={<ProtectedRoute element={<AddExpenseForm />} />} />
        <Route path="/set/goals" element={<ProtectedRoute element={<SetSavingsGoals />} />} />
        <Route path="/set/budgets" element={<ProtectedRoute element={<SetBudgets />} />} />
        <Route path="/entry/history" element={<ProtectedRoute element={<History />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
