import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery, fetchResults, setResults } from "../redux/querySlice";
import { mockData } from "../data/mockData";

interface searchResultType {
  category: string;
  question: string;
  answer: number | string;
}

const QueryInput: React.FC = () => {
  const [input, setInput] = useState("");
  const [searchSuggestion, setSearchSuggestion] =
    useState<searchResultType[]>();

  const [suggestionOpen, setSuggestionOpen] = useState(true);

  const dispatch = useDispatch();

  const handleQuerySubmit = () => {
    if (!input.trim()) return;
    dispatch(setQuery(input));
    dispatch(fetchResults());

    const matchedResults = mockData.filter((item) =>
      item.question.toLowerCase().includes(input.toLowerCase())
    );

    if (matchedResults.length > 0) setInput("");

    setTimeout(() => {
      dispatch(
        setResults(
          matchedResults.length > 0
            ? matchedResults
            : [
                {
                  category: "General",
                  question: input,
                  answer: 0,
                },
              ]
        )
      );
    }, 2000);

    setInput("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSuggestionOpen(true);
    setInput(e.target.value);
    const searchResults = mockData.filter((item) =>
      item.question.toLowerCase().includes(input.toLowerCase())
    );

    if (searchResults.length > 0) setSearchSuggestion(searchResults);
  };

  return (
    <div className="p-6 flex flex-col items-center bg-opacity-50 backdrop-blur-lg shadow-neon rounded-xl relative">
      <input
        type="text"
        className="w-80 p-3 bg-transparent border-b-2 border-blue-400 outline-none text-white placeholder-gray-300"
        placeholder="Ask an AI-powered query..."
        value={input}
        onChange={handleChange}
      />
      <div
        className={`w-80 bg-slate-800 top-20 absolute ${
          !suggestionOpen && "hidden"
        }`}
      >
        {searchSuggestion?.map((suggestion) => (
          <p
            className="px-4 py-2 text-gray-400 cursor-pointer hover:bg-gray-700"
            onClick={() => {
              setInput(suggestion.question);
              setSuggestionOpen(false);
            }}
          >
            {suggestion.question}
          </p>
        ))}
      </div>
      <button
        onClick={handleQuerySubmit}
        className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-all"
      >
        Submit Query
      </button>
    </div>
  );
};

export default QueryInput;
