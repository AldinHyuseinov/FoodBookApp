import { useEffect, useRef } from "react";
import "../assets/css/modal.css";

export default function Modal({
  title,
  description,
  placeholder,
  isOpen,
  onClose,
  onChange,
  onSubmit,
  value,
}) {
  const modal = useRef();

  useEffect(() => {
    if (isOpen) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
  };

  const handleInputChange = (e) => {
    onChange(e.target.value, title);
  };

  return (
    <dialog className="modal" ref={modal} onCancel={onClose}>
      <header className="modal-header">
        <h2 className="modal-title">{title}</h2>
      </header>

      <div className="modal-content">
        <p className="modal-description">{description}</p>

        <form>
          <label htmlFor="add-items" className="visually-hidden">
            {title}
          </label>
          <textarea
            id="add-items"
            onChange={handleInputChange}
            value={value || ""}
            placeholder={placeholder}
          ></textarea>

          <div className="buttons">
            <button onClick={onClose} className="close-btn">
              Close
            </button>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
