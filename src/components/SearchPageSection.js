import ItemsCategorySection from "./ItemsCategorySection";
import AllLink from "./AllLink";
import ItemsContainer from "./ItemsContainer";

export default function SearchPageSection(props) {
  const filler = (
    <>
      {props.loading && <div>Loading...</div>}
      {!props.next && !props.loading && !props.items?.length && <div>Ничего не найдено</div>}
    </>
  );
  console.log(props.items);
  return (
    <ItemsCategorySection title={props.title}>
      <AllLink next={props.next} itemsType={props.itemsType} />
      <ItemsContainer
        isAllMode={false}
        containerType={props.containerType}
        items={props.items}
        itemsType={props.itemsType}
        filler={filler}
      />
    </ItemsCategorySection>
  );
}
