"use client";

import { useQuery } from "@/context/QContext";
// import { useState } from "react";

const UserExperiment = () => {
  //   const [userQuery, setUserQuery] = useState("");
  const { setQuery } = useQuery();

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("queryInput") as HTMLInputElement;

    if (input) {
      const query = input.value;
      setQuery(query);
    } else {
      console.error("Input element not found!");
    }
  };

  return (
    <div>
      User Experiment
      <form onSubmit={handleQuerySubmit}>
        <input
          name="queryInput"
          type="text"
          placeholder="Input your query..."
          //   value={userQuery}
        />
        <button
          //   onClick={handleQuerySubmit}
          type="submit"
        >
          Test LLMs
        </button>
      </form>
    </div>
  );
};

export default UserExperiment;
