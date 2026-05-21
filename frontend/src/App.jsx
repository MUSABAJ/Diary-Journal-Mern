import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Entries from './pages/Entries';
import About from './pages/About';

import './App.css'
 
// redirects to /login if not authenticated

const PrivateRoute = ({children}) => {
  const {userInfo} = useSelector((state) => state.user);
  return userInfo ? children : <Navigate to="/login" replace/>;
};

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="entries"
            element={
              <PrivateRoute>
                <Entries />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;