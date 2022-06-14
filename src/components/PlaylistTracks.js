import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useObserverRefetch from "../hooks/useObserverRefetch";
import ObservedSection from "./ObservedSection";

export default function PlaylistTracksPage(props) {
  const { id } = useParams();
  const { data, loading, refetch } = useFetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks`
  );
  const [currItems, setCurrItems] = useState(null);
  const ref = useObserverRefetch(data?.next, loading, refetch);

  useEffect(() => {
    if (data) {
      const items = Object.entries(data.items).map(([item, data]) => data.track);
      setCurrItems((currItems) =>
        currItems ? [...currItems, ...items] : items
      );
    }
  }, [data]);

  useEffect(() => {
    return () =>  setCurrItems(null);
  }, [id]);


  return (
    <ObservedSection
      title="Плейлист"
      items={currItems}
      next={data?.next}
      itemsType="tracks"
      obsRef={ref}
      containerType="tracks"
    />
  );
}
