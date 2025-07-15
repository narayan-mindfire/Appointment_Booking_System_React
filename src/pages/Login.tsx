// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInterceptor";
import { AxiosError } from "axios";
import Button from "../components/Button";
import { useAppContext } from "../context/app.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {setState} = useAppContext()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      setState("token", res.data.token)
      setState("userType", res.data.user_type)
      setState("userName", res.data.user_name)
      navigate(res.data.user_type === "doctor" ? "/doctor" : "/patient");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4">
      <form
        // onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-md max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label>Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          variant="default"
          onClick={handleSubmit}
          children={"Log In"}
          className="w-full"
        />
        <p className="text-center">or</p>
        <Button
          className="w-full"
          variant="outline"
          children={"register"}
          onClick={() => navigate("/register")}
        />
      </form>
    </div>
  );
};

export default Login;
