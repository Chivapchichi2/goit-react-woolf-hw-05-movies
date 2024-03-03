import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/moviesApi';
import Button from '../components/Button';
import MoviesGallery from '../components/MoviesGallery';
import Loader from '../components/Loader';
import Notification from '../components/Notification';
import SearchBar from '../components/Searchbar';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('query');
    const searchPage = parseInt(searchParams.get('page')) || 1;

    if (searchQuery) {
      setQuery(searchQuery);
      setPage(searchPage);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        setLoader(true);
        try {
          const fetchedMovies = await api.getByQueryMovies(query, page);
          setMovies(fetchedMovies);
          navigate(`?query=${query}&page=${page}`);
        } catch (err) {
          setError(err);
        } finally {
          setLoader(false);
        }
      }
    };

    fetchMovies();
  }, [query, page, navigate]);

  const handleOnButtonClick = newPage => () => {
    setLoader(true);
    api
      .getByQueryMovies(query, newPage)
      .then(fetchedMovies => {
        setMovies(fetchedMovies);
        setPage(newPage);
        navigate(`?query=${query}&page=${newPage}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => setError(err))
      .finally(() => setLoader(false));
  };

  const handleFormData = ({ query }) => {
    setPage(1);
    setQuery(query);
    setMovies([]);
    setError('');
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
