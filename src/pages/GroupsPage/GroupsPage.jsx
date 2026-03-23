import { useState, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import GroupSelect from '../../components/GroupSelect/GroupSelect';
import GroupUsersList from '../../components/GroupUsersList/GroupUsersList';
import styles from './GroupsPage.module.css';

const GroupsPage = () => {
  const [users] = useLocalStorage('kaspersky_users', []);
  const [selectedGroup, setSelectedGroup] = useState('Все группы');

  const availableGroups = useMemo(() => {
    const userGroups = users.map(u => u.group);
    
    const uniqueGroups = new Set([
      'Все группы',
      'Руководство', 
      'IT-отдел', 
      'Менеджеры', 
      'Без группы',
      ...userGroups
    ]);

    return Array.from(uniqueGroups);
  }, [users]);

  const filteredUsers = useMemo(() => {
    if (selectedGroup === 'Все группы') return users;
    return users.filter(user => user.group === selectedGroup);
  }, [users, selectedGroup]);

  return (
    <div className={styles['groups-page']}>
      <div className="container">
        <div className={styles['header']}>
          <h1 className={styles['title']}>Группы пользователей</h1>
          <GroupSelect 
            groups={availableGroups} 
            selected={selectedGroup} 
            onChange={setSelectedGroup} 
          />
        </div>
        
        <GroupUsersList 
          users={filteredUsers} 
          selectedGroup={selectedGroup} 
        />
      </div>
    </div>
  );
};

export default GroupsPage;