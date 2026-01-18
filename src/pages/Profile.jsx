import { useState } from "react";

export default function HODProfile() {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "Dr. Rajesh Kulkarni",
    department: "Computer Engineering",
    email: "hod.cse@college.edu",
    contact: "9876543210",
    experience: "18 Years",
    qualification: "PhD (Computer Science)"
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>HOD Profile</h2>
          <button
            style={styles.editBtn}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>

        <div style={styles.grid}>
          {Object.entries(profile).map(([key, value]) => (
            <div key={key}>
              <label style={styles.label}>
                {key.replace(/^\w/, (c) => c.toUpperCase())}
              </label>
              {editMode ? (
                <input
                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={styles.input}
                />
              ) : (
                <div style={styles.value}>{value}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = {
  container: {
    padding: 30,
    background: "#ffffff",
    minHeight: "100vh",
    color: "#000000"
  },
  card: {
    maxWidth: 800,
    margin: "0 auto",
    background: "#eeeeee",
    border: "1px solid #b6b6b6",
    borderRadius: 12,
    padding: 24
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  editBtn: {
    background: "#2563eb",
    border: "none",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20
  },
  label: {
    fontSize: 12,
    color: "#000000"
  },
  value: {
    marginTop: 4,
    fontSize: 15
  },
  input: {
    marginTop: 4,
    width: "100%",
    padding: 8,
    borderRadius: 6,
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#f8fafc"
  }
};
