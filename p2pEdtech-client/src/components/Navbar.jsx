const Navbar = () => {
    const { user, logout } = useAuth();
    
    return (
      <nav className="bg-white border-4 border-black shadow-brutal p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">P2P Learning</Link>
          {user ? (
            <div className="flex gap-4">
              <Link to="/search" className="btn-brutal">Find Masters</Link>
              <Link to="/requests" className="btn-brutal">Requests</Link>
              <Link to="/sessions" className="btn-brutal">Sessions</Link>
              <Link to={`/profile/${user.id}`} className="btn-brutal">Profile</Link>
              <button onClick={logout} className="btn-brutal-red">Logout</button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="btn-brutal">Login</Link>
              <Link to="/register" className="btn-brutal">Register</Link>
            </div>
          )}
        </div>
      </nav>
    );
  };

  export default Navbar;