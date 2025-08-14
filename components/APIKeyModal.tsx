"use client";

import { useState, useEffect } from "react";

export default function APIKeyModal() {
  const [apiKey, setApiKey] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem("openai_api_key");
    if (!existing) setShowModal(true);
  }, []);

  function handleSave() {
    if (apiKey.trim().startsWith("sk-")) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      setShowModal(false);
    } else {
      alert("Please enter a valid OpenAI key (starts with sk-)");
    }
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-zinc-800 p-6 rounded-md w-full max-w-md shadow-xl space-y-4 text-white">
        <h2 className="text-xl font-semibold">Enter Your OpenAI API Key</h2>
        <p className="text-sm text-zinc-300">
          This key will be used to generate your follow-up emails. You can get
          one at{" "}
          <a
            href="https://platform.openai.com/account/api-keys"
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI's dashboard
          </a>
          .
        </p>

        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full p-2 rounded border border-zinc-600 bg-zinc-900 text-white"
        />

        <button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Save API Key
        </button>
      </div>
    </div>
  );
}
