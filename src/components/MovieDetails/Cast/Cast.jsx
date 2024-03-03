import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/moviesApi';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await api.getMovieById(movieId, '/credits');
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <ul className={styles.Cast}>
      {cast &&
        cast.map(actor => {
          const { profile_path: img, id, name, character } = actor;
          return (
            <li key={id} className={styles.ListItem}>
              <p className={styles.Name}>{name}</p>
              <p className={styles.Character}>{character}</p>
              <img
                src={
                  img
                    ? `https://image.tmdb.org/t/p/w200${img}`
                    : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                }
                alt={name}
                width="200px"
                className={styles.Image}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default Cast;
