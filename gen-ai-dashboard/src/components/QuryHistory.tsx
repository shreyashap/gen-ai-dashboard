import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const QueryHistory: React.FC = () => {
  const history = useSelector((state: RootState) => state.query.history);

  return (
    <div className="p-4 bg-[#112240] rounded-lg shadow mt-4">
      <h2 className="text-lg font-bold ">Query History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No history available.</p>
      ) : (
        <ul className="list-disc pl-5">
          {history.map((entry, index) => (
            <li key={index} className="py-1 list-none">
              <strong>Q:</strong> {entry.query} <br />
              <strong>A:</strong> {entry.results[0]?.answer || "No data found"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueryHistory;
