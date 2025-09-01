import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactsPage from "./pages/ContactsPage";
import DealsPage from "./pages/DealsPage";
import NotesPage from "./pages/NotesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/contacts"
            element={<ProtectedRoute><ContactsPage /></ProtectedRoute>}
          />
          <Route
            path="/deals"
            element={<ProtectedRoute><DealsPage /></ProtectedRoute>}
          />
          <Route
            path="/notes/:contactId"
            element={<ProtectedRoute><NotesPage /></ProtectedRoute>}
          />
          <Route
            path="/analytics"
            element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>}
          />
          <Route path="/" element={<Navigate to="/contacts" />} />
        </Routes>
      </div>
    </div>
  );
}
