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
  const [error, setError] = useState(null);

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setFormData({ name: "", email: "", password: "" });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode == "login") {
        login(formData.email.trim(), formData.password.trim());
      } else if (mode == "signup") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users`,
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
          }
        );
        if (response.status == "201") alert("User Created!! Please login");
        setMode("login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 text-white p-6 rounded-lg w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      {mode === "signup" && (
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full p-2 rounded bg-slate-700"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full p-2 rounded bg-slate-700"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          className="w-full p-2 rounded bg-slate-700"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-medium"
      >
        {loading ? "Processing..." : mode === "login" ? "Login" : "Sign Up"}
      </button>

      <p className="text-sm text-center mt-2">
        {mode === "login" ? (
          <>
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-purple-400 hover:underline"
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
              className="text-purple-400 hover:underline"
            >
              Login
            </button>
          </>
        )}
      </p>
    </form>
  );
}
