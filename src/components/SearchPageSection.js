import ItemsCategorySection from "./ItemsCategorySection";
import AllLink from "./AllLink";
import ItemsContainer from "./ItemsContainer";
import Items from "./Items";

export default function SearchPageSection(props) {
    function contentHandler() {
        let content;
        if (!props.items) {
          content = props.loading ? (
            <div>Loading...</div>
          ) : (
            <div>Начните поиск</div>
          );
        } else {
          content = props.next ? (
            <Items itemsData={props.items} itemsType={props.itemsType} />
          ) : (
            <div>Ничего не найдено</div>
          );
        }
        return content;
      }

   return  <ItemsCategorySection title={props.title}>
    <AllLink next={props.next} itemsType={props.itemsType} />
    <ItemsContainer isAllMode={false} containerType={props.containerType}>
      {contentHandler()}
    </ItemsContainer>
  </ItemsCategorySection>
}