import { useState } from "react";

export default function TamilBrahmiKeyboard() {
  // Tamil Brahmi Unicode characters (sample subset)
  const tamilBrahmiKeys = [
    "𑀅", "𑀆", "𑀇", "𑀈", "𑀉", "𑀊",
    "𑀋", "𑀌", "𑀍", "𑀎", "𑀏", "𑀐",
    "𑀑", "𑀒", "𑀓", "𑀔", "𑀕", "𑀖",
  ];

  const [input, setInput] = useState("");

  const handleKeyClick = (char) => setInput((prev) => prev + char);
  const handleClear = () => setInput("");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tamil Brahmi Keyboard</h2>

      <textarea
        value={input}
        readOnly
        className="w-full max-w-md h-24 p-2 border rounded-lg mb-4 text-xl"
        placeholder="Click keys below to type..."
      />

      <div className="grid grid-cols-6 gap-2 max-w-md">
        {tamilBrahmiKeys.map((char, idx) => (
          <button
            key={idx}
            onClick={() => handleKeyClick(char)}
            className="p-3 bg-white border rounded-lg shadow hover:bg-gray-100 text-2xl"
          >
            {char}
          </button>
        ))}
      </div>

      <button
        onClick={handleClear}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
      >
        Clear
      </button>
    </div>
  );
}
