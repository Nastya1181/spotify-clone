import { useMemo } from "react";
import Items from "./Items";
import ItemsCategorySection from "./ItemsCategorySection";
import ItemsContainer from "./ItemsContainer";

export default function ObservedSection(props) {
  function ContentHandler() {
    let content;
    if (props.items) {
      content = (
        <>
          <Items itemsData={props.items} itemsType={props.itemsType} />
          {props.next && <div ref={props.obsRef}>loading...</div>}
        </>
      );
    } else {
      content = <div>Loading...</div>;
    }
    return content;
  }

  return (
    <ItemsCategorySection title={`${props.title}`}>
      <ItemsContainer isAllMode={true} containerType={props.containerType}>
        {ContentHandler()}
      </ItemsContainer>
    </ItemsCategorySection>
  );
}
