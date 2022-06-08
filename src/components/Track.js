export default function Track(props) {
  const getArtists = (artistsArr) => {
    let artistsStr = "";
    artistsArr.forEach((artist) =>
      artistsStr.length === 0
        ? (artistsStr += artist["name"])
        : (artistsStr += ", " + artist["name"])
    );
    return artistsStr;
  };

  const getMinutesDuration = (ms) => {
    let seconds = ms * 0.001;
    let minutes = Math.floor(seconds / 60);
    let secondsRemainder = Math.ceil(seconds % 60);
    if (secondsRemainder < 10 && secondsRemainder) {
      secondsRemainder = "0" + secondsRemainder;
    }
    return `${minutes}:${secondsRemainder}`;
  };

  let artists;
  let minutesDuration = getMinutesDuration(props.minutesDuration);
  typeof props.artists === "string"
    ? (artists = props.artists)
    : (artists = getArtists(props.artists));

  return (
    <div className="tracks-container__track" id={props.id}>
      <div className="track-main-attrs">
        <img
          className="track-main-attrs__cover"
          src={props.imgUrl}
          alt="song cover"
        />
        <div className="track-main-attrs__labels">
          <a href="#" className="track-main-attrs__name link link_white">
            {props.name}
          </a>
          <br />
          <a href="#" className="track-main-attrs__artists link">
            {artists}
          </a>
        </div>
      </div>
      <div className="tracks-container__track-duration">{minutesDuration}</div>
    </div>
  );
}
