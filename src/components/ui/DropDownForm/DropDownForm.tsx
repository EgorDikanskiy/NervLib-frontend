import React from 'react';
import style from './DropDownForm.module.scss';

type options = { id: number; name: string };
interface DropDownFormProps {
  options: options[];
}

const DropDownForm: React.FC<DropDownFormProps> = ({ options }) => {
  return (
    <select className={style.select}>
      <option value="" selected disabled hidden>
        Choose here
      </option>
      {options.map(({ id, name }) => {
        return (
          <option key={id} value={name} className={style.option}>
            {name}
          </option>
        );
      })}
    </select>
  );
};

export default DropDownForm;
