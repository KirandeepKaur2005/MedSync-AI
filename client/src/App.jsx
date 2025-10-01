
import { Routes, Route, Navigate } from "react-router-dom";
import MedicationEntryForm from './pages/addMedication.jsx'
function App() {
  return (
    
    <Routes>
      
    <Route path="/addMedication" element={<MedicationEntryForm />} />
    <Route path="*" element={<Navigate to="/addMedication"/>} />
    </Routes>
  )
}


export default App


