import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card text-center" style={{ padding: '3rem 1rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
          {user.fullname?.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ marginBottom: '0.5rem' }}>{user.fullname}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>@{user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
