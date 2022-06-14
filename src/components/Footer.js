export default function Footer(props) { //Todo: <мне> <Добавить добавление футера по клику по треку>
  return (
    <footer className="footer spotify-app__footer">
      <div className="footer__track">
        <div className="track-main-attrs">
          <img
            className="track-main-attrs__cover"
            src="imgs/current-song.jfif"
            alt="song cover"
          />
          <div className="track-main-attrs__labels">
            <a href="/" className="track-main-attrs__name link link_white ">
              Unstoppable
            </a>
            <br />
            <a href="/" className="track-main-attrs__artists link">
              Sia
            </a>
          </div>
        </div>
        <div className="footer__svgs-box">
          <svg
            className="footer__svg footer__svg_green"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
          </svg>
          <svg
            className="footer__svg"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor" fill-rule="evenodd">
              <path
                d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                fill-rule="nonzero"
              ></path>
              <path d="M10 8h4v3h-4z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="footer__audio-controls">
        <audio className="footer__audio" controls>
          <source className="footer__audio-src" src="check.mp3" />
        </audio>
      </div>
      <div className="footer__svgs-box">
        <svg
          className="footer__svg"
          height="16"
          width="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 013.5 1h9a2.5 2.5 0 010 5h-9A2.5 2.5 0 011 3.5zm2.5-1a1 1 0 000 2h9a1 1 0 100-2h-9z"></path>
        </svg>
        <svg
          className="footer__svg"
          height="16"
          width="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15h-6.5A1.75 1.75 0 016 13.25V2.75zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25h-6.5zm-6 0a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 010 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z"></path>
          <path d="M13 10a2 2 0 11-4 0 2 2 0 014 0zm-1-5a1 1 0 11-2 0 1 1 0 012 0z"></path>
        </svg>
      </div>
    </footer>
  );
}
