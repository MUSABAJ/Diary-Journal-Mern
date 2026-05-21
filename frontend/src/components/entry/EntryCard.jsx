import EditEntry from './EditEntry';
import DeleteEntry from './DeleteEntry';
import ReadMore from './ReadMore';

const moodEmoji = {
  happy: '😄', sad: '😢', angry: '😠',
  anxious: '😰', calm: '😌', excited: '🤩', neutral: '😐',
};

const EntryCard = ({ entry }) => {
  const modalId = entry._id; // Use the entry ID to create unique modal IDs

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg">{entry.title}</h2>
          <span className="text-2xl" title={entry.mood}>{moodEmoji[entry.mood] || '📝'}</span>
        </div>

        <p className="text-sm text-base-content/60">
          {new Date(entry.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}
        </p>

        <p className="text-base-content/80 line-clamp-3">{entry.content}</p>

        <div className="card-actions justify-end mt-2 gap-2">
          <button
            className="btn btn-ghost btn-xs"
            onClick={() => document.getElementById(`read-${modalId}`).showModal()}
          >Read</button>
          <button
            className="btn btn-ghost btn-xs"
            onClick={() => document.getElementById(`edit-${modalId}`).showModal()}
          >Edit</button>
          <button
            className="btn btn-error btn-xs btn-outline"
            onClick={() => document.getElementById(`delete-${modalId}`).showModal()}
          >Delete</button>
        </div>
      </div>

      {/* Each card renders its own modals — they're hidden until opened */}
      <ReadMore entry={entry} modalId={`read-${modalId}`} />
      <EditEntry entry={entry} modalId={`edit-${modalId}`} />
      <DeleteEntry entry={entry} modalId={`delete-${modalId}`} />
    </div>
  );
};
export default EntryCard;