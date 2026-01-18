// export default function Students() {
//   return (
//     <div className="section">
//       <h2>Student Data</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Roll No</th>
//             <th>Name</th>
//             <th>Year</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>CS001</td>
//             <td>Rahul Sharma</td>
//             <td>TY</td>
//             <td>rahul@college.edu</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useState, useMemo } from "react";
import "./Students.css";

const MOCK_STUDENTS = [
  {
    id: 1,
    roll: "FY01",
    name: "Rohit Pawar",
    year: "FY",
    division: "A",
  },
  {
    id: 2,
    roll: "SY12",
    name: "Ananya Deshmukh",
    year: "SY",
    division: "B",
  },
  {
    id: 3,
    roll: "TY07",
    name: "Sahil Kulkarni",
    year: "TY",
    division: "A",
  },
  {
    id: 4,
    roll: "SY18",
    name: "Neha Patil",
    year: "SY",
    division: "A",
  },
];

export default function Students() {
  const [yearFilter, setYearFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((s) => {
      const matchesYear =
        yearFilter === "ALL" || s.year === yearFilter;

      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.roll.toLowerCase().includes(search.toLowerCase());

      return matchesYear && matchesSearch;
    });
  }, [yearFilter, search]);

  const counts = useMemo(() => {
    return {
      total: MOCK_STUDENTS.length,
      FY: MOCK_STUDENTS.filter((s) => s.year === "FY").length,
      SY: MOCK_STUDENTS.filter((s) => s.year === "SY").length,
      TY: MOCK_STUDENTS.filter((s) => s.year === "TY").length,
    };
  }, []);

  return (
    <div className="students-page">
      <h2>Students</h2>

      {/* Summary Cards */}
      <div className="students-summary">
        <div className="summary-card">
          <p className="summary-title">Total Students</p>
          <p className="summary-value">{counts.total}</p>
        </div>
        <div className="summary-card">
          <p className="summary-title">First Year</p>
          <p className="summary-value">{counts.FY}</p>
        </div>
        <div className="summary-card">
          <p className="summary-title">Second Year</p>
          <p className="summary-value">{counts.SY}</p>
        </div>
        <div className="summary-card">
          <p className="summary-title">Third Year</p>
          <p className="summary-value">{counts.TY}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="students-filters">
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="ALL">All Years</option>
          <option value="FY">First Year</option>
          <option value="SY">Second Year</option>
          <option value="TY">Third Year</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or roll no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="students-table">
        <div className="table-header">
          <span>Roll No</span>
          <span>Name</span>
          <span>Year</span>
          <span>Division</span>
        </div>

        {filteredStudents.map((s) => (
          <div key={s.id} className="table-row">
            <span>{s.roll}</span>
            <span className="student-name">{s.name}</span>
            <span>{s.year}</span>
            <span>{s.division}</span>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <p className="empty">No students found</p>
        )}
      </div>
    </div>
  );
}
