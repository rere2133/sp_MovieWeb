import React, { useEffect, useState } from "react";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdDateRange,
  MdAccessTime,
} from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      margin: "0 auto",
      width: "85%",
    },
    "@media (max-width: 375px)": {
      margin: "0 auto",
      padding: "3rem 0",
      width: "90%",
    },
  },
  paper: {
    borderRadius: "2px",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    background: "#333",
    display: "flex",
    overflow: "hidden",
    color: "#f8f8f8",
    padding: 0,

    "@media (max-width: 375px)": {
      display: "block",
      padding: 0,
    },
  },
}));

function Movie(props) {
  const { movie, likeNum, setLikeNum } = props;
  const classes = useStyles();
  const [like, setLike] = useState(false);
  const [likeList, setLikeList] = useState([]);
  const [open, setOpen] = useState(false);
  const [movieDetail, setMovieDetail] = useState({
    genres: [],
    runtime: 0,
  });

  //modal
  const handleOpen = () => {
    setOpen(true);
    getMovieDetailFromAPI();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getMovieDetailFromAPI = async () => {
    setMovieDetail((prevState) => ({
      ...prevState,
    }));
    const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=b9b45b6a44b88a0c874ff500038859ee`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    setMovieDetail({
      genres: data.genres,
      runtime: data.runtime,
    });
  };

  const { genres, runtime } = movieDetail;
  const {
    id,
    title,
    release_date,
    poster_path,
    vote_average,
    overview,
  } = movie;

  //likeList
  const addFavorite = () => {
    let MovieFavor = [];
    if (localStorage.getItem("MovieFavor"))
      MovieFavor = JSON.parse(localStorage.getItem("MovieFavor"));
    if (MovieFavor.map((item) => item.id).indexOf(id) > -1) {
      setLike(!like);
      MovieFavor = MovieFavor.filter((item) => {
        return item.id !== id;
      });
    } else {
      let obj = {
        id,
        title,
        release_date,
        poster_path,
        vote_average,
        overview,
      };
      MovieFavor.unshift(obj);
    }
    localStorage.setItem("MovieFavor", JSON.stringify(MovieFavor));
    // console.log("MovieFavor", MovieFavor);
    setLikeNum(JSON.parse(localStorage.getItem("MovieFavor").length));
  };
  const favorSave = () => {
    let newMovieFavor = localStorage.getItem("MovieFavor") || "[]";
    newMovieFavor = JSON.parse(newMovieFavor);
    const newLike = newMovieFavor.map((item) => item.id);
    setLikeList(newLike);
  };
  useEffect(() => {
    favorSave();
  }, [likeNum]);

  return (
    <>
      <div
        className="movie-part"
        onClick={() => {
          handleOpen();
        }}
      >
        <div className="movie-img">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt=""
            draggable="false"
          />
          <div
            className={`movie-like ${
              (likeList.some((item) => item === id) || like) &&
              "active-movie-like"
            }`}
            onClick={(e) => {
              // handleLike();
              e.stopPropagation();
              addFavorite();
            }}
          >
            {likeList.some((item) => item === id) || like ? (
              <MdFavorite className="like-icon active-icon" />
            ) : (
              <MdFavoriteBorder className="like-icon" />
            )}
          </div>
        </div>
        <h2>{title}</h2>
        <p>{release_date}</p>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="modal-img">
              <img
                className="modal-poster"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
              ></img>
              <div className="overlay"></div>
            </div>

            <div className="modal-body">
              <div className="modal-title">
                <h2>{title}</h2>
                <p>
                  <span className="score">{vote_average}</span> /10
                </p>
              </div>
              <div className="tag">
                {genres.map((item) => {
                  return <div key={item.id}>{item.name}</div>;
                })}
              </div>
              <div className="movie-detail mt-3">
                <MdDateRange className="mr-2" style={{ height: "22px" }} />
                {release_date}
              </div>
              <div className="movie-detail mb-3">
                <MdAccessTime className="mr-2" style={{ height: "22px" }} />
                {parseInt(runtime / 60)}hr {runtime % 60}min
              </div>
              <p>{overview}</p>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default Movie;
