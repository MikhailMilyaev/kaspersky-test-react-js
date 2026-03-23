import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <section className={styles['welcome']}>
      <div className={styles['welcome__content']}>
        <h1 className={styles['welcome__title']}>
          Kaspersky <span>Admin Panel</span>
        </h1>
        <p className={styles['welcome__text']}>
          Эффективный инструмент для управления пользователями и группами вашей организации. 
        </p>
        <Link to={PATHS.USERS} className={styles['welcome__button']}>
          Начать работу
        </Link>
      </div>
    </section>
  );
};

export default WelcomePage;