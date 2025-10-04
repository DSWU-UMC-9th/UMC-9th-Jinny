import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const { movieId } = useParams();

  return <h1>{movieId}번 영화 페이지</h1>;
};

export default MoviesPage;
