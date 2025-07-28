import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";

function Signup () {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<"google" | "facebook" | null>(null);

  const handleGoogleSignup = async () => {
    setLoading("google");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong with Google signup.");
      setLoading(null);
    }
  };
  

  const handleFacebookSignup = async () => {
    setLoading("facebook");
    try {
      await authClient.signIn.social({
        provider: "facebook",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg("Facebook signup failed.");
      setLoading(null);
    }
  };
  

  const navigateToEmail = () => { 
    navigate("/emailSignUp");
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-white">Sign Up to Find All blogs</h1>

      {/* --- Error Message --- */}
      {errorMsg && (
        <p className="mb-4 p-1 rounded-sm text-center bg-red-800">{errorMsg}</p>
      )}
      
      {/* Google Sign Up */}
      <Button
        onClick={handleGoogleSignup}
        variant="secondary"
        disabled={loading === "google"}
      >
        {loading === "google" ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
        ) : (
          <FcGoogle className="text-xl mr-2" />
        )}
        Continue with Google
      </Button>

      {/* Facebook Sign Up */}
      <Button
        onClick={handleFacebookSignup}
        variant="secondary"
        className="mt-3"
        disabled={loading === "facebook"}
      >
        {loading === "facebook" ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
        ) : (
          <FaFacebook className="text-xl mr-2 text-blue-600" />
        )}
        Continue with Facebook
      </Button>

      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-500"></div>
        <p className="mx-2 text-gray-300">or</p>
        <div className="h-px flex-1 bg-gray-500"></div>
      </div>

      <Button onClick={navigateToEmail} variant="secondary">create Account with email <Mail /> </Button>

      <div className="mt-4 text-gray-300">
        Have an account already? <Link to={"/"} className="text-blue-600 hover:underline"> Login</Link>
      </div>
    </div>
  );
};

export default Signup;
