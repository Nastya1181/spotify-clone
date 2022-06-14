import ItemsCategorySection from "./ItemsCategorySection";
import ItemsContainer from "./ItemsContainer";

export default function ObservedSection(props) {
  const filler = <>{<div ref={props.obsRef}>{props.next ? "loading..." : ""}</div>}</>;
  return (
    <ItemsCategorySection title={`${props.title}`}>
      <ItemsContainer
        isAllMode={true}
        containerType={props.containerType}
        items={props.items}
        itemsType={props.itemsType}
        filler={filler}
      ></ItemsContainer>
    </ItemsCategorySection>
  );
}
