import { Link } from "react-router-dom";
export default function Card(props) {
  const artists =
    typeof props.artists === "string"
      ? props.artists
      : getArtists(props.artists); //interface isearchitem

  function getArtists(artistsArr) {
    let artistsStr = "";
    artistsArr.forEach((artist) =>
      artistsStr.length === 0
        ? (artistsStr += artist.name)
        : (artistsStr += ", " + artist.name)
    );
    return artistsStr;
  }

  return (
    <div className="card" id={props.id}>
      <Link to={`/playlist/${props.id}`}>
        <img className="card__img" src={props.imgUrl} alt="card img" />
      </Link>
      <div className="card__title">{props.name}</div>
      <div className="card__artists">{artists}</div>
    </div>
  );
}
