import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/api/usersApiSlice';
import { setCredentials } from '../redux/features/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [login, { isLoading, isError, error }] = useLoginMutation();

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) navigate('/entries');
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();
      // .unwrap() throws an error on failure instead of silently setting isError
      dispatch(setCredentials(user));
      navigate('/entries');
    } catch (err) {
      // Error is available via isError/error from the hook — no extra state needed
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card bg-base-100 shadow-xl w-full max-w-sm">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">Welcome back</h2>

          {isError && (
            <div className="alert alert-error text-sm">
              {error?.data?.message || 'Login failed'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner" /> : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm mt-2">
            No account? <Link to="/signup" className="link link-primary">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;