import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });

  useEffect(() => {
    setIsLoading(true);
    
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        
        setTimeout(() => {
          setUsers(data.users);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles['users']}>
      <div className="container">
        <h1 className={styles['users__title']}>Список пользователей</h1>
        
        <input
          type="text"
          placeholder="Поиск по имени или email..."
          className={styles['users__search']}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles['users__table-wrapper']}>
            <table className={styles['users__table']}>
              <thead>
                <tr>
                  <th className={styles['users__table-th']} onClick={() => requestSort('fullName')}>Полное имя</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('account')}>Учетная запись</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('email')}>Email</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('group')}>Группа</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('phone')}>Телефон</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id} className={styles['users__table-tr']}>
                      <td className={styles['users__table-td']}>{user.fullName}</td>
                      <td className={styles['users__table-td']}>{user.account}</td>
                      <td className={styles['users__table-td']}>
                        <a href={`mailto:${user.email}`} className={styles['users__link']}>
                          {user.email}
                        </a>
                      </td>
                      <td className={styles['users__table-td']}>
                        <span className={styles['users__group-badge']}>{user.group}</span>
                      </td>
                      <td className={styles['users__table-td']}>
                        <a href={`tel:${user.phone.replace(/\D/g, '')}`} className={styles['users__link']}>
                          {user.phone}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      Пользователи не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;