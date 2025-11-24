import React, { useEffect, useState } from "react";
import "./Slider.css"; // import CSS

const API_KEY = "f43ec82a5f24fe6190891894b7436c7a";

export default function Slider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const data = await res.json();

      const mapped = data.results.slice(0, 4).map((movie) => ({
        id: movie.id,
        image: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
        title: movie.title,
        overview: movie.overview,
      }));

      setSlides(mapped);
    }

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return <div>Loading...</div>;

  return (
    <div className="slider-container">
      <div
        className="slide"
        style={{ backgroundImage: `url(${slides[index].image})` }}
      >
        <div className="slide-info">
          <h2 className="slide-title">{slides[index].title}</h2>
          <p className="slide-overview">{slides[index].overview}</p>
        </div>

        <button className="play-btn">▶ Play</button>
      </div>
    </div>
  );
}