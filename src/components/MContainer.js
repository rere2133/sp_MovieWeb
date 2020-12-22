import React, { useEffect, useState, useMemo } from "react";
import Carousel from "react-elastic-carousel";
import Movie from "./Movie";
import { useMediaQuery } from "react-responsive";

function MContainer(props) {
  const { title, movieData, likeNum } = props;
  const [isShowM, setIsShowM] = useState(true);

  //react-rwd
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  const handleShowM = () => {
    let FavorList = localStorage.getItem("MovieFavor");
    if (title === "你喜愛的電影" && (!FavorList || FavorList === "[]")) {
      setIsShowM(false);
    } else {
      setIsShowM(true);
    }
  };

  useEffect(() => {
    handleShowM();
  }, [likeNum]);

  return (
    <>
      <h2 className="mt-5 mb-3">{title}</h2>
      <div className="movie-wrap">
        <div
          style={{ padding: " 2rem 0.5rem 1rem", color: "#aaa" }}
          hidden={`${isShowM ? "hidden" : ""}`}
        >
          <h5>目前喜好清單是空的，趕緊加入你喜愛的電影吧！</h5>
        </div>
        <Desktop>
          <Carousel itemsToScroll={3} itemsToShow={5} showEmptySlots>
            {(movieData ? movieData : []).map((item) => {
              return <Movie movie={item} key={item.id} {...props} />;
            })}
          </Carousel>
        </Desktop>
        <Tablet>
          <Carousel
            itemsToScroll={3}
            itemsToShow={4}
            itemPadding={[0, 80]}
            showEmptySlots
          >
            {(movieData ? movieData : []).map((item) => {
              return <Movie movie={item} key={item.id} {...props} />;
            })}
          </Carousel>
        </Tablet>
        <Mobile>
          <Carousel
            itemsToScroll={2}
            itemsToShow={2}
            itemPadding={[0, 75]}
            showEmptySlots
          >
            {(movieData ? movieData : []).map((item) => {
              return <Movie movie={item} key={item.id} {...props} />;
            })}
          </Carousel>
        </Mobile>
      </div>
    </>
  );
}
export default MContainer;
