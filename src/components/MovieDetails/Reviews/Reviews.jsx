import { useState, useEffect } from 'react';
import Notification from '../../Notification';
import api from '../../../services/moviesApi';
import styles from './Reviews.module.css';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.getMovieById(movieId, '/reviews');
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <ul className={styles.Reviews}>
      {!reviews && <Notification message="There are no reviews" />}
      {reviews &&
        reviews.map(review => {
          const { author, content, id } = review;
          return (
            <li key={id} className={styles.ListItem}>
              <p className={styles.Author}>{`Author: ${author}`}</p>
              <p>{content}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default Reviews;
