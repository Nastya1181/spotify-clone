import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import useObserverRefetch from "../hooks/useObserverRefetch";
import ObservedSection from "./ObservedSection";

export default function SearchItemsAllPage(props) {
  //Todo: <мне> <вынести общую логику с PlaylistTracksPage, избавитсья от ошибок линтера (про зависимости в useEffect)>
  const { data, loading, refetch } = useFetch(props.data[props.itemsType].next);
  const [currItems, setCurrItems] = useState(null);
  const ref = useObserverRefetch(
    data?.[props.itemsType].next,
    loading,
    refetch
  );
  useEffect(() => {
    if (data) {
      setCurrItems((currItems) =>
      currItems ? [...currItems, ...data[props.itemsType].items] : data[props.itemsType].items
    );
    }
  }, [data]);

  useEffect(() => {
    return () => setCurrItems(null);
  }, []);

  return (
    <ObservedSection
      title={props.title}
      items={currItems}
      next={data?.[props.itemsType].next}
      itemsType={props.itemsType}
      obsRef={ref}
      containerType={props.containerType}
    />
  );
}
