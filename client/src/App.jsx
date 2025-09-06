// Vite + React + TailwindCSS + axios
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState(null);
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users/register", {
        userName,
        email,
        password,
      });
      setMessage("✅ Registered: " + JSON.stringify(res.data));
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Error"));
    }
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      setApiKey(res.data.apiKey);
      setMessage("✅ Logged in, apiKey saved.");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Error"));
    }
  };

  const createPost = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/posts?apiKey=${apiKey}`,
        { content }
      );
      setPostId(res.data._id);
      setMessage("✅ Post created: " + JSON.stringify(res.data));
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Error"));
    }
  };

  const updatePost = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/posts/${postId}?apiKey=${apiKey}`,
        { content }
      );
      setMessage("✅ Post updated: " + JSON.stringify(res.data));
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || "Error"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 justify-center">
      <h1 className="text-2xl font-bold text-center mb-6">WEB90 Midterm</h1>

      <div className="grid gap-6 max-w-md mx-auto">
        <div className="p-4 bg-white shadow rounded-2xl">
          <h2 className="font-semibold mb-2">Register</h2>
          <input
            className="border rounded p-2 mb-2 w-full"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="border rounded p-2 mb-2 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded p-2 mb-2 w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded cursor-pointer" onClick={register}>
            Register
          </button>
        </div>

        <div className="p-4 bg-white shadow rounded-2xl">
          <h2 className="font-semibold mb-2">Login</h2>
          <input
            className="border rounded p-2 mb-2 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded p-2 mb-2 w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded cursor-pointer" onClick={login}>
            Login
          </button>
        </div>

        <div className="p-4 bg-white shadow rounded-2xl">
          <h2 className="font-semibold mb-2">Create Post</h2>
          <input
            className="border rounded p-2 mb-2 w-full"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded cursor-pointer" onClick={createPost}>
            Create
          </button>
        </div>

        {/* Cap nhat post gan nhat duoc tao */}
        <div className="p-4 bg-white shadow rounded-2xl"> 
          <h2 className="font-semibold mb-2">Update Post (latest post)</h2>
          <input
            className="border rounded p-2 mb-2 w-full"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded cursor-pointer" onClick={updatePost}>
            Update
          </button>
        </div>

        <div className="p-4 bg-gray-100 border rounded-2xl min-h-[50px] whitespace-pre-wrap">
          {message}
        </div>
      </div>
    </div>
  );
}
