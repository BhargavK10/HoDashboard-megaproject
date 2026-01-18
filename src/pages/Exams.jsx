// import { useState, useMemo } from "react";
// import "./Exams.css";

// const MOCK_EXAMS = [
//   {
//     id: 1,
//     roll: "SY01",
//     name: "Rahul Patil",
//     year: "SY",
//     exam: "Mid-Sem",
//     subjects: {
//       Maths: 18,
//       DBMS: 21,
//       OOP: 19,
//     },
//   },
//   {
//     id: 2,
//     roll: "SY02",
//     name: "Aditi Kulkarni",
//     year: "SY",
//     exam: "Mid-Sem",
//     subjects: {
//       Maths: 25,
//       DBMS: 24,
//       OOP: 23,
//     },
//   },
//   {
//     id: 3,
//     roll: "TY05",
//     name: "Om Deshmukh",
//     year: "TY",
//     exam: "End-Sem",
//     subjects: {
//       AI: 41,
//       Cloud: 38,
//       ML: 35,
//     },
//   },
// ];

// const PASS_MARKS = 40;

// export default function Exams() {
//   const [yearFilter, setYearFilter] = useState("ALL");
//   const [examFilter, setExamFilter] = useState("ALL");
//   const [search, setSearch] = useState("");

//   const processedData = useMemo(() => {
//     return MOCK_EXAMS.filter((s) => {
//       const yearMatch =
//         yearFilter === "ALL" || s.year === yearFilter;
//       const examMatch =
//         examFilter === "ALL" || s.exam === examFilter;
//       const searchMatch =
//         s.name.toLowerCase().includes(search.toLowerCase()) ||
//         s.roll.toLowerCase().includes(search.toLowerCase());

//       return yearMatch && examMatch && searchMatch;
//     }).map((s) => {
//       const total = Object.values(s.subjects).reduce(
//         (a, b) => a + b,
//         0
//       );
//       const maxMarks = Object.keys(s.subjects).length * 50;
//       const percentage = ((total / maxMarks) * 100).toFixed(1);
//       const result = percentage >= PASS_MARKS ? "Pass" : "Fail";

//       return { ...s, total, percentage, result };
//     });
//   }, [yearFilter, examFilter, search]);

//   const classAverage = (
//     processedData.reduce((a, s) => a + Number(s.percentage), 0) /
//     (processedData.length || 1)
//   ).toFixed(1);

//   return (
//     <div className="exams-page">
//       <h2>Exam Results</h2>

//       {/* Summary */}
//       <div className="exams-summary">
//         <div className="summary-card">
//           <p className="summary-title">Students</p>
//           <p className="summary-value">{processedData.length}</p>
//         </div>
//         <div className="summary-card">
//           <p className="summary-title">Class Average</p>
//           <p className="summary-value">{classAverage}%</p>
//         </div>
//         <div className="summary-card">
//           <p className="summary-title">Failed</p>
//           <p className="summary-value danger">
//             {processedData.filter((s) => s.result === "Fail").length}
//           </p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="exams-filters">
//         <select
//           value={yearFilter}
//           onChange={(e) => setYearFilter(e.target.value)}
//         >
//           <option value="ALL">All Years</option>
//           <option value="FY">First Year</option>
//           <option value="SY">Second Year</option>
//           <option value="TY">Third Year</option>
//         </select>

//         <select
//           value={examFilter}
//           onChange={(e) => setExamFilter(e.target.value)}
//         >
//           <option value="ALL">All Exams</option>
//           <option value="Mid-Sem">Mid-Sem</option>
//           <option value="End-Sem">End-Sem</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Search by name or roll"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="exams-table">
//         <div className="table-header">
//           <span>Roll</span>
//           <span>Name</span>
//           <span>Total</span>
//           <span>%</span>
//           <span>Result</span>
//         </div>

//         {processedData.map((s) => (
//           <div key={s.id} className="table-row">
//             <span>{s.roll}</span>
//             <span className="student-name">{s.name}</span>
//             <span>{s.total}</span>
//             <span>{s.percentage}%</span>
//             <span
//               className={s.result === "Pass" ? "good" : "danger"}
//             >
//               {s.result}
//             </span>
//           </div>
//         ))}

//         {processedData.length === 0 && (
//           <p className="empty">No exam data found</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useMemo } from "react";
import { useExamsData } from "../context/ExamsDataContext";
import "./Exams.css";

export default function Exams() {
  const { examRecords } = useExamsData();

  const [yearFilter, setYearFilter] = useState("ALL");
  const [examFilter, setExamFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return examRecords.filter((r) => {
      const yearMatch = yearFilter === "ALL" || r.student.year === yearFilter;
      const examMatch = examFilter === "ALL" || r.exam === examFilter;
      return yearMatch && examMatch;
    });
  }, [examRecords, yearFilter, examFilter]);

  const groupedBySubject = useMemo(() => {
    const map = {};
    filtered.forEach((rec) => {
      rec.marks.forEach((m) => {
        if (!map[m.subject]) map[m.subject] = [];
        map[m.subject].push({
          ...rec.student,
          score: m.score,
          max: m.max,
        });
      });
    });
    return map;
  }, [filtered]);

  return (
    <div className="exams-page">
      <h2>Exam Results</h2>

      <div className="exams-filters">
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="ALL">All Years</option>
          <option value="FY">FY</option>
          <option value="SY">SY</option>
          <option value="TY">TY</option>
        </select>

        <select value={examFilter} onChange={(e) => setExamFilter(e.target.value)}>
          <option value="ALL">All Exams</option>
          <option value="Mid-Sem">Mid-Sem</option>
          <option value="End-Sem">End-Sem</option>
        </select>
      </div>

      {Object.entries(groupedBySubject).map(([subject, rows]) => (
        <div key={subject} className="subject-table">
          <h3>{subject}</h3>

          <div className="exams-table">
            <div className="table-header">
              <span>Roll</span>
              <span>Name</span>
              <span>Score</span>
              <span>Max</span>
              <span>%</span>
            </div>

            {rows.map((s) => {
              const percent = Math.round((s.score / s.max) * 100);
              return (
                <div key={s.roll} className="table-row">
                  <span>{s.roll}</span>
                  <span>{s.name}</span>
                  <span>{s.score}</span>
                  <span>{s.max}</span>
                  <span className={percent < 40 ? "danger" : "good"}>
                    {percent}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
