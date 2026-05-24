import { useDeleteEntryMutation } from '../../redux/api/entryApiSlice';
import ModalLayout from '../ModalLayout';

const DeleteEntry = ({ entry, modalId }) => {
  const [deleteEntry, { isLoading }] = useDeleteEntryMutation();

  const handleDelete = async () => {
    try {
      await deleteEntry(entry._id).unwrap();
      document.getElementById(modalId).close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalLayout id={modalId} title="Delete Entry">
      <p>Are you sure you want to delete <strong>"{entry.title}"</strong>? This cannot be undone.</p>
      <div className="flex gap-3 justify-end mt-6">
        <form method="dialog"><button className="btn btn-ghost">Cancel</button></form>
        <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? <span className="loading loading-spinner" /> : 'Delete'}
        </button>
      </div>
    </ModalLayout>
  );
};
export default DeleteEntry;