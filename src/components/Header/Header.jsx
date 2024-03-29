import { NavLink, Outlet } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
  <>
    <header className={styles.Header}>
      <nav className={styles.Nav}>
        <ul className={styles.List}>
          <li>
            <NavLink exact="true" to="/" className={styles.NavLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={styles.NavLink}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <Outlet />
  </>
);

export default Header;
