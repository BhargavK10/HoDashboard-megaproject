import { createContext, useContext, useState } from "react";

const TeachersContext = createContext();

export function useTeachersData() {
  return useContext(TeachersContext);
}

export function TeachersDataProvider({ children }) {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Amit Kulkarni",
      email: "amit@college.edu",
      status: "Active",
      subjects: ["Maths", "DBMS"],
      classes: ["SY-A"],
    },
    {
      id: 2,
      name: "",
      email: "neha@college.edu",
      status: "Pending",
      subjects: [],
      classes: [],
    },
    {
      id: 3,
      name: "Sonal Patil",
      email: "sonal@college.edu",
      status: "Active",
      subjects: ["AI"],
      classes: ["TY-A"],
    },
  ]);

  function inviteTeacher(email) {
    setTeachers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        email,
        status: "Pending",
        subjects: [],
        classes: [],
      },
    ]);
  }

  function assignTeacher(id, subjects, classes) {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, subjects, classes } : t
      )
    );
  }

  return (
    <TeachersContext.Provider
      value={{ teachers, inviteTeacher, assignTeacher }}
    >
      {children}
    </TeachersContext.Provider>
  );
}
