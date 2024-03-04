import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.Header}>
    <nav className={styles.Nav}>
      <ul className={styles.List}>
        <li>
          <NavLink
            exact="true"
            to="/goit-react-woolf-hw-05-movies/"
            className={styles.NavLink}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/goit-react-woolf-hw-05-movies/movies"
            className={styles.NavLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
