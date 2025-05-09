import React, { useState } from 'react';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import styles from './TagsInput.module.scss';

interface TagsInputProps {
  suggestions: Tag[];
}

const TagsInput: React.FC<TagsInputProps> = ({ suggestions }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const handleDelete = (indx: number) => {
    setTags(tags.filter((tag, index) => index !== indx));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleTagClick = (index: number) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <div>
      <p className={styles.text}>Теги</p>
      <ReactTags
        tags={tags}
        placeholder="Начните вводить теги..."
        suggestions={suggestions}
        separators={['Enter', 'Tab']}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleTagClick={handleTagClick}
        inputFieldPosition="top"
        autocomplete
        classNames={{
          // tags: 'tagsClass',
          tagInput: styles.input_field,
          tagInputField: styles.input_field__input,
          selected: styles.selected_tags,
          tag: styles.tag,
          // remove: 'removeClass',
          // suggestions: styles.activeSuggestions,
          // activeSuggestion: styles.activeSuggestions,
          // editTagInput: 'editTagInputClass',
          // editTagInputField: 'editTagInputField',
          // clearAll: 'clearAllClass',
        }}
      />
    </div>
  );
};

export default TagsInput;
