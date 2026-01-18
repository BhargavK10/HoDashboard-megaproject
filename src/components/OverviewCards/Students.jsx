import "./Students.css";

export default function StudentsOverviewCard({
  setActive,
  data,
  loading = false,
  error = null,
}) {
  // Temporary mock data (REMOVE when backend is ready)
  const mockData = {
    total: 420,
    years: [
      { year: "FY", count: 150 },
      { year: "SY", count: 140 },
      { year: "TY", count: 130 },
    ],
  };

  const students = data || mockData;

  if (loading) {
    return (
      <div className="overview-card students">
        <h3 className="card-title">Students</h3>
        <p className="subtle">Loading student data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overview-card students error">
        <h3 className="card-title">Students</h3>
        <p className="danger">Failed to load student data</p>
      </div>
    );
  }

  return (
    <div className="overview-card students">
      <h3
        className="card-title clickable"
        onClick={() => setActive("Students")}
      >
        Students
      </h3>

      <div className="card-body">
        {/* Total students */}
        <div className="students-total">
          <span>Total Students</span>
          <span className="students-count">
            {students.total}
          </span>
        </div>

        {/* Year-wise breakdown */}
        <div className="card-section students-years">
          {students.years.map((y) => (
            <div key={y.year} className="students-row">
              <span>{y.year}</span>
              <span>{y.count}</span>
            </div>
          ))}
        </div>

        <p className="subtle">
          Click to view full student details
        </p>
      </div>
    </div>
  );
}
