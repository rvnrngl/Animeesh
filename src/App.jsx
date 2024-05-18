import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Genres } from "./pages/Genres";
import { MostPopular } from "./pages/MostPopular";
import { SearchAnime } from "./pages/SearchAnime";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { RecentAnime } from "./pages/RecentAnime";
import { NotFound } from "./components/NotFound";
import { Auth } from "./pages/Auth";
import { User } from "./pages/User";
import { UserProfile } from "./pages/UserProfile";
import { UserWatchList } from "./pages/UserWatchList";
import { StreamAnime } from "./pages/StreamAnime";
import { HomeLayout } from "./Layout/HomeLayout";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<HomeLayout />}
          errorElement={<NotFound />}
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="popular/page/:id" element={<MostPopular />}></Route>
          <Route path="genres" element={<Genres />}></Route>
          <Route path="watch/:id" element={<StreamAnime />}></Route>
          <Route path="search" element={<SearchAnime />}></Route>
          <Route path="recent/page/:id" element={<RecentAnime />}></Route>
          <Route path="user" element={<User />}>
            <Route index path="profile" element={<UserProfile />}></Route>
            <Route path="watch-list" element={<UserWatchList />}></Route>
          </Route>
        </Route>
        <Route path="auth" element={<Auth />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ScrollToTopButton />
    </>
  );
}

export default App;
