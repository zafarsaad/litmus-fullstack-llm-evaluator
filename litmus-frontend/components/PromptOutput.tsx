"use client";

import { useState } from "react";

const PromptOutput = () => {
  const query = "Knock Kock!";
  const [groqResponse, setGroqResponse] = useState({
    alpha: "",
    beta: "",
    gamma: "",
  });
  const [loadingResponse, setLoadingResponse] = useState(false);

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
      setGroqResponse({
        alpha:
          data.alpha.response || data.alpha.error || "alpha response missing",
        beta: data.beta.response || data.beta.error || "beta response missing",
        gamma:
          data.gamma.response || data.gamma.error || "gamma response missing",
      });
    } catch (error) {
      console.error("Error fetching Groq response:", error);
      setGroqResponse({
        alpha: "Error on all 3",
        beta: "Error on all 3",
        gamma: "Error on all 3",
      });
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
      <div className="flex flex-row border-2 rounded-md px-2 justify-between my-2">
        <div>
          <h2 className="bg-slate-700">Alpha Response</h2>
          <p>{groqResponse.alpha}</p>
        </div>
        <div>
          <h2 className="bg-slate-700">Beta Response</h2>
          <p>{groqResponse.beta}</p>
        </div>
        <div>
          <h2 className="bg-slate-700">Gamma Response</h2>
          <p>{groqResponse.gamma}</p>
        </div>
      </div>
    </div>
  );
};

export default PromptOutput;
