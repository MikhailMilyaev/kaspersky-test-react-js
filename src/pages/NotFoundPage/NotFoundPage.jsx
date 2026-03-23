import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={styles['not-found']}>
      <div className={styles['not-found__content']}>
        <h1 className={styles['not-found__title']}>
          404 <span>Упс!</span>
        </h1>
        <p className={styles['not-found__text']}>
          Похоже, эта страница решила уйти в глубокую защиту. 
          Мы не смогли её найти.
        </p>
        <Link to={PATHS.WELCOME} className={styles['not-found__button']}>
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;