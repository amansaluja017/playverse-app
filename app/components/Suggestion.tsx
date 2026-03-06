import { apiClient } from "@/utils/api-client";
import { useDebounce } from "@/utils/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface suggestionType {
  title: string;
  _id: string;
}

function Suggestion({
  setSearchVideo,
  searchVideo,
  setSuggestionPanel
}: {
  setSearchVideo: Dispatch<SetStateAction<string>>;
  searchVideo: string;
  setSuggestionPanel: Dispatch<SetStateAction<boolean>>;
}) {
  const [suggestions, setSuggestions] = useState<Array<suggestionType>>([]);
  const router = useRouter();

  const params = useSearchParams();

  const debouncedQuery = useDebounce(searchVideo);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedQuery?.trim()) fetchSuggestions();
    else return;
  }, [debouncedQuery]);

  const handleEnter = async (value: string) => {
    setSearchVideo(value);
    const newParams = new URLSearchParams(params.toString());
    newParams.set("query", value);
    router.push(`/search?${newParams.toString()}`);
  };

  const fetchSuggestions = async () => {
    if (!searchVideo) return;
    try {
      const response = await apiClient.getSuggesions(searchVideo);
      console.log(response);

      if (!response) return;
      setSuggestions(
        Array.isArray(response) ? (response as Array<suggestionType>) : []
      );
    } catch (error) {
      console.log(error);
      alert("failed to fetch suggestions");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current?.contains(e.target as Node)) {
        setSuggestionPanel(false);
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => document.addEventListener("click", handleClickOutside)
  }, []);

  return (
    <div ref={divRef} className="bg-[#171717] h-40 shadow-2xl w-full rounded-2xl shadow-[#014C9A]/20 p-4">
      {suggestions &&
        suggestions.map((data, i) => (
          <div
            key={i}
            onClick={() => handleEnter(data.title)}
            className="cursor-pointer w-full p-2 flex items-center rounded-full border-2 border-[#1311116c] hover:bg-[#100f0fad]">
            <p>{data.title}</p>
          </div>
        ))}
    </div>
  );
}

export default Suggestion;
