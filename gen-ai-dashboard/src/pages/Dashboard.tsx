import React from "react";
import QueryInput from "../components/QueryInput";
import ResultsDisplay from "../components/ResultDisplay";
import QueryHistory from "../components/QuryHistory";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Gen AI Analytics
        </h1>
        <QueryInput />
        <ResultsDisplay />
        <QueryHistory />
      </div>
    </div>
  );
};

export default Dashboard;
