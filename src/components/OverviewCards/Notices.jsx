// import './Notices.css';

// export default function NoticesOverviewCard({ setActive }) {
//     return (
//         <div className="overview-card notices">
//             <h3 onClick={() => setActive("Notices")} className="card-title">
//                 Notices
//             </h3>

//             <div className="card-body">
//                 <button
//                     onClick={() => setActive("Notices")}
//                     className="notices-button"
//                 >
//                     New Notice
//                 </button>

//                 <ul className="card-section">
//                     <li></li>
//                     <li>Mid-Sem Exams — 10 Mar</li>
//                     <li>Project Review — 05 Mar</li>
//                     <li>Faculty Meeting — 02 Mar</li>
//                 </ul>

//                 <p className="subtle">Latest 3 notices</p>
//             </div>
//         </div>
//     );
// }

import "./Notices.css";

/* ---------- main card ---------- */

export default function NoticesOverviewCard({
  setActive,
  data,
  loading = false,
  error = null,
}) {
  // Temporary mock data (REMOVE when backend is ready)
  const mockNotices = [
    {
      id: 1,
      title: "Mid-Sem Exams",
      date: "10 Mar",
    },
    {
      id: 2,
      title: "Project Review",
      date: "05 Mar",
    },
    {
      id: 3,
      title: "Faculty Meeting",
      date: "02 Mar",
    },
    {
      id: 4,
      title: "Holiday Notice",
      date: "28 Feb",
    },
  ];

  const notices = data || mockNotices;

  if (loading) {
    return (
      <div className="overview-card notices">
        <h3 className="card-title">Notices</h3>
        <p className="subtle">Loading notices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overview-card notices error">
        <h3 className="card-title">Notices</h3>
        <p className="danger">Failed to load notices</p>
      </div>
    );
  }

  return (
    <div className="overview-card notices">
      <h3
        onClick={() => setActive("Notices")}
        className="card-title clickable"
      >
        Notices
      </h3>

      <div className="card-body">
        <button
          className="notices-button"
          onClick={() => {
            setActive("Notices");
            setOpenNewNotice(true);
          }}
        >
          New Notice
        </button>

        <ul className="card-section notices-list">
          {notices.slice(0, 5).map((notice) => (
            <li key={notice.id} className="notice-item">
              <span className="notice-title">
                {notice.title}
              </span>
              <span className="notice-date">
                {notice.date}
              </span>
            </li>
          ))}
        </ul>

        <p className="subtle">Latest notices</p>
      </div>
    </div>
  );
}
