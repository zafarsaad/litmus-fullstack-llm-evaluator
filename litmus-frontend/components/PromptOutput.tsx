"use client";

import { queryGroq } from "@/app/util/ai";
import { useState } from "react";
// import { useApiKey } from "@/app/util/apiKeyContext";

const PromptOutput = () => {
  //   const apiKey = useApiKey();
  const query = "Knock Kock!";
  const [groqResponse, setGroqResponse] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setLoadingResponse(true);

  //     const newGroqResponse = await fetch(
  //       `api/groq/?query=${encodeURIComponent(query)}`
  //     );
  //     const data = await newGroqResponse.json();
  //     console.log(newGroqResponse);
  //     setGroqResonse(data);
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingResponse(true);

    try {
      const newGroqResponse = await fetch(
        `/api/groq/?query=${encodeURIComponent(query)}`
      );

      if (!newGroqResponse.ok) {
        throw new Error(
          `Error: ${newGroqResponse.status} ${newGroqResponse.statusText}`
        );
      }

      // Check if there's a body to parse
      const text = await newGroqResponse.text();
      const data = text ? JSON.parse(text) : null;

      if (!data) {
        throw new Error("No data received from the API");
      }

      console.log(data);
      setGroqResponse(data.message || "No response message");
    } catch (error) {
      console.error("Error fetching Groq response:", error);
      setGroqResponse("Error fetching Groq response");
    } finally {
      setLoadingResponse(false);
    }
  };

  return (
    <div className="my-2">
      <div>Prompt Output</div>
      <button
        className="bg-slate-800 border-r-amber-600 border-2 rounded-md px-2"
        onClick={handleSubmit}
      >
        Test
      </button>
      {loadingResponse && <span>...loading</span>}
      <div>{groqResponse}</div>
    </div>
  );
};

export default PromptOutput;
