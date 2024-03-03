import { useState, useEffect } from 'react';
import api from '../services/moviesApi';
import Button from '../components/Button';
import MoviesGallery from '../components/MoviesGallery';
import Loader from '../components/Loader';
import Notification from '../components/Notification';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoader(true);
        const movies = await api.getTrendingMovies(page);
        setMovies(movies);
        setError('');
        setLoader(false);
      } catch (err) {
        setError(err);
        setLoader(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleOnButtonClick = newPage => {
    setLoader(true);
    api
      .getTrendingMovies(newPage)
      .then(movies => {
        setMovies(movies);
        setPage(newPage);
        setError('');
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      })
      .catch(error => setError(error))
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      {error && <Notification message="Something wrong :(" />}
      <MoviesGallery movies={movies} />
      {loader && <Loader />}
      {movies.length > 0 && (
        <>
          {page === 1 ? (
            <Button
              onClick={() => handleOnButtonClick(page - 1)}
              name={`<<< Prev page ${page - 1}`}
              disabled={page === 1}
            />
          ) : (
            <Button
              onClick={() => handleOnButtonClick(page - 1)}
              name={`<<< Prev page №${page - 1}`}
            />
          )}
          <Button
            onClick={() => handleOnButtonClick(page)}
            name={`Current page №${page}`}
            disabled={loader}
          />
          <Button
            onClick={() => handleOnButtonClick(page + 1)}
            name={`Next page ${page + 1} >>>`}
            disabled={loader}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
