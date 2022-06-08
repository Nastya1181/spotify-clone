import { Link, useLocation } from "react-router-dom";

export default function AllLink(props) {
  const location = useLocation();
  let modificator =
    props.next === "" || location.pathname !== "/"
      ? "items-category__all-link_hidden"
      : "";
  return (
    <Link
      to={`${props.itemsType}All`}
      className={`items-category__all-link ${modificator}`}
    >
      все
    </Link>
  );
}
