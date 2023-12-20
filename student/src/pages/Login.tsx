import React, { useState } from "react";
import Logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/authContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showPassword] = React.useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      const accessToken = data.access_token;
      const name = data.name;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("name", name);
      console.log("Login successful");
      login();
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={Logo} alt="logo" width={300} />
      {/* <div className="flex flex-col items-center justify-center"> */}
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4 w-full">
          <h5 className="text-3xl text-center dark:text-black mb-4">Login</h5>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="emailOrUsername"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Login;
