import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/page";
import Detail from "./pages/Detail/page";
import Movie from "./pages/Movie/page";
import TvSeries from "./pages/TvSeries/page";
import Trending from "./pages/Trending/page";
import Layout from "./layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv-series" element={<TvSeries />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
