import { useState } from "react";
import NoticeModal from "../components/NoticeModal";
import "./Notices.css";

const MOCK_NOTICES = [
  {
    id: 1,
    title: "Mid-Sem Exams",
    content: "Mid-Sem exams will start from 10th March.",
    date: "2026-03-01",
  },
  {
    id: 2,
    title: "Project Review",
    content: "Second project review scheduled on 5th March.",
    date: "2026-02-28",
  },
];

export default function Notices() {
  const [notices, setNotices] = useState(MOCK_NOTICES);
  const [showModal, setShowModal] = useState(false);

  const addNotice = (notice) => {
    setNotices((prev) => [
      { ...notice, id: Date.now() },
      ...prev,
    ]);
  };

  return (
    <div className="notices-page">
      <div className="notices-header">
        <h2>Notices</h2>
        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          + New Notice
        </button>
      </div>

      <div className="notices-list">
        {notices.map((n) => (
          <div key={n.id} className="notice-card">
            <h4>{n.title}</h4>
            <p className="notice-date">{n.date}</p>
            <p className="notice-content">{n.content}</p>
          </div>
        ))}

        {notices.length === 0 && (
          <p className="empty">No notices available</p>
        )}
      </div>

      {showModal && (
        <NoticeModal
          onClose={() => setShowModal(false)}
          onSubmit={addNotice}
        />
      )}
    </div>
  );
}
