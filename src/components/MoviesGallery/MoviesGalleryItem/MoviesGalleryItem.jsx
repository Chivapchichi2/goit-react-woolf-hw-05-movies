import { Link, useLocation } from 'react-router-dom';
import styles from './MoviesGalleryItem.module.css';

const MoviesGalleryItem = ({ poster, title, vote, id }) => {
  const location = useLocation();

  return (
    <li className={styles.MoviesGalleryItem}>
      <Link to={`/movies/${id}`} state={location}>
        <img
          src={
            poster
              ? `https://image.tmdb.org/t/p/w300${poster}`
              : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
          }
          alt={title}
          className={styles.MoviesGalleryItem__image}
        />
        <h2 className={styles.MoviesGalleryItem__title}>{title}</h2>
        <span className={styles.MoviesGalleryItem__vote}>{vote}</span>
      </Link>
    </li>
  );
};

export default MoviesGalleryItem;
