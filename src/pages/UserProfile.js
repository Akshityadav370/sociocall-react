import { useState } from 'react';

import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const user = {};

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://www.svgrepo.com/show/425240/users-avatar.svg"
          alt="user-pic"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <button className={`button ${styles.saveBtn}`}>Add friend</button>

        <button className={`button ${styles.saveBtn}`}>Remove friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
