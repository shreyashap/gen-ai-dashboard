import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ResultsDisplay: React.FC = () => {
  const { results, loading } = useSelector((state: RootState) => state.query);

  if (loading)
    return <p className="text-center text-blue-400">Processing query...</p>;

  return (
    <div className="p-6 mt-6 bg-[#112240] rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#64ffda] mb-4">
        Query Results
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-400 text-center">No results found.</p>
      ) : (
        <>
          {/* Text-Based Results */}
          <ul className="list-disc pl-5 text-gray-300 mb-4">
            {results.map((result, index) => (
              <li key={index} className="py-2">
                <strong>{result.question}: </strong> {result.answer}
              </li>
            ))}
          </ul>

          {/* Data Visualization */}
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results} className="mx-auto">
                <XAxis dataKey="category" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#233554",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Bar dataKey="answer" fill="#4f46e5" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsDisplay;
