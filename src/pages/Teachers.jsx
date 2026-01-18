import { useState } from "react";
import { useTeachersData } from "../context/TeachersDataContext";
import "./Teachers.css";

export default function Teachers() {
  const { teachers, inviteTeacher, assignTeacher } = useTeachersData();

  const [email, setEmail] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [subjects, setSubjects] = useState("");
  const [classes, setClasses] = useState("");

  function handleInvite() {
    if (!email.trim()) return;
    inviteTeacher(email);
    setEmail("");
  }

  function handleAssign() {
    assignTeacher(
      selectedTeacher.id,
      subjects.split(",").map((s) => s.trim()),
      classes.split(",").map((c) => c.trim())
    );
    setSelectedTeacher(null);
    setSubjects("");
    setClasses("");
  }

  return (
    <div className="teachers-page">
      <h2>Teachers</h2>

      <div className="invite-box">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter teacher email"
        />
        <button onClick={handleInvite}>Send Invite</button>
      </div>

      <table className="teachers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Subjects</th>
            <th>Classes</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.name || "-"}</td>
              <td>{t.email}</td>
              <td className={`status ${t.status.toLowerCase()}`}>
                {t.status}
              </td>
              <td>{t.subjects.join(", ") || "-"}</td>
              <td>{t.classes.join(", ") || "-"}</td>
              <td>
                {t.status === "Active" && (
                  <button
                    className="assign-btn"
                    onClick={() => setSelectedTeacher(t)}
                  >
                    Assign
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTeacher && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Assign Subjects & Classes</h3>

            <input
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="Subjects (comma separated)"
            />

            <input
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
              placeholder="Classes (comma separated)"
            />

            <div className="modal-actions">
              <button onClick={handleAssign}>Save</button>
              <button className="cancel" onClick={() => setSelectedTeacher(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
