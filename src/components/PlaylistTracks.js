import { useParams } from "react-router-dom";
import TracksSection from "./TracksSection";
import { getPlaylistTracks } from "../Api";
import { useEffect, useState } from "react";

export default function PlaylistTracks(props) {
  const { id } = useParams();
  const [tracks, setTracks] = useState(null);
  useEffect(() => {
    getTracks();
  }, [id]);

  const tracksSection = (
    <TracksSection
      isAllMode={true}
      data={tracks}
      mode="clear"
      title="Треки"
      itemsType="tracks"
      updateFunc={getPlaylistTracks}
      isObserved={false}
    />
  );

  function getTracks() {
    getPlaylistTracks(id).then((data) => {
      if (data !== undefined) setTracks(data.tracks);
    });
  }

  return <>{tracksSection}</>;
}
