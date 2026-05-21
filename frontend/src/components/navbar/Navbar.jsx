import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavLinks from './NavLinks';
import NavProfile from './NavProfile';
import ThemeController from '../ThemeController';

import Profile from '../auth/Profile';
import Password from '../auth/Password';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
    <nav className="navbar bg-base-100 shadow-sm px-4">
      {/* Left: hamburger menu for mobile */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <NavLinks />
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">📅 DayBook</Link>
      </div>

      {/* Center: links on desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>

      {/* Right: theme toggle + auth buttons or avatar */}
      <div className="navbar-end gap-2">
        <ThemeController />
        {userInfo ? (
          <NavProfile user={userInfo} />
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
    {userInfo && <Profile user={userInfo} />}
    {userInfo && <Password />}
    </>
  );
};
export default Navbar;