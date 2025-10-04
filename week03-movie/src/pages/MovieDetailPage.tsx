import { useEffect, useState } from "react";
import type { MovieDetail } from "../types/movie";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-500 text-xl">❌ 에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={`${movie?.title}의 이미지`}
          className="h-[300px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-tranparent"></div>

        <div className="absolute top-0 text-white w-1/2 p-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{movie?.title}</h1>

          <div className="leading-[20px]">
            <p>평균 {movie?.vote_average.toFixed(2)}</p>
            <p>{movie?.release_date.slice(0, 4)}</p>
            <p>{movie?.runtime}분</p>
          </div>

          <p className="text-xl font-semibold">{movie?.tagline}</p>

          <div className="line-clamp-4 ">{movie?.overview}</div>
        </div>

        <div className="absolute bottom-0 w-1/2 h-1 bg-gradient-to-r from-teal-500"></div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
