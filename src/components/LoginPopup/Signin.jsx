import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"; // adjust if needed
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Save data to Firestore in nested structure
await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      createdAt: new Date()
    });

    alert("Signup successful! 🎉");
    navigate("/login");
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Join Wildflower 🌸
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-pink-300"
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-pink-300"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-pink-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-6 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-pink-300"
                placeholder="Re-enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-pink-300" : "bg-pink-500 hover:bg-pink-600"
            } text-white p-3 rounded-lg font-medium text-lg transition-all duration-300`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link to="/login" className="text-pink-600 font-medium hover:underline ml-1">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
