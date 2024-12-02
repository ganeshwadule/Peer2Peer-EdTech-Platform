import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, clearError } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await login(email, password);
    };
  
    useEffect(() => {
      // Clear any existing errors when component mounts
      clearError();
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white border-4 border-black p-6 shadow-brutal">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          
          {error && (
            <div className="bg-red-100 border-4 border-red-500 p-3 mb-4">
              {error}
            </div>
          )}
  
          <div className="mb-4">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-brutal"
              required
            />
          </div>
  
          <div className="mb-6">
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-brutal"
              required
            />
          </div>
  
          <button type="submit" className="btn-brutal-green w-full">
            Login
          </button>
  
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:underline">
              Don't have an account? Register here
            </Link>
          </div>
        </form>
      </div>
    );
  };

  export default Login;