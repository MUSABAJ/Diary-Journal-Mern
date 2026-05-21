import { useState } from 'react';
import { useChangePasswordMutation } from '../../redux/api/usersApiSlice';
import ModalLayout from '../ModalLayout';

const Password = () => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [changePassword, { isLoading, isError, isSuccess, error }] = useChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(form).unwrap();
      setForm({ oldPassword: '', newPassword: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalLayout id="password-modal" title="Change Password">
      {isError   && <div className="alert alert-error   text-sm mb-3">{error?.data?.message}</div>}
      {isSuccess && <div className="alert alert-success text-sm mb-3">Password changed!</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="password" placeholder="Current password" className="input input-bordered"
          value={form.oldPassword} onChange={(e) => setForm({ ...form, oldPassword: e.target.value })} required />
        <input type="password" placeholder="New password" className="input input-bordered"
          value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner" /> : 'Update Password'}
        </button>
      </form>
    </ModalLayout>
  );
};
export default Password;