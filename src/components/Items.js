import Track from "./Track";
import Card from "./Card";
export default function Items(props) { //Todo: <мне> <добавить компоненты tracksContainer и cardsContainer (тогда можно избавиться от switch, храня колбеки в них)>
  function switchItemsType(type) {
    switch (type) {
      case "tracks":
        return createTrack;
      case "playlists":
        return createCard;
      default:
        return;
    }
  }
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
  function createCard(item) {
    return (
      <Card
        key={item.id}
        name={item.name}
        imgUrl={item.images[0].url}
        artists={item.owner.display_name}
        id={item.id}
      />
    );
  }

  function createItems(itemsData, callback) {
    let items = [];
    itemsData.forEach((itemData) => {
      try {
        items.push(callback(itemData));
      } catch (err) {
        console.log(
          `Спотифай один из объектов пришел некорректным, пропустим его `
        );
      }
    });
    return items;
  }
  return <>{createItems(props.itemsData, switchItemsType(props.itemsType))}</>;
}
