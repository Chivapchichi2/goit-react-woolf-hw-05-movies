import MoviesGalleryItem from './MoviesGalleryItem';
import styles from './MoviesGallery.module.css';

const MoviesGallery = ({ movies }) => (
  <ul className={styles.MoviesGallery}>
    {movies.map(
      ({ id, poster_path: posterPath, vote_average: voteAverage, title }) => (
        <MoviesGalleryItem
          key={id}
          poster={posterPath}
          vote={voteAverage}
          title={title}
          id={id}
        />
      )
    )}
  </ul>
);

export default MoviesGallery;
