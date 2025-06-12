import React from 'react';
import styles from './Tag.module.scss';

interface TagProps {
  title: string;
}
const Tag = ({ title }: TagProps) => {
  return <div className={styles.tag}>{title}</div>;
};

export default Tag;
