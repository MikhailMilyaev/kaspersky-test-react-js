import { useState } from 'react';
import styles from './UserModal.module.css';

const GROUPS = [
  'Без группы',
  'Руководство',
  'IT-отдел',
  'Менеджеры',
  'Бухгалтерия',
  'Отдел кадров'
];

const UserModal = ({ isOpen, onClose, onSave }) => {
  const initialForm = {
    fullName: '',
    account: '',
    email: '',
    group: 'Без группы',
    phone: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = 'Введите ФИО';
    if (!formData.account.trim()) newErrors.account = 'Введите аккаунт';
    
    if (!formData.email) {
      newErrors.email = 'Введите Email';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Некорректный формат почты';
    }

    if (!formData.phone) {
      newErrors.phone = 'Введите номер телефона';
    } else if (formData.phone.length < 11) {
      newErrors.phone = 'Минимум 11 цифр';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

    if (name === 'phone') {
      const onlyNums = value.replace(/[^\d+]/g, '');
      setFormData(prev => ({ ...prev, [name]: onlyNums }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <h2 className={styles['modal-title']}>Новый пользователь</h2>
        <form onSubmit={handleSubmit} className={styles['modal-form']} noValidate>
          
          <div className={styles['input-group']}>
            <input 
              name="fullName" placeholder="ФИО" 
              className={`${styles['modal-input']} ${errors.fullName ? styles['input-error'] : ''}`}
              value={formData.fullName} onChange={handleChange} 
            />
            {errors.fullName && <span className={styles['error-text']}>{errors.fullName}</span>}
          </div>

          <div className={styles['input-group']}>
            <input 
              name="account" placeholder="Аккаунт" 
              className={`${styles['modal-input']} ${errors.account ? styles['input-error'] : ''}`}
              value={formData.account} onChange={handleChange} 
            />
            {errors.account && <span className={styles['error-text']}>{errors.account}</span>}
          </div>

          <div className={styles['input-group']}>
            <input 
              name="email" type="email" placeholder="Email" 
              className={`${styles['modal-input']} ${errors.email ? styles['input-error'] : ''}`}
              value={formData.email} onChange={handleChange} 
            />
            {errors.email && <span className={styles['error-text']}>{errors.email}</span>}
          </div>

          <div className={styles['input-group']}>
            <select 
              name="group" className={styles['modal-input']} 
              value={formData.group} onChange={handleChange}
            >
              {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div className={styles['input-group']}>
            <input 
              name="phone" type="tel" placeholder="Телефон" 
              className={`${styles['modal-input']} ${errors.phone ? styles['input-error'] : ''}`}
              value={formData.phone} onChange={handleChange} 
            />
            {errors.phone && <span className={styles['error-text']}>{errors.phone}</span>}
          </div>
          
          <div className={styles['modal-actions']}>
            <button type="button" onClick={handleClose} className={styles['btn-cancel']}>Отмена</button>
            <button type="submit" className={styles['btn-save']}>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;