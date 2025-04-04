import React from 'react';
import style from './DropDown.module.scss';

interface DropDownProps {
  header: string;
  items: string[];
  selectedItems: string | string[];
  onItemClick: (item: string) => void;
}

const DropDown = ({ header, items, selectedItems, onItemClick }: DropDownProps) => {
  const isSelected = (item: string) => {
    if (Array.isArray(selectedItems)) {
      return selectedItems.includes(item);
    }
    return selectedItems === item;
  };

  const handleClick = (item: string) => {
    // Для одиночного выбора: если элемент уже выбран - снимаем выбор
    onItemClick(isSelected(item) ? '' : item);
  };

  return (
    <div className={style.dropdown}>
      <div className={style.dropdown__header}>
        <div className={style.dropdown__header__icon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.21353 7.85343C6.11977 7.94716 5.99262 7.99982 5.86003 7.99982C5.72745 7.99982 5.6003 7.94716 5.50653 7.85343L2.67803 5.02493C2.63028 4.9788 2.59219 4.92363 2.56598 4.86263C2.53978 4.80163 2.52599 4.73602 2.52541 4.66963C2.52483 4.60324 2.53748 4.5374 2.56262 4.47595C2.58776 4.4145 2.62489 4.35868 2.67184 4.31173C2.71878 4.26478 2.77461 4.22766 2.83606 4.20252C2.89751 4.17738 2.96335 4.16473 3.02974 4.1653C3.09613 4.16588 3.16173 4.17967 3.22274 4.20588C3.28374 4.23208 3.33891 4.27017 3.38503 4.31793L5.86003 6.79293L8.33504 4.31793C8.42934 4.22685 8.55564 4.17645 8.68674 4.17759C8.81783 4.17873 8.94324 4.23131 9.03594 4.32402C9.12865 4.41672 9.18123 4.54213 9.18237 4.67323C9.18351 4.80433 9.13311 4.93063 9.04204 5.02493L6.21353 7.85343Z"
              fill="#303030"
            />
          </svg>
        </div>
        <div className={style.dropdown__header__text}>{header}</div>
      </div>
      {items.map((item, index) => (
        <div
          className={`${style.dropdown__item} ${isSelected(item) ? style.dropdown__item_active : ''}`}
          key={index}
          onClick={() => handleClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DropDown;
