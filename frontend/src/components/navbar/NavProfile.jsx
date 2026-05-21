import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../redux/features/userSlice';
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { useNavigate } from 'react-router-dom';

const NavProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();                    // Clears the cookie on the server
    dispatch(clearCredentials());      // Clears userInfo from Redux + localStorage
    navigate('/login');
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
        <div className="bg-primary text-primary-content rounded-full w-10">
          <span>{user.firstName[0]}{user.lastName[0]}</span>
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a onClick={() => document.getElementById('profile-modal').showModal()}>Profile</a></li>
        <li><a onClick={() => document.getElementById('password-modal').showModal()}>Change Password</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  );
};
export default NavProfile;