const ModalLayout = ({id, title, children}) => {
    return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* This button closes the modal — DaisyUI handles the close behavior */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        {children}
      </div>
      {/* Clicking the backdrop also closes the modal */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalLayout;