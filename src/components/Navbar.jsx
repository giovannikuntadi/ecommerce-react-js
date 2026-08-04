import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/Auth';

export function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
        </div>
        <div className="navbar-auth">
          {user ? (
            <>
              <span>
                Welcome, <b>{user.email}</b>
              </span>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
