import "./Attendance.css";
import { useAttendanceData } from "../../context/AttendanceDataContext";
import { useMemo } from "react";

function getAttendanceStatus(value) {
  if (value < 70) return "danger";
  if (value < 80) return "warning";
  return "good";
}

function PercentageBar({ value }) {
  const status = getAttendanceStatus(value);

  return (
    <div className="progress-bar">
      <div
        className={`progress-fill ${status}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function AttendanceOverviewCard({ setActive }) {
  const { attendanceLogs } = useAttendanceData();

  const attendanceData = useMemo(() => {
    if (!attendanceLogs.length) return null;

    const classMap = {};
    let totalPresent = 0;
    let totalRecords = 0;

    attendanceLogs.forEach(log => {
      if (!classMap[log.class]) {
        classMap[log.class] = { present: 0, total: 0 };
      }

      classMap[log.class].total++;
      totalRecords++;

      if (log.status === "Present") {
        classMap[log.class].present++;
        totalPresent++;
      }
    });

    const classes = Object.entries(classMap).map(([cls, v]) => ({
      year: cls,
      avg: Math.round((v.present / v.total) * 100)
    }));

    return {
      departmentAvg: Math.round((totalPresent / totalRecords) * 100),
      classes
    };
  }, [attendanceLogs]);

  if (!attendanceData) {
    return (
      <div className="overview-card">
        <h3 className="card-title">Attendance Overview</h3>
        <p className="subtle">Loading attendance data...</p>
      </div>
    );
  }

  return (
    <div className="overview-card">
      <h3
        className="card-title clickable"
        onClick={() => setActive("Attendance")}
      >
        Attendance Overview
      </h3>

      <div className="card-body">
        <div className="dept-avg">
          <span>Department Average</span>
          <span className={getAttendanceStatus(attendanceData.departmentAvg)}>
            {attendanceData.departmentAvg}%
          </span>
        </div>

        <PercentageBar value={attendanceData.departmentAvg} />

        <div className="card-section">
          {attendanceData.classes.map(cls => (
            <div key={cls.year} className="class-row">
              <span className="class-name">{cls.year}</span>
              <span className={getAttendanceStatus(cls.avg)}>{cls.avg}%</span>
              <PercentageBar value={cls.avg} />
            </div>
          ))}
        </div>

        <p className="subtle">Click to view detailed attendance records</p>
      </div>
    </div>
  );
}
