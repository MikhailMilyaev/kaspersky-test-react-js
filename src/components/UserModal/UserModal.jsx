import { useState } from 'react';
import styles from './UserModal.module.css';

const UserModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '', account: '', email: '', group: 'Без группы', phone: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const onlyNums = value.replace(/[^\d+]/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyNums }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.phone.length < 11) {
      alert('Введите корректный номер телефона (минимум 11 цифр)');
      return;
    }

    onSave(formData);
    setFormData({ fullName: '', account: '', email: '', group: 'Без группы', phone: '' });
  };

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
        <h2 className={styles['modal-title']}>Новый пользователь</h2>
        <form onSubmit={handleSubmit} className={styles['modal-form']}>
          <input 
            required name="fullName"
            placeholder="ФИО" 
            className={styles['modal-input']} 
            value={formData.fullName} 
            onChange={handleChange} 
          />
          <input 
            required name="account"
            placeholder="Аккаунт" 
            className={styles['modal-input']} 
            value={formData.account} 
            onChange={handleChange} 
          />
          <input 
            required name="email"
            type="email" 
            placeholder="Email" 
            className={styles['modal-input']} 
            value={formData.email} 
            onChange={handleChange} 
          />
          <select 
            name="group"
            className={styles['modal-input']} 
            value={formData.group} 
            onChange={handleChange}
          >
            <option value="Без группы">Без группы</option>
            <option value="Руководство">Руководство</option>
            <option value="IT-отдел">IT-отдел</option>
            <option value="Менеджеры">Менеджеры</option>
          </select>
          <input 
            required 
            name="phone"
            type="tel"
            pattern="[+]?[0-9]{11}"
            title="Номер телефона должен содержать только цифры (10-11 символов)"
            placeholder="Телефон (например, 79991234567)" 
            className={styles['modal-input']} 
            value={formData.phone} 
            onChange={handleChange} 
          />
          
          <div className={styles['modal-actions']}>
            <button type="button" onClick={onClose} className={styles['btn-cancel']}>Отмена</button>
            <button type="submit" className={styles['btn-save']}>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal