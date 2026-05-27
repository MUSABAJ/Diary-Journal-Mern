import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '../redux/api/usersApiSlice';
import { setCredentials } from '../redux/features/userSlices';

const Signup = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  useEffect(() => {
    if (userInfo) navigate('/entries');
  }, [userInfo, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup(form).unwrap();
      dispatch(setCredentials(user));
      navigate('/entries');
    } catch (err) {
      console.error(err);
    }
  };

  return ( 
    <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-6 py-10">

  <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">

    {/* LEFT FORM */}
    <div className="p-10 lg:p-12 flex flex-col justify-center">

      <div className="max-w-sm mx-auto w-full">

        <h2 className="text-2xl font-semibold">
          Create account
        </h2>

        <p className="text-xs text-gray-400 mt-1 mb-8">
          Start your journaling journey
        </p>

        {isError && (
          <div className="mb-4 text-xs text-red-500 bg-red-50 border border-red-100 p-2 rounded-md">
            {error?.data?.message || 'Signup failed'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm text-black rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm text-black rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm text-black rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm text-black rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            required
          />

          <button className="w-full py-2 text-sm rounded-lg bg-gray-900 text-white hover:opacity-90 transition">
            {isLoading ? 'Creating...' : 'Create account'}
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-900 font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="bg-[#1e1b3a] text-white p-10 lg:p-12 flex flex-col justify-between">

      <div>
        <h1 className="text-xl font-semibold">My Diary</h1>

        <h2 className="text-3xl font-semibold mt-10">
          Start writing your thoughts
        </h2>

        <p className="text-sm text-gray-300 mt-3 leading-relaxed">
          A simple space to reflect, track emotions, and build a writing habit.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-10 text-xs">

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="font-semibold text-sm">Private</p>
          <p className="text-gray-300 mt-1">Encrypted journal</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="font-semibold text-sm">Simple</p>
          <p className="text-gray-300 mt-1">No distractions</p>
        </div>

      </div>

    </div>
  </div>
</div>
    
  )
};
export default Signup;

 