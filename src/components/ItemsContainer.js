import Items from "./Items";

export default function ItemsContainer(props) {
  const modificator = props.isAllMode
    ? `${props.containerType}-container_all-visible`
    : "";
  return (
    <div className={`${props.containerType}-container ${modificator}`}>
      {props.items && (
        <Items itemsData={props.items} itemsType={props.itemsType} />
      )}
      {props.filler}
    </div>
  );
}
