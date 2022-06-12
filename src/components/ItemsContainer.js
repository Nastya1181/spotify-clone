export default function ItemsContainer(props) {
  let modificator = props.isAllMode
    ? `${props.containerType}-container_all-visible`
    : "";
  return (
    <div className={`${props.containerType}-container ${modificator}`}>
      {props.children}
    </div>
  );
}
