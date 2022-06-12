import { Link } from "react-router-dom";

export default function AllLink(props) {
  let modificator = props.next ? "" : "items-category__all-link_hidden";
  return (
    <Link
      to={`${props.itemsType}All`}
      className={`items-category__all-link ${modificator}`}
    >
      все
    </Link>
  );
}
