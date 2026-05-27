import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Entries from './pages/Entries';
import Journal from './pages/Journal';
import CreateEntry from './pages/CreateEntry';
import { Outlet } from "react-router-dom";
import  Settings from './pages/Settings';

import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo ? children : <Navigate to="/login" replace />;
};

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f5f4ff] flex text-gray-800">  
         <Sidebar />
         <main className="flex-1 p-8 overflow-y-auto">
         <Outlet/>
         </main>
          
        </div>
  );
}

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Landing />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="entries" element={<Entries/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/entries/create" element={<CreateEntry />} />
          <Route path="/entries/:id" element={<Journal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
