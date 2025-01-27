import React, { useState } from "react";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const response = await login({ email, password });
    console.log("Response:", response);
    if(response)
    {
      navigate("/browse");
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/7a8c0067-a424-4e04-85f8-9e25a49a86ed/web/IN-en-20250120-TRIFECTA-perspective_860a95da-c386-446e-af83-fef8ddd80803_large.jpg")`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 -z-10"></div>

      <NavBar />

      {/* Login Form */}
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-80 p-16 rounded-md w-full max-w-md z-10">
          <h2 className="text-white text-4xl mb-8 font-bold">Sign In</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <button
              type="submit"
              className="bg-red-600 py-3 text-white rounded-md font-semibold mt-4 hover:bg-red-700 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4">
            New to Netflix?{" "}
            <span className="text-white hover:underline cursor-pointer">
              Sign up now.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
