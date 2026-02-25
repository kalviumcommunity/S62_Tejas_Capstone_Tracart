import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await login(formData.email.trim(), formData.password.trim());
      } else if (mode === "signup") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users`,
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
          }
        );

        if (response.status === 201) {
          alert(
            "Account created successfully! Please login with your credentials."
          );
          setMode("login");
          setFormData({ name: "", email: "", password: "" });
        }
      }
    } catch (err) {
      // Better error handling
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 text-white p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">
          {mode === "login" ? "Login to TraCart" : "Create Account"}
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded text-sm">
            {error}
          </div>
        )}

        {mode === "signup" && (
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full p-3 rounded bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="w-full p-3 rounded bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            disabled={loading}
          />
          {mode === "signup" && (
            <p className="text-xs text-slate-400 mt-1">Minimum 6 characters</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Processing..." : mode === "login" ? "Login" : "Sign Up"}
        </button>

        <div className="text-sm text-center text-slate-400 pt-4 border-t border-slate-700">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-purple-400 hover:text-purple-300 hover:underline font-medium"
                disabled={loading}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-purple-400 hover:text-purple-300 hover:underline font-medium"
                disabled={loading}
              >
                Login
              </button>
            </>
          )}
        </div>

        <div className="text-xs text-slate-500 text-center mt-4">
          {mode === "login"
            ? "Demo: Use any email/password (will auto-create account)"
            : "Create your account to start tracking subscriptions"}
        </div>
      </form>
    </div>
  );
}
