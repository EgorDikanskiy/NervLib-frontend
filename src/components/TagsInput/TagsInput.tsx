import React from 'react';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import styles from './TagsInput.module.scss';

interface TagsInputProps {
  suggestions: Tag[];
  value: Tag[];
  onChange: (tags: Tag[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ suggestions, value, onChange }) => {
  const handleDelete = (indx: number) => {
    onChange(value.filter((tag, index) => index !== indx));
  };

  const handleAddition = (tag: Tag) => {
    onChange([...value, tag]);
  };

  return (
    <div>
      <p className={styles.text}>Теги</p>
      <ReactTags
        tags={value}
        placeholder="Начните вводить теги..."
        suggestions={suggestions}
        separators={['Enter', 'Tab']}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="top"
        autocomplete
        classNames={{
          tagInput: styles.input_field,
          tagInputField: styles.input_field__input,
          selected: styles.selected_tags,
          tag: styles.tag,
        }}
      />
    </div>
  );
};

export default TagsInput;
