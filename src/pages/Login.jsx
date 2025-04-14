import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleExit = () => {
    window.history.back();
  };

  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="/4.png"
        alt="Login Background"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[650px] rounded-2xl mx-auto bg-black/50 text-white relative">
          <Button
            className="absolute top-2 right-2 hover:bg-cyan-500 hover:text-black transition duration-150"
            onClick={handleExit}
          >
            X
          </Button>
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign In</h1>
            {error && <p className="p-3 bg-red-400 my-2">{error}</p>}
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 my-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 my-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button className="bg-cyan-500 py-3 my-6 rounded font-bold  hover:bg-cyan-300 dark:hover:bg-cyan-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                Sign In
              </button>
              <div className="relative mt-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase mb-9">
                  <span className="px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <button
                type="button"
                className="px-4 py-2 border flex gap-2 border-slate-200 hover:font-semibold hover:text-cyan-500 hover:border-cyan-700 rounded-lg text-white dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300 hover:shadow transition duration-150"
                onClick={signInWithGoogle}
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                />
                <span>Login with Google</span>
              </button>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <p>
                  <input className="mr-2 mt-9" type="checkbox" /> Remember me
                </p>
                <p className="mt-9">Forgot Password?</p>
              </div>
              <p className="py-4 flex justify-between items-center">
                <span className="text-muted-foreground">
                  Don't have an account?
                </span>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-white hover:text-cyan-500 transition duration-150"
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
