import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/moviesApi';
import Button from '../components/Button';
import MoviesGallery from '../components/MoviesGallery';
import Loader from '../components/Loader';
import Notification from '../components/Notification';
import SearchBar from '../components/Searchbar';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        setLoader(true);
        try {
          const fetchedMovies = await api.getByQueryMovies(query, page);
          setMovies(fetchedMovies);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
          setError(err);
        } finally {
          setLoader(false);
        }
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleOnButtonClick = newPage => () => {
    setSearchParams({ query, page: newPage });
  };

  const handleFormData = ({ query }) => {
    setMovies([]);
    setError('');
    setSearchParams({ query, page: 1 });
  };

  const showButtons = !loader && movies[0];
  const disabled = true;

  return (
    <>
      <SearchBar onSubmit={handleFormData} />
      {error && <Notification message="Something wrong :(" />}
      {movies[0] && <MoviesGallery movies={movies} />}
      {query && !movies[0] && !loader && (
        <Notification message="We have not found any movies with this name" />
      )}
      {loader && <Loader />}
      {showButtons && (
        <>
          {page === 1 ? (
            <Button
              onClick={handleOnButtonClick(page - 1)}
              name={`<<< Prev page ${page - 1}`}
              disabled={disabled}
            />
          ) : (
            <Button
              onClick={handleOnButtonClick(page - 1)}
              name={`<<< Prev page №${page - 1}`}
            />
          )}
          <Button
            onClick={handleOnButtonClick(page)}
            name={`Current page №${page}`}
            disabled={disabled}
          />
          <Button
            onClick={handleOnButtonClick(page + 1)}
            name={`Next page ${page + 1} >>>`}
          />
        </>
      )}
    </>
  );
};

export default MoviesPage;
