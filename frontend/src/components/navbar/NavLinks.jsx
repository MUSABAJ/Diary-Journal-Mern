import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavLinks = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      {userInfo && <li><Link to="/entries">My Entries</Link></li>}
    </>
  );
};
export default NavLinks;