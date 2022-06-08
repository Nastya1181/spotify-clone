import Track from "./Track";
import { useEffect, useState, useRef } from "react";
import Observer from "./Observer";
import AllLink from "./AllLink";
import useContainerContent from "../hooks/useContainerContent";
import { useLocation } from "react-router-dom";

export default function TracksSection(props) {
  const [tracksData, setTracksData] = useState(props.data);
  const location = useLocation();
  const content = useContainerContent(
    props.itemsType,
    createTrack,
    tracksData,
    props.mode
  );
  useEffect(() => {
    setTracksData(props.data);
  }, [props.data]);

  function createTrack(item) {
    return (
      <Track
        key={item["id"]}
        name={item["name"]}
        imgUrl={item["album"]["images"][2]["url"]}
        artists={item["artists"]}
        minutesDuration={item["duration_ms"]}
        id={item["id"]}
      />
    );
  }
  let modificator =
    location.pathname !== "/" ? `tracks-container_all-visible` : "";

  let observer = "";

  if (props.isObserved) {
    observer = (
      <Observer
        updateFunc={props.updateFunc}
        itemsType={props.itemsType}
        next={
          tracksData !== null && tracksData.next !== null ? tracksData.next : ""
        }
        createItemsCallback={createTrack}
        content={content}
        setData={setTracksData}
      />
    );
  }

  function setFooter(event) {
    console.log(event.target);
  }

  return (
    <section className="items-category">
      <div className="items-category__wrapper">
        <h2 className="items-category__title title">{props.title}</h2>
        <AllLink
          next={
            tracksData !== null && tracksData.next !== null
              ? tracksData.next
              : ""
          }
          itemsType={props.itemsType}
        />
        <div
          className={`tracks-container ${modificator}`}
          onClick={(event) => setFooter(event)}
        >
          {content}
        </div>
        {observer}
      </div>
    </section>
  );
}
