import classNames from 'classnames';
import React from 'react';
import style from './Textarea.module.scss';

interface TextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const Input: React.FC<TextareaProps> = ({ id, label, placeholder, value, isRequired, onChange, className }) => {
  return (
    <div className={style.group}>
      {label && (
        <label className={style.text} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        className={classNames(style.textarea, className)}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
    </div>
  );
};

export default Input;
