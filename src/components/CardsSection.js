import Card from "./Card";
import { useEffect, useState, useRef } from "react";
import Observer from "./Observer";
import AllLink from "./AllLink";
import useContainerContent from "../hooks/useContainerContent";
import { useLocation } from "react-router-dom";

export default function CardsSection(props) {
  const [cardsData, setCardsData] = useState(props.data);
  const location = useLocation();
  const content = useContainerContent(
    props.itemsType,
    createCard,
    cardsData,
    props.mode
  );

  useEffect(() => {
    setCardsData(props.data);
  }, [props.data]);

  function createCard(item) {
    return (
      <Card
        key={item["id"]}
        name={item["name"]}
        imgUrl={item["images"][0]["url"]}
        artists={item["owner"]["display_name"]}
        id={item["id"]}
      />
    );
  }
  let modificator =
    location.pathname !== "/" ? `cards-container_all-visible` : "";

  let observer = "";

  if (props.isObserved) {
    observer = (
      <Observer
        updateFunc={props.updateFunc}
        itemsType={props.itemsType}
        next={
          cardsData !== null && cardsData.next !== null ? cardsData.next : ""
        }
        createItemsCallback={createCard}
        content={content}
        setData={setCardsData}
      />
    );
  }

  return (
    <section className="items-category">
      <div className="items-category__wrapper">
        <h2 className="items-category__title title">{props.title}</h2>
        <AllLink
          next={
            cardsData !== null && cardsData.next !== null ? cardsData.next : ""
          }
          itemsType={props.itemsType}
        />
        <div className={`cards-container ${modificator}`}>{content}</div>
        {observer}
      </div>
    </section>
  );
}
