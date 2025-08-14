"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
  }

  return (
    <div className="space-y-4 p-4">
      {sent ? (
        <p className="text-green-400">Check your email for the login link.</p>
      ) : (
        <>
          <input
            className="w-full p-2 border rounded bg-zinc-800 text-white"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Send Magic Link
          </button>
        </>
      )}
    </div>
  );
}
