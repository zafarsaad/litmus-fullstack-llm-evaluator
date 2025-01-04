"use client";

import { useQuery } from "@/context/QContext";
import { useState } from "react";
// import { useState } from "react";

const UserExperiment = () => {
  //   const [userQuery, setUserQuery] = useState("");
  const { setQuery } = useQuery();
  const [queryLoaded, setQueryLoaded] = useState(false);

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("queryInput") as HTMLInputElement;

    if (input) {
      const query = input.value;
      setQuery(query);
      setQueryLoaded(true);
    } else {
      console.error("Input element not found!");
    }
  };

  return (
    <div>
      User Experiment
      <form onSubmit={handleQuerySubmit} className="flex">
        <input
          name="queryInput"
          type="text"
          placeholder="Input your query..."
          className="rounded-md border border-slate-300 p-2 text-slate-700"
          //   value={userQuery}
        />
        <button
          //   onClick={handleQuerySubmit}
          type="submit"
          className="rounded-md border border-slate-700 text-white bg-slate800 hover:bg-slate-400 ml-3 p-2"
        >
          Load Query
        </button>
        <div className="p-2 align-middle">
          {queryLoaded ? <span>✅</span> : <span>⛔️</span>}
        </div>
      </form>
    </div>
  );
};

export default UserExperiment;
