// import "./Exams.css";

// /* ---------- helpers ---------- */

// function getStatus(value) {
//   if (value < 70) return "danger";
//   if (value < 80) return "warning";
//   return "good";
// }

// function PercentageBar({ value }) {
//   return (
//     <div className="progress-bar">
//       <div
//         className={`progress-fill ${getStatus(value)}`}
//         style={{ width: `${value}%` }}
//       />
//     </div>
//   );
// }

// /* ---------- main card ---------- */

// export default function ExamsOverviewCard({
//   setActive,
//   data,
//   loading = false,
//   error = null,
// }) {
//   // Temporary mock data (REMOVE when backend is ready)
//   const mockData = {
//     departmentAvg: 72,
//     passRate: 91,
//     years: [
//       { year: "FY", avg: 68 },
//       { year: "SY", avg: 74 },
//       { year: "TY", avg: 78 },
//     ],
//     atRiskCount: 12,
//   };

//   const exams = data || mockData;

//   if (loading) {
//     return (
//       <div className="overview-card exams">
//         <h3 className="card-title">Exams Overview</h3>
//         <p className="subtle">Loading exam data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="overview-card exams error">
//         <h3 className="card-title">Exams Overview</h3>
//         <p className="danger">Failed to load exam data</p>
//       </div>
//     );
//   }

//   return (
//     <div className="overview-card exams">
//       <h3
//         className="card-title clickable"
//         onClick={() => setActive("Exams")}
//       >
//         Exams Overview
//       </h3>

//       <div className="card-body">
//         {/* Department average */}
//         <div className="exam-metric">
//           <span>Department Average</span>
//           <span className={getStatus(exams.departmentAvg)}>
//             {exams.departmentAvg}%
//           </span>
//         </div>
//         <PercentageBar value={exams.departmentAvg} />

//         {/* Pass rate */}
//         <div className="exam-metric">
//           <span>Pass Rate</span>
//           <span className={getStatus(exams.passRate)}>
//             {exams.passRate}%
//           </span>
//         </div>

//         {/* Year-wise averages */}
//         <div className="card-section">
//           {exams.years.map((y) => (
//             <div key={y.year} className="exam-year">
//               <span>{y.year} Avg</span>
//               <span className={getStatus(y.avg)}>
//                 {y.avg}%
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* At-risk students */}
//         <div className="exam-risk">
//           <span>Students Below 40%</span>
//           <span className="danger">
//             {exams.atRiskCount}
//           </span>
//         </div>

//         <p className="subtle">
//           Click to view detailed exam results
//         </p>
//       </div>
//     </div>
//   );
// }

import "./Exams.css";
import { useMemo } from "react";
import { useExamsData } from "../../context/ExamsDataContext";

/* ---------- helpers ---------- */

function getStatus(value) {
  if (value < 40) return "danger";
  if (value < 60) return "warning";
  return "good";
}

function PercentageBar({ value }) {
  const status = getStatus(value);

  return (
    <div className="progress-bar">
      <div
        className={`progress-fill ${status}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/* ---------- main card ---------- */

export default function ExamsOverviewCard({ setActive }) {
  const { examRecords } = useExamsData();

  const summary = useMemo(() => {
    if (!examRecords.length) return null;

    let totalScore = 0;
    let totalMax = 0;
    let passCount = 0;
    const yearMap = {};
    let atRiskCount = 0;

    examRecords.forEach((rec) => {
      const year = rec.student.year;

      if (!yearMap[year]) {
        yearMap[year] = { score: 0, max: 0 };
      }

      rec.marks.forEach((m) => {
        totalScore += m.score;
        totalMax += m.max;
        yearMap[year].score += m.score;
        yearMap[year].max += m.max;
      });

      const percentage =
        (rec.marks.reduce((a, m) => a + m.score, 0) /
          rec.marks.reduce((a, m) => a + m.max, 0)) *
        100;

      if (percentage >= 40) passCount++;
      if (percentage < 40) atRiskCount++;
    });

    const departmentAvg = Math.round((totalScore / totalMax) * 100);
    const passRate = Math.round((passCount / examRecords.length) * 100);

    const years = Object.entries(yearMap).map(([year, v]) => ({
      year,
      avg: Math.round((v.score / v.max) * 100),
    }));

    return { departmentAvg, passRate, years, atRiskCount };
  }, [examRecords]);

  if (!summary) {
    return (
      <div className="overview-card exams">
        <h3 className="card-title">Exams Overview</h3>
        <p className="subtle">Loading exam data...</p>
      </div>
    );
  }

  return (
    <div className="overview-card exams">
      <h3 className="card-title clickable" onClick={() => setActive("Exams")}>
        Exams Overview
      </h3>

      <div className="card-body">
        {/* Department Average */}
        <div className="exam-metric">
          <span>Department Avg</span>
          <span className={getStatus(summary.departmentAvg)}>
            {summary.departmentAvg}%
          </span>
        </div>
        <PercentageBar value={summary.departmentAvg} />

        {/* Pass Rate */}
        <div className="exam-metric">
          <span>Pass Rate</span>
          <span className={getStatus(summary.passRate)}>
            {summary.passRate}%
          </span>
        </div>
        <PercentageBar value={summary.passRate} />

        {/* Year-wise Averages */}
        <div className="card-section">
          {summary.years.map((y) => (
            <div key={y.year} className="exam-year">
              <div className="exam-year-header">
                <span className="year-label">{y.year} Average</span>
                <span className={`year-value ${getStatus(y.avg)}`}>
                  {y.avg}%
                </span>
              </div>

              <PercentageBar value={y.avg} />
            </div>
          ))}
        </div>

        {/* At Risk */}
        <div className="exam-risk">
          <span>Students Below 40%</span>
          <span className="danger">{summary.atRiskCount}</span>
        </div>
      </div>
    </div>
  );
}

