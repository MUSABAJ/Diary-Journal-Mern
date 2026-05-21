import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateProfileMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/userSlice';
import ModalLayout from '../ModalLayout';

const Profile = ({ user }) => {
  const [form, setForm] = useState({ firstName: user.firstName, lastName: user.lastName });
  const [updateProfile, { isLoading, isError, error }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(form).unwrap();
      dispatch(setCredentials(updated)); // Update the name shown in the navbar immediately
      document.getElementById('profile-modal').close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalLayout id="profile-modal" title="Edit Profile">
      {isError && <div className="alert alert-error text-sm mb-3">{error?.data?.message}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input className="input input-bordered" placeholder="First name" value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
        <input className="input input-bordered" placeholder="Last name"  value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
        <p className="text-sm text-base-content/50">Email: {user.email} (cannot be changed)</p>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner" /> : 'Save Changes'}
        </button>
      </form>
    </ModalLayout>
  );
};
export default Profile;