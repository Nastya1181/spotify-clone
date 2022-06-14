export default function Track(props) {
  const artists =
  typeof props.artists === "string"
    ? props.artists
    : props.artists.map((artist) => artist.name).join(', ');

  const minutesDuration = getMinutesDuration(props.minutesDuration);

  function getMinutesDuration (ms) {
    const seconds = ms * 0.001;
    const minutes = Math.floor(seconds / 60);
    let secondsRemainder = Math.ceil(seconds % 60);
    if (secondsRemainder < 10 && secondsRemainder) {
      secondsRemainder = "0" + secondsRemainder;
    }
    return `${minutes}:${secondsRemainder}`;
  };

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
