import { useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Aside(props) {
  const { data, loading } = useFetch(
    "https://api.spotify.com/v1/browse/featured-playlists"
  );
  const memoizedItems = useMemo(() => createItems(data), [data]);

  function createItems(data) {
    return (
     data?.playlists.items.map((item) => {
        return (
          <li className="side-menu__item" key={item.id}>
            <Link
              to={`playlist/${item.id}`}
              className="side-menu__link link recent-playlists__link"
              id={item.id}
            >
              {item.name}
            </Link>
          </li>
        );
      })
    );
  }
  return (
    <aside className="side-menu spotify-app__side-menu ">
      <div className="side-menu__container">
        <Link to="/">
          <img
            src="imgs/spotify-logo.svg"
            className="side-menu__logo"
            alt="logo"
          />
        </Link>
        <nav className="side-menu__nav">
          <ul className="side-menu__list">
            <li className="side-menu__item">
              <Link
                to="/"
                className="side-menu__link link link_white"
                id="searchPage"
              >
                <svg
                  className="side-menu__svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"
                  ></path>
                  <path
                    fill="white"
                    d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"
                  ></path>
                </svg>
                <div className="side-menu__link-text">Поиск</div>
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="side-menu__list recent-playlists">
          {memoizedItems}
          {loading && <>loading...</>}
        </ul>
        <a
          className="side-menu__link  side-menu__link_last-link link"
          href="./imgs/download.svg"
          download
        >
          <svg className="side-menu__svg" viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 100 18 9 9 0 000-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path>
            <path d="M12 6.05a1 1 0 011 1v7.486l1.793-1.793a1 1 0 111.414 1.414L12 18.364l-4.207-4.207a1 1 0 111.414-1.414L11 14.536V7.05a1 1 0 011-1z"></path>
          </svg>
          <span>Установить приложение</span>
        </a>
      </div>
    </aside>
  );
}
