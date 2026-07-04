import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container nav-container">

        <NavLink to="/" className="logo">
          Blog<span>Hub</span>
        </NavLink>

        <nav>
          <ul className="nav-links">

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-link" : ""
                }
              >
                Home
              </NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink
                    to="/create-post"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Create
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Profile
                  </NavLink>
                </li>

                <li className="welcome-user">
                  👋 {user.username}
                </li>

                <li>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;