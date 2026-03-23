import { useState, useMemo } from 'react';
import { useUsers } from '../../context/UserContext';
import GroupSelect from '../../components/GroupSelect/GroupSelect';
import GroupUsersList from '../../components/GroupUsersList/GroupUsersList';
import Loader from '../../components/Loader/Loader';
import styles from './GroupsPage.module.css';

const DEFAULT_GROUPS = [
  'Без группы',
  'Руководство',
  'IT-отдел',
  'Менеджеры',
  'Бухгалтерия',
  'Отдел кадров'
];

const GroupsPage = () => {
  const { users, isLoading } = useUsers();
  const [selectedGroup, setSelectedGroup] = useState('Все группы');

  const availableGroups = useMemo(() => {
    const userGroups = users.map(u => u.group);
    const uniqueGroups = new Set([
      'Все группы',
      ...DEFAULT_GROUPS,
      ...userGroups
    ]);
    return Array.from(uniqueGroups);
  }, [users]);

  const filteredUsers = useMemo(() => {
    if (selectedGroup === 'Все группы') return users;
    return users.filter(user => user.group === selectedGroup);
  }, [users, selectedGroup]);

  if (isLoading) return <Loader />;

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