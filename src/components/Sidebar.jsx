export default function Sidebar({ active, setActive }) {
  const items = [
    "Overview",
    "Attendance",
    "Students",
    "Teachers",
    "Exams",
    "Notices",
    "Settings",
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">HOD Panel</h2>
      {items.map((item) => (
        <button
          key={item}
          className={`sidebar-item ${
            active === item ? "active" : ""
          }`}
          onClick={() => setActive(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}