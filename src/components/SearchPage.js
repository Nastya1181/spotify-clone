import SearchPageSection from "./SearchPageSection";

export default function SearchPage(props) { 
  const tracksSection = <SearchPageSection title='Треки' items={props.data?.tracks.items} next={props.data?.tracks.next} itemsType="tracks" containerType='tracks' loading={props.loading}/>;
  const cardsSection = <SearchPageSection title='Плейлисты' items={props.data?.playlists.items} next={props.data?.playlists.next} itemsType="playlists" containerType='cards'  loading={props.loading}/>;
  return (
    <>
      {tracksSection} {cardsSection}
    </>
  );
}
