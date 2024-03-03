import classNames from 'classnames/bind';
import styles from './MovieDetails.module.css';

const cn = classNames.bind(styles);

const MovieDetails = ({
  title,
  poster,
  tagline,
  genres,
  budget,
  revenue,
  date,
  overview,
  average,
  count,
}) => {
  const genresName = genres && genres.map(g => g.name).join(', ');
  const numberWithSpaces = number =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const formattedBudget = budget && numberWithSpaces(budget);
  const formattedRevenue = revenue && numberWithSpaces(revenue);
  const vote = cn({
    Span: true,
    good: average >= 8,
    norm: average >= 5 && average < 8,
    bad: average < 5,
  });
  return (
    <article className={styles.MovieDetails}>
      <div className={styles.ImageBox}>
        <img
          src={
            poster
              ? `https://image.tmdb.org/t/p/w500${poster}`
              : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
          }
          alt={title}
          className={styles.Image}
        />
        <ul className={styles.Vote}>
          <li>
            Vote: <span className={styles.Span}>{count}</span>
          </li>
          <li>
            Rating: <span className={vote}>{average}</span>
          </li>
        </ul>
      </div>
      <section className={styles.Section}>
        <h1 className={styles.Title}>{title}</h1>
        <p className={styles.Tagline}>{tagline}</p>
        <ul className={styles.List}>
          <li>
            <span className={styles.Span}>Genres:</span> {genresName}
          </li>
          <li>
            <span className={styles.Span}>Budget:</span> {formattedBudget} $
          </li>
          <li>
            <span className={styles.Span}>Revenue:</span> {formattedRevenue} $
          </li>
          <li>
            <span className={styles.Span}>Release date:</span> {date}
          </li>
        </ul>
        <p>
          <span className={styles.Span}>Overview:</span> {overview}
        </p>
      </section>
    </article>
  );
};

export default MovieDetails;
