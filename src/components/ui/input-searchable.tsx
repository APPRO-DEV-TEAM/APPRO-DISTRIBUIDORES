import { autocomplete } from "../../lib/google";
import { ChangeEvent, useEffect, useState } from "react";

export function InputSearchable() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const results = await autocomplete(e.target.value);
    setResults(results || []);
    console.log(results);
  };

  useEffect(() => {
    async function fetchPredictions(search: string) {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": "AIzaSyATFFlBVvbstEAytcAChHNX73TIrsFmGzU",
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
          },
          body: JSON.stringify({
            textQuery: search,
          }),
          method: "POST",
        }
      );
      const data = await response.json();
      console.log(data);
    }
    fetchPredictions(input);
  }, [input]);

  return (
    <div className="sm:h-16s flex w-full flex-row items-center rounded-xl border bg-slate-100 px-10">
      <input type="text" value={input} onChange={handleChange} />
      <ul className="bg-black text-white">
        {results.map((result) => (
          <li key={result.place_id}>{result.description}</li>
        ))}
      </ul>
    </div>
  );
}
