import { useState, useEffect, useRef } from 'react';
import {
  NavLink,
  useParams,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import api from '../services/moviesApi';
import Button from '../components/Button';
import MovieDetails from '../components/MovieDetails';
import Loader from '../components/Loader';
import Notification from '../components/Notification';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState('');
  const [loader, setLoader] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';
  const fromRef = useRef(from);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoader(true);
      try {
        const response = await api.getMovieById(movieId);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleButtonClick = () => {
    navigate(fromRef.current);
  };

  const {
    title,
    poster_path: poster,
    tagline,
    genres,
    budget,
    revenue,
    release_date: date,
    overview,
    vote_average: average,
    vote_count: count,
  } = movie;

  return (
    <>
      <Button name="<<< Go back" onClick={handleButtonClick} />
      {loader && <Loader />}
      {title ? (
        <MovieDetails
          title={title}
          poster={poster}
          tagline={tagline}
          genres={genres}
          budget={budget}
          revenue={revenue}
          date={date}
          overview={overview}
          average={average}
          count={count}
        />
      ) : (
        <Notification message="Sorry, no data :(, try again" />
      )}
      <ul className={styles.List}>
        <li>
          <NavLink
            to={{
              pathname: `/movies/${movieId}/cast`,
              state: fromRef.current,
            }}
            className={styles.NavLink}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `/movies/${movieId}/review`,
              state: fromRef.current,
            }}
            className={styles.NavLink}
          >
            Review
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
