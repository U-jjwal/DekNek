import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-container flex justify-between items-center">
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
          DekNek
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hide-on-mobile" style={{ color: 'var(--text-secondary)' }}>Welcome, {user.username}</span>
              <Link to="/create-post">
                <button style={{ backgroundColor: 'var(--primary-color)' }}>Create Post</button>
              </Link>
              <Link to="/profile">
                <button style={{ backgroundColor: 'transparent', border: '1px solid var(--primary-color)' }}>Profile</button>
              </Link>
              <button onClick={logout} style={{ backgroundColor: 'var(--danger-color)' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button style={{ backgroundColor: 'transparent', border: '1px solid var(--primary-color)' }}>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
