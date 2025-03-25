import React from 'react';
import styles from './Button.module.scss';

export const Button = ({ children, ...props }: React.ComponentProps<'button'>) => {
  return (
    <button className={styles.customButton} {...props}>
      {children}
    </button>
  );
};
