import { useEffect, useState } from "react";
import type { Movie, MovieResponseDto } from "../types/movies";
import axios from "axios";

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponseDto>(
        "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );

      // console.log(data.results);
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul style={{ listStyle: "none" }}>
      {/* 옵셔널 체인 활용 */}
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoviePage;
