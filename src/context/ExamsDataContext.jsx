import { createContext, useContext, useState } from "react";

const ExamsContext = createContext();

export function useExamsData() {
  return useContext(ExamsContext);
}

export function ExamsDataProvider({ children }) {
  const [examRecords] = useState([
    {
      student: { roll: "SY01", name: "Rahul Patil", year: "SY" },
      exam: "Mid-Sem",
      marks: [
        { subject: "Maths", score: 18, max: 25 },
        { subject: "DBMS", score: 21, max: 25 },
        { subject: "OOP", score: 19, max: 25 },
      ],
    },
    {
      student: { roll: "SY02", name: "Aditi Kulkarni", year: "SY" },
      exam: "Mid-Sem",
      marks: [
        { subject: "Maths", score: 25, max: 25 },
        { subject: "DBMS", score: 24, max: 25 },
        { subject: "OOP", score: 23, max: 25 },
      ],
    },
    {
      student: { roll: "TY01", name: "Om Deshmukh", year: "TY" },
      exam: "End-Sem",
      marks: [
        { subject: "AI", score: 41, max: 50 },
        { subject: "Cloud", score: 38, max: 50 },
        { subject: "ML", score: 35, max: 50 },
      ],
    },
  ]);

  return (
    <ExamsContext.Provider value={{ examRecords }}>
      {children}
    </ExamsContext.Provider>
  );
}
