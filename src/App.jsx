import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Genres } from "./pages/Genres";
import { NavBar } from "./components/NavBar";
import { MostPopular } from "./pages/MostPopular";
import { WatchAnime } from "./pages/WatchAnime";
import { SearchAnime } from "./pages/SearchAnime";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { RecentAnime } from "./pages/RecentAnime";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";
import { Auth } from "./pages/Auth";
import { User } from "./pages/User";
import { UserProfile } from "./pages/UserProfile";
import { UserWatchList } from "./pages/UserWatchList";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  const routes = [
    "^/$",
    "^/popular/page/\\d+$",
    "^/genres",
    "^/watch/\\d+$",
    "^/search",
    "^/recent/page/\\d+$",
    "^/user",
  ];

  const isShowed = routes.some((route) =>
    new RegExp(route).test(location.pathname)
  );

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.backgroundColor = "#18181b";
    localStorage.setItem("theme", "dark");
  });

  return (
    <>
      {isShowed ? <NavBar /> : ""}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/popular/page/:id" element={<MostPopular />}></Route>
        <Route path="/genres" element={<Genres />}></Route>
        <Route path="/watch/:id" element={<WatchAnime />}></Route>
        <Route path="/search" element={<SearchAnime />}></Route>
        <Route path="/recent/page/:id" element={<RecentAnime />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/user" element={<User />}>
          <Route index path="profile" element={<UserProfile />}></Route>
          <Route path="watch-list" element={<UserWatchList />}></Route>
        </Route>
      </Routes>
      {isShowed ? <Footer /> : ""}
      <ScrollToTopButton />
    </>
  );
}

export default App;
