import React from 'react';
import style from './DropDownForm.module.scss';

type options = { id: number | string; name: string };
interface DropDownFormProps {
  title: string;
  options: options[];
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropDownForm: React.FC<DropDownFormProps> = ({ title, options, value, onChange }) => {
  return (
    <select className={style.select} onChange={onChange} value={value}>
      <option value="" disabled hidden>
        {title}
      </option>

      {options.map(({ id, name }) => {
        return (
          <option key={id} value={id} className={style.option}>
            {name}
          </option>
        );
      })}
    </select>
  );
};

export default DropDownForm;
