import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { Mail } from "lucide-react";
import Button from "@/components/ui/button";
function Signup () {
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleSignup = async () => {
    try { 
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      }) 
    } catch (error) {
      console.error(error);
      setErrorMsg("something went wrong try again");
    }
    
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-white">Sign Up to Find All blogs</h1>

      {/* --- Error Message --- */}
      {errorMsg && (
        <p className="mb-4 p-1 rounded-sm text-center bg-red-800">{errorMsg}</p>
      )}
      
      {/* Google Sign Up */}
      <Button onClick={handleGoogleSignup} variant="secondary">
        <FcGoogle className="text-xl" />
        Continue with Google
      </Button>

      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-500"></div>
        <p className="mx-2 text-gray-300">or</p>
        <div className="h-px flex-1 bg-gray-500"></div>
      </div>

      <Button variant="secondary">create Account with email <Mail /> </Button>
    </div>
  );
};

export default Signup;
