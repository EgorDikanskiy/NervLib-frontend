import React, { useState } from 'react';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import styles from './TagsInput.module.scss';

const TagsInput = () => {
  const [tags, setTags] = useState<Tag[]>([
    {
      id: '1',
      name: 'Самый важный тег',
      className: '',
    },
    {
      id: '2',
      name: 'Самый важный тег',
      className: '',
    },
  ]);

  const handleDelete = (indx: number) => {
    setTags(tags.filter((tag, index) => index !== indx));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  //   const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
  //     const newTags = tags.slice();

  //     newTags.splice(currPos, 1);
  //     newTags.splice(newPos, 0, tag);

  //     setTags(newTags);
  //   };

  const handleTagClick = (index: number) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <div>
      <p className={styles.text}>Теги</p>
      <ReactTags
        tags={tags}
        placeholder="Начните вводить теги..."
        suggestions={tags}
        separators={['Enter', 'Tab']}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        //   handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="top"
        //   autocomplete
        classNames={{
          // tags: 'tagsClass',
          tagInput: styles.input_field,
          tagInputField: styles.input_field__input,
          selected: styles.selected_tags,
          tag: styles.tag,
          // remove: 'removeClass',
          // suggestions: 'suggestionsClass',
          // activeSuggestion: 'activeSuggestionClass',
          // editTagInput: 'editTagInputClass',
          // editTagInputField: 'editTagInputField',
          // clearAll: 'clearAllClass',
        }}
      />
    </div>
  );
};

export default TagsInput;
