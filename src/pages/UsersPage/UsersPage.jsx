import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Loader from '../../components/Loader/Loader';
import UserModal from '../../components/UserModal/UserModal';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const [users, setUsers] = useLocalStorage('kaspersky_users', []);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: '', account: '', email: '', group: 'Без группы', phone: '' });

  useEffect(() => {
    if (users.length === 0) {
      setIsLoading(true);
      fetch('/db.json')
        .then(res => res.json())
        .then(data => {
          setTimeout(() => {
            setUsers(data.users);
            setIsLoading(false);
          }, 800);
        })
        .catch(() => setIsLoading(false));
    }
  }, [users.length, setUsers]);

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredUsers = useMemo(() => {
    let result = [...users].filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchTerm, sortConfig]);

  const deleteUser = (id) => {
    if (window.confirm('Удалить пользователя?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleAddUser = (userData) => {
    const newUserWithId = { 
      ...userData, 
      id: crypto.randomUUID() 
    };
    setUsers([newUserWithId, ...users]);
    setIsModalOpen(false);
  };

  return (
    <div className={styles['users']}>
      <div className="container">
        <h1 className={styles['users__title']}>Список пользователей</h1>
        
        <div className={styles['users__controls']}>
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            className={styles['users__search']}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => setIsModalOpen(true)} 
            className={styles['users__add-btn']}
          >
            Добавить пользователя
          </button>
        </div>

        {isLoading ? <Loader /> : (
          <div className={styles['users__table-wrapper']}>
            <table className={styles['users__table']}>
              <thead>
                <tr>
                  <th className={styles['users__table-th']} onClick={() => requestSort('fullName')}>
                    Имя {sortConfig.key === 'fullName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('account')}>Аккаунт</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('email')}>Email</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('group')}>Группа</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('phone')}>Телефон</th>
                  <th className={styles['users__table-th']}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id} className={styles['users__table-tr']}>
                      <td className={styles['users__table-td']}>{user.fullName}</td>
                      <td className={styles['users__table-td']}>{user.account}</td>
                      <td className={styles['users__table-td']}>
                        <a href={`mailto:${user.email}`} className={styles['users__link']}>{user.email}</a>
                      </td>
                      <td className={styles['users__table-td']}>
                        <span className={styles['users__group-badge']}>{user.group}</span>
                      </td>
                      <td className={styles['users__table-td']}>
                        <a href={`tel:${user.phone.replace(/\D/g, '')}`} className={styles['users__link']}>{user.phone}</a>
                      </td>
                      <td className={styles['users__table-td']}>
                        <button onClick={() => deleteUser(user.id)} className={styles['users__delete-btn']}>✕</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Пользователи не найдены</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <UserModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleAddUser}
          newUser={newUser}
          setNewUser={setNewUser}
        />
      </div>
    </div>
  );
};

export default UsersPage;