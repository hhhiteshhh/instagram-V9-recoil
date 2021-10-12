import faker from "faker";
import { useEffect, useState } from "react";
function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestion = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestion);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="text-sm mb-5 flex justify-between">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-sm text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map((suggestion, i) => (
        <div
          key={suggestion.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full p-[2px]"
            src={suggestion.avatar}
            alt=""
          />
          <div className="flex-1 ml-4">
            <h2 className="text-sm font-semibold ">{suggestion.username}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {suggestion.company.name}
            </h3>
              </div>
              <button className="font-bold text-xs text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
