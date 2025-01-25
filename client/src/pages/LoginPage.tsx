import React, { useState } from "react";
import NavBar from "../components/NavBar";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/10f40e60-86b2-42d8-8d4d-c589f89cbf58/823d4775-45a5-4195-8d0f-dbe04b5185b3/IN-en-20230807-popsignuptwoweeks-perspective_alpha_website_medium.jpg")`,
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
