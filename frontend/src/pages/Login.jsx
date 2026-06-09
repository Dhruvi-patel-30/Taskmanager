import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return alert("Please fill in all fields");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      localStorage.setItem("token", res.data.token);
      alert("Login successful! ");
      navigate("/dashboard");
    } catch (err) {
      // બેકએન્ડમાંથી આવતી પ્રોપર એરર મેસેજ બતાવવા માટે
      alert(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-4 font-sans">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:border-indigo-500/30">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL INPUT */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-12 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm text-indigo-400 font-medium hover:text-indigo-300 transition"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          {/* REGISTER LINK */}
          <p className="text-sm mt-6 text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              className="text-indigo-400 font-medium hover:text-indigo-300 underline underline-offset-4 transition"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
