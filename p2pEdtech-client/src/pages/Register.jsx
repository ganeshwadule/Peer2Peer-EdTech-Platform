import { useAuth } from "../contexts/AuthContext";
const Register = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      isMaster: false,
      expertise: '',
      skills: [],
    });
    const { register, error, clearError } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await register(formData);
    };
  
    const handleSkillsChange = (e) => {
      const skills = e.target.value.split(',').map(skill => skill.trim());
      setFormData(prev => ({ ...prev, skills }));
    };
  
    useEffect(() => {
      clearError();
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white border-4 border-black p-6 shadow-brutal">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
  
          {error && (
            <div className="bg-red-100 border-4 border-red-500 p-3 mb-4">
              {error}
            </div>
          )}
  
          <div className="mb-4">
            <label className="block font-bold mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="input-brutal"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="input-brutal"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="input-brutal"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isMaster}
                onChange={(e) => setFormData(prev => ({ ...prev, isMaster: e.target.checked }))}
                className="form-checkbox border-2 border-black"
              />
              <span className="font-bold">Register as a Master</span>
            </label>
          </div>
  
          {formData.isMaster && (
            <>
              <div className="mb-4">
                <label className="block font-bold mb-2">Expertise</label>
                <input
                  type="text"
                  value={formData.expertise}
                  onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
                  className="input-brutal"
                />
              </div>
  
              <div className="mb-6">
                <label className="block font-bold mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  className="input-brutal"
                  placeholder="e.g. JavaScript, React, Node.js"
                />
              </div>
            </>
          )}
  
          <button type="submit" className="btn-brutal-green w-full">
            Register
          </button>
  
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    );
  };

  export default Register;