import ModalLayout from '../ModalLayout';

const ReadMore = ({ entry, modalId }) => (
  <ModalLayout id={modalId} title={entry.title}>
    <p className="text-sm text-base-content/60 mb-3">
      {new Date(entry.date).toLocaleDateString('en-US', { dateStyle: 'long' })} · {entry.mood}
    </p>
    <p className="whitespace-pre-wrap">{entry.content}</p>
  </ModalLayout>
);
export default ReadMore;