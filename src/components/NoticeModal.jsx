import { useState } from "react";
import "./NoticeModal.css";

export default function NoticeModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      title,
      content,
      date: new Date().toISOString().slice(0, 10),
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>New Notice</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <input
            type="text"
            placeholder="Notice title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Notice content"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="primary">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
