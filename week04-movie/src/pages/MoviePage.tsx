import { useState } from "react";
import type { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;
  const [movies, isPending, isError] = useCustomFetch<MovieResponse>({ url });

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
          {movies?.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MoviePage;
