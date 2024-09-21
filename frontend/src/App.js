import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from "./components/SignUp";
import SignIn from './components/SignIn';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes path='/'>
        <Route path='register' element={<SignUp />} />
        <Route path='login' element={<SignIn />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
