import { useEffect, useState } from "react";
import type { Cast, MovieCredit, MovieDetail } from "../types/movie";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Cast[]>([]);

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

  useEffect(() => {
    const fetchCredit = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieCredit>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setCredits(data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchCredit();
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-500 text-xl">❌ 에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <>
          <div>
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                alt={`${movie?.title}의 이미지`}
                className="h-[350px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-tranparent"></div>

              <div className="absolute top-0 text-white w-1/2 px-4 py-8 flex flex-col gap-2">
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

          <div>
            <p className="font-bold text-2xl p-4">감독/출연</p>
            <div className="flex flex-wrap gap-3">
              {credits.slice(0, 20).map((credit) => (
                <div
                  key={credit.id}
                  className="w-[200px] flex flex-col items-center justify-start gap-2 mt-5"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${credit.profile_path}`}
                    alt={`${credit.name}의 이미지`}
                    className="size-30 rounded-full"
                  />
                  <p className="font-semibold text-lg">{credit.name}</p>
                  <p className="font-sm text-sm leading-[5px]">{credit.original_name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailPage;
