import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';

export default function App(){
  const [user, setUser] = useState(null);
  // simple auth simulation
  const handleLogin = (creds) => {
    setUser({name: 'Knocx Admin', ...creds});
  };
  const handleLogout = ()=> setUser(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  )
}
