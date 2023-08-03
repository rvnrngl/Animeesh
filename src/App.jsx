import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Genres } from "./pages/Genres";
import { NavBar } from "./components/NavBar";
import { MostPopular } from "./pages/MostPopular";
import { WatchAnime } from "./pages/WatchAnime";
import { SearchAnime } from "./pages/SearchAnime";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          {/* <Route exact path="/Animeesh/" element={<Home />}></Route> */}
          <Route path="/popular" element={<MostPopular />}></Route>
          <Route path="/genres" element={<Genres />}></Route>
          <Route path="/watch" element={<WatchAnime />}></Route>
          <Route path="/search" element={<SearchAnime />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
