import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="hero min-h-[80vh]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">📅 DayBook</h1>
          <p className="py-6 text-lg">
            Your private space to capture thoughts, memories, and daily reflections.
            Simple, secure, and always yours.
          </p>
          {userInfo ? (
            <Link to="/entries" className="btn btn-primary btn-lg">Go to My Entries</Link>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
              <Link to="/login" className="btn btn-outline btn-lg">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;