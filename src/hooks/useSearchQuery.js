import { useState, useEffect } from "react";
import { search } from "../Api";

export default function useSearchQuery(searchQ) {
  const [tracksData, setTracksData] = useState(null);
  const [cardsData, setCardsData] = useState(null);
  useEffect(() => {
    if (searchQ !== "") {
      search(searchQ).then((data) => {
        if (data !== undefined) {
          setTracksData(data["tracks"]);
          setCardsData(data["playlists"]);
        }
      });
    }
  }, [searchQ]);
  return [tracksData, cardsData];
}
