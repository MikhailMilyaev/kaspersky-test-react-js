import styles from './GroupUserItem.module.css';

const GroupUserItem = ({ user }) => {
  const initial = user.fullName ? user.fullName.charAt(0).toUpperCase() : '?';

  return (
    <div className={styles['card']}>
      <div className={styles['avatar']}>{initial}</div>
      <div className={styles['info']}>
        <h3 className={styles['name']}>{user.fullName}</h3>
        <p className={styles['role']}>{user.account}</p>
        <a href={`mailto:${user.email}`} className={styles['email']}>{user.email}</a>
      </div>
    </div>
  );
};

export default GroupUserItem;