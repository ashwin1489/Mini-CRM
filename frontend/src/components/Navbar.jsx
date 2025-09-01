import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <div className="container">
        <Link to="/" style={{ fontWeight: "bold", marginRight: "20px" }}>
          Mini CRM
        </Link>
        {token ? (
          <>
            <Link to="/contacts">Contacts</Link>
            <Link to="/deals">Deals</Link>
            <Link to="/analytics">Analytics</Link>
            <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
