import { useState } from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit({ query });
    setQuery('');
  };

  return (
    <div className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>Search</span>
        </button>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleInputChange}
          value={query}
        />
      </form>
    </div>
  );
};

export default Searchbar;
