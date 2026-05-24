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
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card bg-base-100 shadow-xl w-full max-w-sm">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">Create account</h2>

          {isError && (
            <div className="alert alert-error text-sm">
              {error?.data?.message || 'Signup failed'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input name="firstName" placeholder="First name" className="input input-bordered flex-1" value={form.firstName} onChange={handleChange} required />
              <input name="lastName"  placeholder="Last name"  className="input input-bordered flex-1" value={form.lastName}  onChange={handleChange} required />
            </div>
            <input name="email"    type="email"    placeholder="Email"    className="input input-bordered" value={form.email}    onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" className="input input-bordered" value={form.password} onChange={handleChange} required />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner" /> : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm mt-2">
            Already have an account? <Link to="/login" className="link link-primary">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;