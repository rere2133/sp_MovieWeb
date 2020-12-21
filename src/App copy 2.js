import { useEffect, useState } from "react";
import "./App.css";
import MContainer from "./components/MContainer";
import Movie from "./components/Movie";

const getComingMovieFromAPI = async () => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=b9b45b6a44b88a0c874ff500038859ee`;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  const comingMovie = data.results;
  return { comingMovie };
};

const getNowMovieFromAPI = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=b9b45b6a44b88a0c874ff500038859ee`;
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  const nowMovies = data.results;
  return { nowMovies };
};

function App() {
  const [movieData, setMovieData] = useState({
    comingMovies: [],
    nowMovies: [],
  });
  const fetchData = async () => {
    setMovieData((prevState) => ({
      ...prevState,
    }));
    const [comingMovies, nowMovies] = await Promise.all([
      getComingMovieFromAPI(),
      getNowMovieFromAPI(),
    ]);
    setMovieData({
      ...comingMovies,
      ...nowMovies,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(movieData);
  return (
    <>
      <header>
        <div className="container">
          <h1>Movie Website</h1>
        </div>
      </header>
      <main className="container">
        <h2>Now Playing</h2>
        <MContainer title="Now Playing" />
        <h2>Movie You Like</h2>
        <MContainer title="Movie You Like" />
        <section className="movie-part">
          {/* {(comingMovies ? comingMovies : []).map((item) => {
            return <Movie item={item} key={item.id} />;
          })} */}
        </section>
      </main>
    </>
  );
}

export default App;
