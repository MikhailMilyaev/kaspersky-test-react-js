import styles from './DeleteConfirmModal.module.css';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
        <h2 className={styles['modal-title']}>Подтверждение удаления</h2>
        <p className={styles['modal-text']}>
          Вы действительно хотите удалить пользователя <strong>{userName}</strong>?
        </p>
        <div className={styles['modal-actions']}>
          <button onClick={onClose} className={styles['btn-cancel']}>Отмена</button>
          <button onClick={onConfirm} className={styles['btn-delete']}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;