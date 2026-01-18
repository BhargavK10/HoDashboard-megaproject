import { createContext, useContext, useState } from "react";

const AttendanceContext = createContext();

export function useAttendanceData() {
    return useContext(AttendanceContext);
}

export function AttendanceDataProvider({ children }) {
    const [attendanceLogs] = useState([
        // ================= FY =================
        // 1 March
        { date: "2026-03-01", class: "FY-A", roll: "FY01", name: "Aman Kulkarni", status: "Present" },
        { date: "2026-03-01", class: "FY-A", roll: "FY02", name: "Neha Patil", status: "Absent" },
        { date: "2026-03-01", class: "FY-A", roll: "FY03", name: "Rohan Deshpande", status: "Present" },

        // 2 March
        { date: "2026-03-02", class: "FY-A", roll: "FY01", name: "Aman Kulkarni", status: "Present" },
        { date: "2026-03-02", class: "FY-A", roll: "FY02", name: "Neha Patil", status: "Present" },
        { date: "2026-03-02", class: "FY-A", roll: "FY03", name: "Rohan Deshpande", status: "Absent" },

        // 3 March
        { date: "2026-03-03", class: "FY-A", roll: "FY01", name: "Aman Kulkarni", status: "Absent" },
        { date: "2026-03-03", class: "FY-A", roll: "FY02", name: "Neha Patil", status: "Present" },
        { date: "2026-03-03", class: "FY-A", roll: "FY03", name: "Rohan Deshpande", status: "Present" },

        // 4 March
        { date: "2026-03-04", class: "FY-A", roll: "FY01", name: "Aman Kulkarni", status: "Present" },
        { date: "2026-03-04", class: "FY-A", roll: "FY02", name: "Neha Patil", status: "Absent" },
        { date: "2026-03-04", class: "FY-A", roll: "FY03", name: "Rohan Deshpande", status: "Present" },

        // ================= SY =================
        // 1 March
        { date: "2026-03-01", class: "SY-A", roll: "SY01", name: "Rahul Patil", status: "Present" },
        { date: "2026-03-01", class: "SY-A", roll: "SY02", name: "Aditi Kulkarni", status: "Absent" },
        { date: "2026-03-01", class: "SY-A", roll: "SY03", name: "Om Deshmukh", status: "Present" },

        // 2 March
        { date: "2026-03-02", class: "SY-A", roll: "SY01", name: "Rahul Patil", status: "Present" },
        { date: "2026-03-02", class: "SY-A", roll: "SY02", name: "Aditi Kulkarni", status: "Present" },
        { date: "2026-03-02", class: "SY-A", roll: "SY03", name: "Om Deshmukh", status: "Absent" },

        // 3 March
        { date: "2026-03-03", class: "SY-A", roll: "SY01", name: "Rahul Patil", status: "Absent" },
        { date: "2026-03-03", class: "SY-A", roll: "SY02", name: "Aditi Kulkarni", status: "Present" },
        { date: "2026-03-03", class: "SY-A", roll: "SY03", name: "Om Deshmukh", status: "Present" },

        // 4 March
        { date: "2026-03-04", class: "SY-A", roll: "SY01", name: "Rahul Patil", status: "Present" },
        { date: "2026-03-04", class: "SY-A", roll: "SY02", name: "Aditi Kulkarni", status: "Absent" },
        { date: "2026-03-04", class: "SY-A", roll: "SY03", name: "Om Deshmukh", status: "Present" },

        // ================= TY =================
        // 1 March
        { date: "2026-03-01", class: "TY-A", roll: "TY01", name: "Sahil Joshi", status: "Present" },
        { date: "2026-03-01", class: "TY-A", roll: "TY02", name: "Pooja Mehta", status: "Absent" },
        { date: "2026-03-01", class: "TY-A", roll: "TY03", name: "Kunal Pawar", status: "Present" },

        // 2 March
        { date: "2026-03-02", class: "TY-A", roll: "TY01", name: "Sahil Joshi", status: "Present" },
        { date: "2026-03-02", class: "TY-A", roll: "TY02", name: "Pooja Mehta", status: "Present" },
        { date: "2026-03-02", class: "TY-A", roll: "TY03", name: "Kunal Pawar", status: "Absent" },

        // 3 March
        { date: "2026-03-03", class: "TY-A", roll: "TY01", name: "Sahil Joshi", status: "Absent" },
        { date: "2026-03-03", class: "TY-A", roll: "TY02", name: "Pooja Mehta", status: "Present" },
        { date: "2026-03-03", class: "TY-A", roll: "TY03", name: "Kunal Pawar", status: "Present" },

        // 4 March
        { date: "2026-03-04", class: "TY-A", roll: "TY01", name: "Sahil Joshi", status: "Present" },
        { date: "2026-03-04", class: "TY-A", roll: "TY02", name: "Pooja Mehta", status: "Absent" },
        { date: "2026-03-04", class: "TY-A", roll: "TY03", name: "Kunal Pawar", status: "Present" },
    ]);

    return (
        <AttendanceContext.Provider value={{ attendanceLogs }}>
            {children}
        </AttendanceContext.Provider>
    );
}
