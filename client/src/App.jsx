import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin panel (hidden, no login) */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Consumer site */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
