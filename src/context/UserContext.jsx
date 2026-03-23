import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('kaspersky_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('kaspersky_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const isInitialized = localStorage.getItem('kaspersky_data_loaded');
    
    if (!isInitialized) {
      setIsLoading(true);
      fetch('/db.json')
        .then(res => res.json())
        .then(data => {
          setTimeout(() => {
            setUsers(data.users);
            setIsLoading(false);
            localStorage.setItem('kaspersky_data_loaded', 'true');
          }, 800);
        })
        .catch(err => {
          console.error("Ошибка загрузки:", err);
          setIsLoading(false);
        });
    }
  }, []);

  const addUser = (userData) => {
    const newUser = { ...userData, id: crypto.randomUUID() };
    setUsers(prev => [newUser, ...prev]);
    return newUser.id;
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, isLoading, addUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers должен использоваться внутри UserProvider');
  }
  return context;
};