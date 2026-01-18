import { useEffect, useRef, useState } from "react";

import "./App.css";

import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";

import Overview from "./pages/Overview.jsx";
import Attendance from "./pages/Attendance.jsx";
import Students from "./pages/Students.jsx";
import Exams from "./pages/Exams.jsx";
import Notices from "./pages/Notices.jsx";
import Profile from "./pages/Profile.jsx";
import Teachers from "./pages/Teachers.jsx";


export default function App() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="app">
      <Sidebar active={active} setActive={setActive} />
      <div className="main">
        <Topbar setActive={setActive} />
        <div className="content">
          {active === "Overview" && <Overview setActive={setActive} />}
          {active === "Attendance" && <Attendance setActive={setActive} />}
          {active === "Students" && <Students setActive={setActive} />}
          {active === "Teachers" && <Teachers setActive={setActive} />}
          {active === "Exams" && <Exams setActive={setActive} />}
          {active === "Notices" && <Notices setActive={setActive} />}
          {active === "Profile" && <Profile setActive={setActive} />}
          {active === "Settings" && <p>Settings coming soon</p>}
        </div>
      </div>
    </div>
  );
}
