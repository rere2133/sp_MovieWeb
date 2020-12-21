import { useEffect, useState } from "react";
import "./App.css";
import MContainer from "./components/MContainer";

function App() {
  const [comingMovies, setComingMovies] = useState("");
  const [nowMovies, setNowMovies] = useState("");
  const [favorMovies, setFavorMovies] = useState([]);
  const [getLike, setGetLike] = useState(0);

  useEffect(() => {
    const getComingMovieFromAPI = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=b9b45b6a44b88a0c874ff500038859ee`;
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        setComingMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getComingMovieFromAPI();

    const getNowMovieFromAPI = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=b9b45b6a44b88a0c874ff500038859ee`;
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        setNowMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getNowMovieFromAPI();
  }, []);
  // useEffect(() => {
  //   setFavorMovies(JSON.parse(localStorage.getItem("MovieFavor")) || []);
  // }, []);

  return (
    <>
      <header className="mb-5">
        <div className="container">
          <h1>Movie Website</h1>
        </div>
      </header>
      <main className="container">
        <MContainer
          title="我喜愛的電影"
          movieData={favorMovies}
          favorMovies={favorMovies}
          setFavorMovies={setFavorMovies}
        />
        <MContainer title="NOW PLAYING" movieData={nowMovies} />
        <MContainer title="COMING SOON" movieData={comingMovies} />
      </main>
    </>
  );
}

export default App;
