import GroupUserItem from '../GroupUserItem/GroupUserItem';
import styles from './GroupUsersList.module.css';

const GroupUsersList = ({ users, selectedGroup }) => {
  if (users.length === 0) {
    return (
      <div className={styles['empty']}>
        В группе «{selectedGroup}» пока никого нет. Перекати-поле...
      </div>
    );
  }

  return (
    <div className={styles['list-container']}>
      <div className={styles['stats']}>
        Найдено участников: <strong>{users.length}</strong>
      </div>
      <div className={styles['grid']}>
        {users.map(user => (
          <GroupUserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default GroupUsersList;