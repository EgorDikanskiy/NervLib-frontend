import classNames from 'classnames';
import React from 'react';
import style from './Input.module.scss';

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'month'
  | 'week'
  | 'color'
  | 'range'
  | 'file'
  | 'checkbox'
  | 'radio'
  | 'hidden'
  | 'submit'
  | 'reset'
  | 'button'
  | 'image';

interface InputProps {
  id: string;
  type: InputType;
  label?: string;
  placeholder?: string;
  value?: string;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, type, label, placeholder, value, isRequired, onChange, className }) => {
  return (
    <div className={style.group}>
      {label && (
        <label className={style.text} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={classNames(style.input, className)}
        type={type}
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
