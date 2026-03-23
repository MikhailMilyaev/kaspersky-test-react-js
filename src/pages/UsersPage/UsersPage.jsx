import { useState, useMemo } from 'react';
import { useUsers } from '../../context/UserContext';
import { useDebounce } from '../../hooks/useDebounce';
import Loader from '../../components/Loader/Loader';
import UserModal from '../../components/UserModal/UserModal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const { users, isLoading, addUser, deleteUser } = useUsers();
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });
  const [highlightedUserId, setHighlightedUserId] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredUsers = useMemo(() => {
    let result = [...users].filter(user =>
      user.fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      user.phone.includes(debouncedSearchTerm)
    );

    result.sort((a, b) => {
      const valA = a[sortConfig.key]?.toString().toLowerCase() || '';
      const valB = b[sortConfig.key]?.toString().toLowerCase() || '';
      
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, debouncedSearchTerm, sortConfig]);

  const handleAddUser = (userData) => {
    const newId = addUser(userData);
    setIsAddModalOpen(false);
    
    setHighlightedUserId(newId);
    setTimeout(() => setHighlightedUserId(null), 2000);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(userToDelete.id);
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className={styles['users']}>
      <div className="container">
        <h1 className={styles['users__title']}>Список пользователей</h1>
        
        <div className={styles['users__controls']}>
          <input
            type="text"
            placeholder="Поиск по имени, email или телефону..."
            className={styles['users__search']}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => setIsAddModalOpen(true)} 
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
                  <th className={styles['users__table-th']} onClick={() => requestSort('account')}>
                    Аккаунт {sortConfig.key === 'account' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('email')}>Email</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('group')}>Группа</th>
                  <th className={styles['users__table-th']} onClick={() => requestSort('phone')}>Телефон</th>
                  <th className={`${styles['users__table-th']} ${styles['users__table-th--actions']}`}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr 
                      key={user.id} 
                      className={`${styles['users__table-tr']} ${highlightedUserId === user.id ? styles['users__table-tr--highlight'] : ''}`}
                    >
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
                      <td className={`${styles['users__table-td']} ${styles['users__table-td--actions']}`}>
                        <button 
                          onClick={() => openDeleteModal(user)} 
                          className={styles['users__delete-btn']}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles['users__no-data']}>
                      {searchTerm ? 'Ничего не найдено' : 'Список пуст'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <UserModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={handleAddUser}
        />

        <DeleteConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          userName={userToDelete?.fullName}
        />
      </div>
    </div>
  );
};

export default UsersPage;