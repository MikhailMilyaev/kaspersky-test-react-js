import { useState } from 'react';
import styles from './GroupCard.module.css';

const GroupCard = ({ groupName, users }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div 
        className={styles.header} 
        onClick={() => setIsOpen(!isOpen)}
        title="Нажми, чтобы развернуть/свернуть"
      >
        <h2 className={styles.title}>{groupName}</h2>
        <div className={styles.stats}>
          <span className={styles.count}>{users.length}</span>
          <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.content}>
          {users.length > 0 ? (
            <ul className={styles.list}>
              {users.map(user => (
                <li key={user.id} className={styles.item}>
                  <span className={styles.userName}>{user.fullName}</span>
                  <span className={styles.userRole}>{user.account}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>В этой группе пока нет пользователей</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupCard;