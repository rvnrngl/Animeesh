import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/popular/page/:id" element={<MostPopular />}></Route>
          <Route path="/genres" element={<Genres />}></Route>
          <Route path="/watch/:title" element={<WatchAnime />}></Route>
          <Route path="/search" element={<SearchAnime />}></Route>
          <Route path="/recent/page/:id" element={<RecentAnime />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </Router>
    </>
  );
}

export default App;
