import { Link, Outlet } from "react-router-dom";
import Aside from "./Aside";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  return (
    <>
      <Header
        searchQ={props.searchQ}
        setSearchQ={props.setSearchQ}
        tracksData={props.tracksData}
        setTracksData={props.setTracksData}
      />
      <Aside />
      <main className="main">
        <div className="main__wrapper">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
