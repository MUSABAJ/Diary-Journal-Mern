import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/api/usersApiSlice';
import { setCredentials } from '../redux/features/userSlices';
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
  <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-6 py-10">

  <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">

    {/* LEFT INFO */}
    <div className="bg-[#1e1b3a] text-white p-10 lg:p-12 flex flex-col justify-between">

      <div>
        <h1 className="text-xl font-semibold">My Diary</h1>

        <h2 className="text-3xl font-semibold mt-10">
          Welcome back
        </h2>

        <p className="text-sm text-gray-300 mt-3 leading-relaxed">
          Continue your journaling journey and keep track of your thoughts.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-10">
        <p className="text-sm font-medium">
          “Writing clears the mind more than thinking ever could.”
        </p>
        <p className="text-xs text-gray-300 mt-2">
          Keep going — even short entries matter.
        </p>
      </div>

    </div>

    {/* RIGHT FORM */}
    <div className="p-10 lg:p-12 flex flex-col justify-center">

      <div className="max-w-sm mx-auto w-full">

        <h2 className="text-2xl text-blue-950 font-semibold">
          Sign in
        </h2>

        <p className="text-xs text-gray-400 mt-1 mb-8">
          Enter your credentials
        </p>

        {isError && (
          <div className="mb-4 text-xs text-red-500 bg-red-50 border border-red-100 p-2 rounded-md">
            {error?.data?.message || 'Login failed'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-sm text-blue-950 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-sm text-blue-950 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            required
          />

          <button className="w-full py-2 text-sm rounded-lg bg-gray-900 text-white hover:opacity-90 transition">
            {isLoading ? 'Loading...' : 'Login'}
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-gray-900 font-medium">
            Sign up
          </Link>
        </p>

      </div>
    </div>

  </div>
</div>
  
  )
};
export default Login;
 