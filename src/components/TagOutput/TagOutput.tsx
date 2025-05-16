import React from 'react';
import styles from './TagOutput.module.scss';

interface Tag {
  id: number;
  name: string;
}

interface TagOutputProps {
  tags: Tag[];
}

const TagOutput: React.FC<TagOutputProps> = ({ tags }) => {
  return (
    <div className={styles.selected_tags}>
      {tags.map((tag) => (
        <span className={styles.tag} key={tag.id}>
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default TagOutput;
