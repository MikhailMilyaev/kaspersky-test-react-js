import { NavLink } from 'react-router-dom';
import { publicRoutes } from '../../routes/index';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles['navbar']}>
      <div className="container">
        <nav className={styles['navbar__container']}>
          <div className={styles['navbar__logo']}>Kaspersky Test</div>
          
          <ul className={styles['navbar__list']}>
            {publicRoutes
              .filter(route => route.name)
              .map(route => (
                <li key={route.path} className={styles['navbar__item']}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles['navbar__link']} ${styles['navbar__link_active']}`
                        : styles['navbar__link']
                    }
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;