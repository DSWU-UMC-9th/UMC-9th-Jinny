import axios from "axios";
import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // 1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);

  // 3. 페이지 처리
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [page, category]);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-500 text-xl">❌ 에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="bg-gray-700 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {"<"}
        </button>
        <span className="text-lg font-semibold">{page} 페이지</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-700 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {">"}
        </button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="py-10 grid gap-4 place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MoviePage;
