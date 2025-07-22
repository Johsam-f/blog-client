import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { Mail } from "lucide-react";
import { object, string } from "better-auth";

function Signup () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

//   const handleGoogleSignup = async () => {
//     setLoading(true);
//     try {
//       await signIn("google", { callbackUrl: "/" });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const { data, error } = await authClient.signUp.email({
            email, // user email address
            password, // user password -> min 8 characters by default
            name, // user display name
            //image, // User image URL (optional)
            callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
        }, {
            onRequest: (ctx) => {
                setLoading(true);
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
            },
            onError: (ctx) => {
                // display the error message from server
                setErrorMsg(ctx.error.message);
                console.log(ctx.error.message);
            },
        });
        // if(error) setErrorMsg(error.message);
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">Sign Up</h1>
        
        {/* --- Error Message --- */}
        {errorMsg && (
          <p className="mb-4 text-center text-red-400">{errorMsg}</p>
        )}
        
        {/* Google Sign Up */}
        <button
        //   onClick={handleGoogleSignup}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-black shadow-md transition hover:bg-gray-100"
          disabled={loading}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-500"></div>
          <p className="mx-2 text-gray-300">or</p>
          <div className="h-px flex-1 bg-gray-500"></div>
        </div>

        {/* Email Signup */}
        <form onSubmit={(e) => handleEmailSignup(e)} className="space-y-4">
            {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="username"
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              value={email}
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          {/* Password Input */}
          <input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white shadow-md transition hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue with Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
