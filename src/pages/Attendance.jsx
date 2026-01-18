import { useState, useMemo } from "react";
import { useAttendanceData } from "../context/AttendanceDataContext";
import "./Attendance.css";

export default function Attendance() {
  const { attendanceLogs } = useAttendanceData();

  const [selectedClass, setSelectedClass] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [month, setMonth] = useState("");

  const filteredLogs = useMemo(() => {
    return attendanceLogs.filter(log => {
      const classMatch = selectedClass === "ALL" || log.class === selectedClass;
      const dateMatch =
        (!fromDate || log.date >= fromDate) &&
        (!toDate || log.date <= toDate) &&
        (!month || log.date.startsWith(month));
      return classMatch && dateMatch;
    });
  }, [attendanceLogs, selectedClass, fromDate, toDate, month]);

  const studentSummary = useMemo(() => {
    const map = {};
    filteredLogs.forEach(log => {
      if (!map[log.roll]) {
        map[log.roll] = { ...log, total: 0, present: 0 };
      }
      map[log.roll].total++;
      if (log.status === "Present") map[log.roll].present++;
    });

    return Object.values(map).map(s => ({
      ...s,
      percentage: ((s.present / s.total) * 100).toFixed(1),
    }));
  }, [filteredLogs]);

  const classAverage = (
    studentSummary.reduce((a, s) => a + Number(s.percentage), 0) /
    (studentSummary.length || 1)
  ).toFixed(1);

  return (
    <div className="attendance-page">
       <h2>Attendance Records</h2>

       {/* Filters */}
       <div className="attendance-filters">
         <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
           <option value="ALL">All Classes</option>
           <option value="FY-A">FY-A</option>
           <option value="SY-A">SY-A</option>
           <option value="TY-A">TY-A</option>
         </select>

         <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
         <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

         <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
       </div>

       {/* Summary */}
       <div className="attendance-summary">
         <div className="summary-card">
           <p className="summary-title">Average</p>
           <p className="summary-value">{classAverage}%</p>
         </div>
         <div className="summary-card">
           <p className="summary-title">Students</p>
           <p className="summary-value">{studentSummary.length}</p>
         </div>
       </div>

       {/* Summary Table */}
       <h3 className="section-title">Attendance summary</h3>
       <div className="attendance-table">
         <div className="table-header">
           <span>Roll</span>
           <span>Name</span>
           <span>Total</span>
           <span>Present</span>
          <span>%</span>
         </div>

         {studentSummary.map((s) => (
          <div key={s.roll} className="table-row">
            <span>{s.roll}</span>
            <span>{s.name}</span>
            <span>{s.total}</span>
            <span>{s.present}</span>
            <span className={s.percentage < 75 ? "warning" : "good"}>
              {s.percentage}%
            </span>
          </div>
        ))}
      </div>

      {/* Raw Logs Table */}
      <h3 className="section-title">Raw Attendance Logs</h3>

      <div className="attendance-table">
        <div className="table-header raw">
          <span>Class</span>
          <span>Roll</span>
          <span>Name</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {filteredLogs.map((log, index) => (
          <div key={index} className="table-row">
            <span>{log.class}</span>
            <span>{log.roll}</span>
            <span>{log.name}</span>
            <span>{log.date}</span>
            <span className={log.status === "Present" ? "good" : "danger"}>
              {log.status}
            </span>
          </div>
        ))}

        {filteredLogs.length === 0 && (
          <p className="empty">No attendance records found</p>
        )}
      </div>
    </div>
  );
}
