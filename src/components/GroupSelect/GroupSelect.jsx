import styles from './GroupSelect.module.css';

const GroupSelect = ({ groups, selected, onChange }) => {
  return (
    <div className={styles['select-wrapper']}>
      <label htmlFor="group-select" className={styles['label']}>
        Выберите группу:
      </label>
      <select
        id="group-select"
        className={styles['select']}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {groups.map(group => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroupSelect;