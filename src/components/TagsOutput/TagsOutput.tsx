import React from 'react';
import Tag from 'components/ui/Tag';
import styles from './TagsOutput.module.scss';

interface Tag {
  id: number;
  title: string;
}

interface TagsOutputProps {
  tags: Tag[];
}

const TagsOutput: React.FC<TagsOutputProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag) => (
        <Tag title={tag.title} key={tag.id} />
      ))}
    </>
  );
};

export default TagsOutput;
