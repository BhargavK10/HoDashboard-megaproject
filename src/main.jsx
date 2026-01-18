import { AttendanceDataProvider } from "./context/AttendanceDataContext";
import { ExamsDataProvider } from "./context/ExamsDataContext.jsx";
import { TeachersDataProvider } from "./context/TeachersDataContext.jsx";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AttendanceDataProvider>
      <ExamsDataProvider>
        <TeachersDataProvider>
          <App />
        </TeachersDataProvider>
      </ExamsDataProvider>
    </AttendanceDataProvider>
  </StrictMode>,
)
