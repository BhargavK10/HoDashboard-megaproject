import { useState } from "react";
import "./Overview.css";

import AttendanceOverviewCard from "../components/OverviewCards/Attedance";
import NoticesOverviewCard from "../components/OverviewCards/Notices";
import StudentsOverviewCard from "../components/OverviewCards/Students";
import ExamsOverviewCard from "../components/OverviewCards/Exams";
import ApprovalsOverviewCard from "../components/OverviewCards/Approvals";

const CARD_COMPONENTS = {
  attendance: AttendanceOverviewCard,
  notices: NoticesOverviewCard,
  approvals: ApprovalsOverviewCard,
  students: StudentsOverviewCard,
  exams: ExamsOverviewCard,
};

const DEFAULT_ORDER = ["attendance", "notices", "approvals", "students", "exams"];

export default function Overview({ setActive }) {
  const [order, setOrder] = useState(() => {
    const saved = localStorage.getItem("overviewOrder");
    return saved ? JSON.parse(saved) : DEFAULT_ORDER;
  });

  function handleDrop(e, targetKey) {
    const draggedKey = e.dataTransfer.getData("card");
    if (draggedKey === targetKey) return;

    const newOrder = [...order];
    const from = newOrder.indexOf(draggedKey);
    const to = newOrder.indexOf(targetKey);

    newOrder.splice(from, 1);
    newOrder.splice(to, 0, draggedKey);

    setOrder(newOrder);
    localStorage.setItem("overviewOrder", JSON.stringify(newOrder));
  }

  return (
    <div className="overview-grid">
      {order.map((key) => {
        const Card = CARD_COMPONENTS[key];

        return (
          <div
            key={key}
            className="draggable-card"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("card", key)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, key)}
          >
            <Card setActive={setActive} />
          </div>
        );
      })}
    </div>
  );
}
